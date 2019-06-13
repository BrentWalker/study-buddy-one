from django.db import models

class User(models.Model):
    name = models.CharField(max_length=255)
    age = models.CharField(max_length=400)
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Category(models.Model):
    title = models.CharField(max_length=255)
    

    def __str__(self):
        return self.title

class Technology(models.Model):
    language = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='categories')

    def __str__(self):
        return self.language
