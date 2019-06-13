from django.shortcuts import render


from rest_framework import viewsets

from .serializers import UserSerializer, TechnologySerializer, CategorySerializer
from .models import User, Technology, Category


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TechnologyView(viewsets.ModelViewSet):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer

class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer