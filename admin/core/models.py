from django.db import models

class Role(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=300, default='')

class Task(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=300, default='')
    role_requirement = models.ForeignKey(Role, on_delete=models.CASCADE, null=True, blank=True)

class Admin(models.Model):
    name = models.CharField(max_length=30)
    username = models.CharField(max_length=64, unique=True)
    password = models.CharField(max_length=64)
    
class User(models.Model):
    name = models.CharField(max_length=30)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    supervisor = models.ForeignKey(Admin, on_delete=models.CASCADE, null=True, blank=True)
    
