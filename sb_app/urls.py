# tunr_app/urls.py
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('users', views.UserView)
router.register('technologys', views.TechnologyView)
router.register('categories', views.CategoryView)


urlpatterns = [
    path('', include(router.urls))
]