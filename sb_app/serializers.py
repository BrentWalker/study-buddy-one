from rest_framework import serializers

from .models import User, Category, Curriculum


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'photo_url', 'location')


class CurriculumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curriculum
        fields = ('id', 'language', 'category')

class CategorySerializer(serializers.ModelSerializer):
    curriculums = CurriculumSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ('id', 'title', 'categories')