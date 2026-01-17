package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"

	"go-api/handlers"
)

var db *sql.DB

func main() {

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file loaded:", err)
	}

	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	var err error
	db, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Database connection established")

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Database ping successful")

	// ensure DB is closed when main exits
	defer db.Close()

	handlers.SetDB(db)

	router := gin.Default()

	// CORS: allow Next.js dev server to call this API (preflight OPTIONS)
	// Use default CORS middleware (permissive) to handle preflight OPTIONS
	router.Use(cors.Default())

	router.GET("/participants", handlers.GetParticipants)
	router.GET("/participants/:id", handlers.GetParticipantByID)
	router.POST("/participants", handlers.CreateParticipant)
	router.PUT("/participants/:id", handlers.UpdateParticipant)
	router.DELETE("/participants/:id", handlers.DeleteParticipant)

	router.GET("/user", handlers.GetUser)

	router.Run(":8080")
}
