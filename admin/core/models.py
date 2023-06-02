from django.db import models

class Role(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=300)

class Task(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=300)

class Admin(models.Model):
    name = models.CharField(max_length=30)
    username = models.CharField(max_length=64)
    password = models.CharField(max_length=64)
    
class User(models.Model):
    name = models.CharField(max_length=30)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    supervisor = models.ForeignKey(Admin, on_delete=models.CASCADE, null=True, blank=True)
    
