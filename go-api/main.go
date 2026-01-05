package main

import (
	"go-api/handlers"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

func main() {
	// Create router
	router := mux.NewRouter()

	// Health check
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// F1 Routes
	router.HandleFunc("/api/drivers", handlers.GetAllDrivers).Methods("GET")
	router.HandleFunc("/api/driver/{driver_number}", handlers.GetDriver).Methods("GET")
    router.HandleFunc("/api/sessions", handlers.GetSessions).Methods("GET")
	router.HandleFunc("/api/session-result", handlers.GetSessionResult).Methods("GET")



	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	log.Printf("Server starting on port %s...\n", port)
	if err := http.ListenAndServe(":"+port, router); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
