package main

import (
	"crud-products-api/database"
	"crud-products-api/routes"
)

func main() {
	database.ConnectDB()
	routes.HandleRequest()
}
