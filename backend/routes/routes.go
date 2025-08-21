package routes

import (
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
    "backend/controllers"
)

func SetupRouter(db *gorm.DB) *gin.Engine {
    r := gin.Default()

    r.POST("/article/", controllers.CreatePost(db)) // Create new article
    r.GET("/articles/:limit/:offset", controllers.GetPosts(db)) // Get articles with pagination
    r.GET("/article/:id", controllers.GetPostById(db)) // Get article by ID
    r.PUT("/article/:id", controllers.UpdatePost(db)) // Update article by ID
    r.DELETE("/article/:id", controllers.DeletePost(db)) // Delete article by ID

    return r
}
