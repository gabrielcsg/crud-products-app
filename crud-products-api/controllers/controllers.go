package controllers

import (
	"net/http"
	"strconv"

	"crud-products-api/database"
	"crud-products-api/models"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

func GetAllProducts(context *gin.Context) {
	var products []models.Product
	database.DB.Find(&products)
	context.JSON(http.StatusOK, products)
}

func GetProduct(context *gin.Context) {
	var product models.Product
	id := context.Param("id")

	if err := database.DB.First(&product, id).Error; err != nil {
		context.JSON(http.StatusNotFound, gin.H{"message": "Product not found"})
		return
	}
	context.JSON(http.StatusOK, product)
}

func CreateProduct(context *gin.Context) {
	var newProduct models.Product

	if err := context.ShouldBindJSON(&newProduct); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Unable to create product", "error": err.Error()})
		return
	}

	validate = validator.New()
	if err := validate.Struct(newProduct); err != nil {
		validationErrors := err.(validator.ValidationErrors)
		errors := make(map[string]string)
		for _, err := range validationErrors {
			errors[err.Field()] = err.Tag()
		}
		context.JSON(http.StatusBadRequest, gin.H{"message": "Unable to create product", "errors": errors})
		return
	}

	var productCodeAvailable models.Product
	if err := database.DB.First(&productCodeAvailable, "code = ?", newProduct.Code).Error; err == nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Code is already in use"})
		return
	}

	if err := database.DB.Create(&newProduct).Error; err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Unable to create product", "error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, newProduct)
}

func DeleteProduct(context *gin.Context) {
	id := context.Param("id")
	var product models.Product

	if err := database.DB.First(&product, id).Error; err != nil {
		context.JSON(http.StatusNotFound, gin.H{"message": "Product not found"})
		return
	}

	database.DB.Delete(&product, id)
	context.JSON(http.StatusNoContent, gin.H{"message": "Product deleted successfully"})
}

func UpdateProduct(context *gin.Context) {
	var product models.Product

	id, err := strconv.ParseUint(context.Param("id"), 10, 32)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Invalid product ID"})
		return
	}

	if err := database.DB.First(&product, id).Error; err != nil {
		context.JSON(http.StatusNotFound, gin.H{"message": "Product not found"})
		return
	}

	if err := context.ShouldBindJSON(&product); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Unable to update product", "error": err.Error()})
		return
	}

	var productCodeAvailable models.Product
	if err := database.DB.First(&productCodeAvailable, "code = ? AND id != ?", product.Code, id).Error; err == nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Code is already in use"})
		return
	}

	product.ID = uint(id)
	if err := database.DB.Save(&product).Error; err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Unable to update a product", "error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, product)
}
