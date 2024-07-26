package database

import (
	"crud-products-api/models"
	"log"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func ConnectDB() {
	// docker config; if running local without docker change host to 'localhost'
	strConnection := "host=postgres user=root password=crud-products dbname=products port=5432 sslmode=disable"

	maxAttempts := 5
	for i := 1; i <= maxAttempts; i++ {
		DB, err = gorm.Open(postgres.Open(strConnection), &gorm.Config{})
		if err == nil {
			break
		}

		log.Printf("Failed to connect to database. Attempt %d/%d\n", i, maxAttempts)
		time.Sleep(5 * time.Second)
	}

	if err != nil {
		log.Panic("Failed to connect database after multiple attempts.")
	}

	// migrations
	DB.AutoMigrate(&models.Product{})
}
