package controllers

import (
    "net/http"
    "strconv"
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
    "backend/models"
)

// Create new post
func CreatePost(db *gorm.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        var post models.Post
        if err := c.ShouldBindJSON(&post); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        // Validasi
        if len(post.Title) < 20 || len(post.Content) < 200 || len(post.Category) < 3 ||
            !(post.Status == "publish" || post.Status == "draft" || post.Status == "thrash") {
            c.JSON(http.StatusBadRequest, gin.H{"error": "validation failed"})
            return
        }

        db.Create(&post)
        c.JSON(http.StatusOK, post)
    }
}

// Get posts with limit & offset
func GetPosts(db *gorm.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        limit, _ := strconv.Atoi(c.Param("limit"))
        offset, _ := strconv.Atoi(c.Param("offset"))
        var posts []models.Post
        db.Limit(limit).Offset(offset).Find(&posts)
        c.JSON(http.StatusOK, posts)
    }
}

// Get post by ID
func GetPostById(db *gorm.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        id := c.Param("id")
        var post models.Post
        if err := db.First(&post, id).Error; err != nil {
            c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
            return
        }
        c.JSON(http.StatusOK, post)
    }
}

// Update post
func UpdatePost(db *gorm.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        id := c.Param("id")
        var post models.Post
        if err := db.First(&post, id).Error; err != nil {
            c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
            return
        }

        var input models.Post
        if err := c.ShouldBindJSON(&input); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        // Validasi
        if len(input.Title) < 20 || len(input.Content) < 200 || len(input.Category) < 3 ||
            !(input.Status == "publish" || input.Status == "draft" || input.Status == "thrash") {
            c.JSON(http.StatusBadRequest, gin.H{"error": "validation failed"})
            return
        }

        db.Model(&post).Updates(input)
        c.JSON(http.StatusOK, post)
    }
}

// Delete post
func DeletePost(db *gorm.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        id := c.Param("id")
        if err := db.Delete(&models.Post{}, id).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete"})
            return
        }
        c.JSON(http.StatusOK, gin.H{"message": "deleted"})
    }
}