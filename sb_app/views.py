from django.shortcuts import render

# Create your views here.
# tunr_app/views.py
from rest_framework import viewsets

from .serializers import UserSerializer, CurriculumSerializer, CategorySerializer
from .models import User, Curriculum, Category


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CurriculumView(viewsets.ModelViewSet):
    queryset = Curriculum.objects.all()
    serializer_class = CurriculumSerializer

class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer