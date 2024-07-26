package database

import (
	"crud-products-api/models"
	"log"

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
	DB, err = gorm.Open(postgres.Open(strConnection))

	if err != nil {
		log.Panic("Failed to connect database.")
	}

	// migrations
	DB.AutoMigrate(&models.Product{})
}
