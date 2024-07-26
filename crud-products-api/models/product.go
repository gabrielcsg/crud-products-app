package models

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type Product struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	Code           string    `gorm:"unique;not null" json:"code" validate:"required"`
	Name           string    `gorm:"not null" json:"name" validate:"required"`
	TotalStock     int       `gorm:"not null" json:"totalStock" validate:"required"`
	CutStock       int       `gorm:"not null" json:"cutStock" validate:"required"`
	AvailableStock int       `gorm:"not null" json:"availableStock"`
	PriceFrom      float64   `gorm:"not null" json:"priceFrom" validate:"required"`
	PricePer       float64   `gorm:"not null" json:"pricePer" validate:"required"`
	CreatedAt      time.Time `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt      time.Time `gorm:"autoUpdateTime" json:"updatedAt"`
	// DeletedAt      gorm.DeletedAt `gorm:"index" json:"deletedAt"`
}

func (product *Product) BeforeSave(*gorm.DB) (err error) {
	if product.PriceFrom < product.PricePer {
		return errors.New("PriceFrom cannot be less than PricePer")
	}
	product.AvailableStock = product.TotalStock - product.CutStock
	return
}
