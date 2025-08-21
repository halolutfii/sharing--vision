package main

import (
    "backend/models"
    "backend/routes"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

func main() {
    dsn := "root@tcp(127.0.0.1:3306)/article?charset=utf8mb4&parseTime=True&loc=Local"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    models.Migrate(db)

    r := routes.SetupRouter(db)
    r.Run(":8080")
}