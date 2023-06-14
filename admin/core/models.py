from django.db import models

# All models ideally has much more information,
# But for the sake of simplicity, only the 'main' ones
# Are featured. Also tasks and employees are one-to-many relationship
# Because why not.

class Role(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=300, default='', null=True, blank=True)

class Task(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=300, default='', null=True, blank=True)
    role_requirement = models.ForeignKey(Role, on_delete=models.CASCADE, null=True, blank=True)

class Admin(models.Model):
    name = models.CharField(max_length=30)
    username = models.CharField(max_length=64, unique=True)
    password = models.CharField(max_length=64)
    
class Employee(models.Model):
    name = models.CharField(max_length=30)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=True, blank=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True, blank=True)
    supervisor = models.ForeignKey(Admin, on_delete=models.CASCADE, null=True, blank=True)
