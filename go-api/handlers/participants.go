package handlers

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"

	"go-api/models"
)

var db *sql.DB

// SetDB sets the package-level DB for handlers
func SetDB(d *sql.DB) {
	db = d
}

// GetParticipants returns all participants
func GetParticipants(c *gin.Context) {
	c.Header("Content-Type", "application/json")

	rows, err := db.Query(`
        SELECT first_name, last_name, age, gender, additional_information, id, dates,
               guardian_first_name, guardian_last_name,
               guardian_email, guardian_phone, paid_in_full, amount_paid, accepted
        FROM participants
    `)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var participants []models.Participant
	for rows.Next() {
		var (
			first          sql.NullString
			last           sql.NullString
			age            sql.NullInt64
			gender         sql.NullString
			additionalInfo sql.NullString
			id             sql.NullInt64
			datesArr       pq.StringArray
			guardianFirst  sql.NullString
			guardianLast   sql.NullString
			guardianEmail  sql.NullString
			guardianPhone  sql.NullString
			paidInFull     sql.NullBool
			amountPaid     sql.NullFloat64
			accepted       sql.NullBool
		)

		if err := rows.Scan(&first, &last, &age, &gender, &additionalInfo, &id, &datesArr, &guardianFirst, &guardianLast, &guardianEmail, &guardianPhone, &paidInFull, &amountPaid, &accepted); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		p := models.Participant{
			ID:                fmt.Sprintf("%d", id.Int64),
			FirstName:         first.String,
			LastName:          last.String,
			Age:               int(age.Int64),
			Gender:            gender.String,
			AdditionalInfo:    additionalInfo.String,
			Accepted:          accepted.Bool,
			Dates:             []string(datesArr),
			GuardianFirstName: guardianFirst.String,
			GuardianLastName:  guardianLast.String,
			GuardianEmail:     guardianEmail.String,
			GuardianPhone:     guardianPhone.String,
			PaidInFull:        paidInFull.Bool,
			AmountPaid:        amountPaid.Float64,
		}
		participants = append(participants, p)
	}
	if err := rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, participants)
}

// GetParticipantByID returns a single participant by id
func GetParticipantByID(c *gin.Context) {
	idParam := c.Param("id")
	idInt, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	row := db.QueryRow(`
        SELECT first_name, last_name, age, gender, additional_information, id, dates,
               guardian_first_name, guardian_last_name,
               guardian_email, guardian_phone, paid_in_full, amount_paid, accepted
        FROM participants WHERE id = $1
    `, idInt)

	var (
		first          sql.NullString
		last           sql.NullString
		age            sql.NullInt64
		gender         sql.NullString
		additionalInfo sql.NullString
		idVal          sql.NullInt64
		datesArr       pq.StringArray
		guardianFirst  sql.NullString
		guardianLast   sql.NullString
		guardianEmail  sql.NullString
		guardianPhone  sql.NullString
		paidInFull     sql.NullBool
		amountPaid     sql.NullFloat64
		accepted       sql.NullBool
	)

	if err := row.Scan(&first, &last, &age, &gender, &additionalInfo, &idVal, &datesArr, &guardianFirst, &guardianLast, &guardianEmail, &guardianPhone, &paidInFull, &amountPaid, &accepted); err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	p := models.Participant{
		ID:                fmt.Sprintf("%d", idVal.Int64),
		FirstName:         first.String,
		LastName:          last.String,
		Age:               int(age.Int64),
		Gender:            gender.String,
		AdditionalInfo:    additionalInfo.String,
		Accepted:          accepted.Bool,
		Dates:             []string(datesArr),
		GuardianFirstName: guardianFirst.String,
		GuardianLastName:  guardianLast.String,
		GuardianEmail:     guardianEmail.String,
		GuardianPhone:     guardianPhone.String,
		PaidInFull:        paidInFull.Bool,
		AmountPaid:        amountPaid.Float64,
	}

	c.IndentedJSON(http.StatusOK, p)
}

// CreateParticipant inserts a new participant
func CreateParticipant(c *gin.Context) {
	var p models.Participant
	if err := c.BindJSON(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var id int64
	err := db.QueryRow(`
        INSERT INTO participants (first_name, last_name, age, gender, additional_information, dates,
            guardian_first_name, guardian_last_name, guardian_email, guardian_phone, paid_in_full, amount_paid, accepted)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id
    `, p.FirstName, p.LastName, p.Age, p.Gender, p.AdditionalInfo, pq.Array(p.Dates), p.GuardianFirstName, p.GuardianLastName, p.GuardianEmail, p.GuardianPhone, p.PaidInFull, p.AmountPaid, p.Accepted).Scan(&id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	p.ID = fmt.Sprintf("%d", id)
	c.IndentedJSON(http.StatusCreated, p)
}

// UpdateParticipant updates an existing participant
func UpdateParticipant(c *gin.Context) {
	idParam := c.Param("id")
	idInt, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	var p models.Participant
	if err := c.BindJSON(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	res, err := db.Exec(`
        UPDATE participants SET first_name=$1, last_name=$2, age=$3, gender=$4, additional_information=$5, dates=$6,
            guardian_first_name=$7, guardian_last_name=$8, guardian_email=$9, guardian_phone=$10, paid_in_full=$11, amount_paid=$12, accepted=$13
        WHERE id=$14
    `, p.FirstName, p.LastName, p.Age, p.Gender, p.AdditionalInfo, pq.Array(p.Dates), p.GuardianFirstName, p.GuardianLastName, p.GuardianEmail, p.GuardianPhone, p.PaidInFull, p.AmountPaid, p.Accepted, idInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	affected, _ := res.RowsAffected()
	if affected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}

	p.ID = idParam
	c.IndentedJSON(http.StatusOK, p)
}

// DeleteParticipant deletes a participant by id
func DeleteParticipant(c *gin.Context) {
	idParam := c.Param("id")
	idInt, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	res, err := db.Exec(`DELETE FROM participants WHERE id=$1`, idInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	affected, _ := res.RowsAffected()
	if affected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}

	c.Status(http.StatusNoContent)

}
