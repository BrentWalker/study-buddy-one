from django.contrib import admin
from .models import User, Category, Technology

admin.site.register([User, Category, Technology])
