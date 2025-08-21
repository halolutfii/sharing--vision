package models

import (
    "time"
    "gorm.io/gorm"
)

type Post struct {
    Id          uint      `gorm:"primaryKey;autoIncrement"`
    Title       string    `gorm:"size:200;not null"`
    Content     string    `gorm:"type:text;not null"`
    Category    string    `gorm:"size:100;not null"`
    Status      string    `gorm:"size:100;not null"`
    CreatedDate time.Time `gorm:"autoCreateTime"`
    UpdatedDate time.Time `gorm:"autoUpdateTime"`
}

// Migration
func Migrate(db *gorm.DB) {
    db.AutoMigrate(&Post{})
}