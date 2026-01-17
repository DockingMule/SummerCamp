package handlers

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	"go-api/models"
)

// GetUser returns a user by ID
func GetUser(c *gin.Context) {
	c.Header("Content-Type", "application/json")

	query := c.Request.URL.Query()

	email := query.Get("email")
	password := query.Get("password")
	fmt.Println("Email:", email)
	fmt.Println("Password:", password)
	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email query parameter is required"})
		return
	}

	var user models.User
	err := db.QueryRow(`SELECT name, email, password FROM users WHERE email = $1`, email).Scan(&user.Name, &user.Email, &user.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusOK, gin.H{
				"user":  user.Name,
				"email": user.Email,
				"match": false,
				"code":  "403",
			})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	// Verify the provided plain password against the stored bcrypt hash
	match := VerifyPassword(password, user.Password)

	// Do not return password hashes to the client
	user.Password = ""

	c.JSON(http.StatusOK, gin.H{
		"user":  user.Name,
		"email": user.Email,
		"name":  user.Name,
		"match": match,
		"code":  "200",
	})
}
