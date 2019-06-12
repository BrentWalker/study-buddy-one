from django.contrib import admin
from .models import User, Category, Curriculum

admin.site.register([User, Category, Curriculum])
