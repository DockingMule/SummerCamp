package models

// Participant represents data about a participant.
type Participant struct {
	ID                string   `json:"id"`
	FirstName         string   `json:"first_name"`
	LastName          string   `json:"last_name"`
	Age               int      `json:"age"`
	Gender            string   `json:"gender"`
	AdditionalInfo    string   `json:"additional_information"`
	Accepted          bool     `json:"accepted"`
	Dates             []string `json:"dates"`
	GuardianFirstName string   `json:"guardian_first_name"`
	GuardianLastName  string   `json:"guardian_last_name"`
	GuardianEmail     string   `json:"guardian_email"`
	GuardianPhone     string   `json:"guardian_phone"`
	PaidInFull        bool     `json:"paid_in_full"`
	AmountPaid        float64  `json:"amount_paid"`
}
