from rest_framework import serializers

from .models import User, Category, Technology


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'age', 'location')


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ('id', 'language', 'category')

class CategorySerializer(serializers.ModelSerializer):
    technologies = TechnologySerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ('id', 'title', 'technologies')
        