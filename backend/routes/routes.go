package routes

import (
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
    "backend/controllers"
)

func SetupRouter(db *gorm.DB, r *gin.Engine) {
    r.POST("/article/", controllers.CreatePost(db))
    r.GET("/articles/:limit/:offset", controllers.GetPosts(db))
    r.GET("/article/:id", controllers.GetPostById(db))
    r.PUT("/article/:id", controllers.UpdatePost(db))
    r.POST("/article/:id/trash", controllers.MoveToTrash(db))
}