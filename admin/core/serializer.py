from rest_framework import serializers
from .models import Role, Task, Admin, Employee

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name', 'description']

class TaskSerializer(serializers.ModelSerializer):
    role_requirement = serializers.SlugRelatedField(slug_field='name', queryset=Role.objects.all())
    
    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'role_requirement']

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['id', 'name', 'username', 'password']

class EmployeeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=30)
    task = serializers.SlugRelatedField(slug_field='name', queryset=Task.objects.all())
    role = serializers.SlugRelatedField(slug_field='name', queryset=Role.objects.all())
    supervisor = serializers.SlugRelatedField(slug_field='username', allow_null=True, queryset=Admin.objects.all(), required=False)

    class Meta:
        model = Employee
        fields = ['id', 'name', 'task', 'role', 'supervisor']
