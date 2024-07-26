package routes

import (
	"crud-products-api/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func HandleRequest() {
	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/products", controllers.GetAllProducts)
	r.GET("/products/:id", controllers.GetProduct)
	r.POST("/products", controllers.CreateProduct)
	r.PUT("/products/:id", controllers.UpdateProduct)
	r.DELETE("/products/:id", controllers.DeleteProduct)

	r.Run(":3333")
}
