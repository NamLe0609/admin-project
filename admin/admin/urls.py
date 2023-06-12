"""
URL configuration for admin project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from core.views import RoleAPIView, TaskAPIView, AdminAPIView, EmployeeAPIView
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('roles/', RoleAPIView.as_view(), name='role-api'),
    path('roles/<str:name>/', RoleAPIView.as_view(), name='role-delete-api'),
    path('tasks/', TaskAPIView.as_view(), name='task-api'),
    path('tasks/<str:name>/', TaskAPIView.as_view(), name='task-delete-api'),
    path('admins/', AdminAPIView.as_view(), name='admin-api'),
    path('employees/', EmployeeAPIView.as_view(), name='employee-api'),
    path('employees/<int:pk>/', EmployeeAPIView.as_view(), name='employee-delete-api'),
    path('', TemplateView.as_view(template_name='index.html')),
]
