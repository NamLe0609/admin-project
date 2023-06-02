from django.db import models

class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField

class Task(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField

class Admin(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    
class User(models.Model):
    name = models.CharField(max_length=100)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    supervisor = models.ForeignKey(Admin, on_delete=models.CASCADE, null=True, blank=True)
    
