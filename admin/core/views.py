
from django.core.cache import cache
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Role, Task, Admin, Employee
from .serializer import RoleSerializer, TaskSerializer, AdminSerializer, EmployeeSerializer

CACHE_TTL = 60 * 0.25

class RoleAPIView(APIView):
    def get(self, request):
        cacheName = "role_list"
        cache = checkCache(cacheName)
        if cache:
            return cache
        else:
            data = Role.objects.all()
            serializer = RoleSerializer(data, many=True)
            return setCache(cacheName, serializer)

    def post(self, request):
        serializer = RoleSerializer(data=request.data)
        return checkValidity(serializer)
    
    def put(self, request, pk):
        role = get_object_or_404(Role, pk=pk)
        serializer = RoleSerializer(role, data=request.data)
        return checkValidity(serializer)

    def delete(self, request, name):
        role = get_object_or_404(Role, name=name)
        role.delete()
        return Response(True, status=status.HTTP_204_NO_CONTENT)
    
class TaskAPIView(APIView):
    def get(self, request):
        cacheName = "task_list"
        cache = checkCache(cacheName)
        if cache:
            return cache
        else:
            data = Task.objects.all()
            serializer = TaskSerializer(data, many=True)
            return setCache(cacheName, serializer)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        return checkValidity(serializer)
    
    def put(self, request, pk):
        task = get_object_or_404(Task, pk=pk)
        serializer = TaskSerializer(task, data=request.data)
        return checkValidity(serializer)

    def delete(self, request, name):
        task = get_object_or_404(Task, name=name)
        task.delete()
        return Response(True, status=status.HTTP_204_NO_CONTENT)
    
class AdminAPIView(APIView):
    def get(self, request):
        cacheName = "admin_list"
        cache = checkCache(cacheName)
        if cache:
            return cache
        else:
            data = Admin.objects.all()
            serializer = AdminSerializer(data, many=True)
            return setCache(cacheName, serializer)

    def post(self, request):
        print(request.data)
        serializer = AdminSerializer(data=request.data)
        print(serializer)
        return checkValidity(serializer)
    
    def put(self, request, pk):
        admin = get_object_or_404(Admin, pk=pk)
        serializer = AdminSerializer(admin, data=request.data)
        return checkValidity(serializer)

    def delete(self, request, pk):
        admin = get_object_or_404(Admin, pk=pk)
        admin.delete()
        return Response(True, status=status.HTTP_204_NO_CONTENT)
    
class EmployeeAPIView(APIView):
    def get(self, request):
        cacheName = "employee_list"
        cache = checkCache(cacheName)
        print("hi")
        if cache:
            return cache
        else:
            data = Employee.objects.all()
            serializer = EmployeeSerializer(data, many=True)
            return setCache(cacheName, serializer)
        
    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        return checkValidity(serializer)
    
    def put(self, request, pk):
        employee = get_object_or_404(Employee, pk=pk)
        serializer = EmployeeSerializer(employee, data=request.data)
        return checkValidity(serializer)

    def delete(self, request, pk):
        employee = get_object_or_404(Employee, pk=pk)
        employee.delete()
        return Response(True, status=status.HTTP_204_NO_CONTENT)

def checkValidity(serializer):
    if serializer.is_valid():
        serializer.save()
        return Response(True, status=status.HTTP_201_CREATED)
    return Response(False, status=status.HTTP_400_BAD_REQUEST)

def checkCache(cacheName):
    cached_data = cache.get(cacheName)
    if cached_data:
        return Response(cached_data)
    return False

def setCache(cacheName, serializer):
    response_data = serializer.data
    cache.set(cacheName, response_data, CACHE_TTL)
    return Response(response_data)