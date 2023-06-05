from django.shortcuts import render
from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Role, Task, Admin, User
from .serializer import RoleSerializer, TaskSerializer, AdminSerializer, UserSerializer

CACHE_TTL = 60 * 15

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
        serializer = AdminSerializer(data=request.data)
        return checkValidity(serializer)
    
class UserAPIView(APIView):
    def get(self, request):
        cacheName = "user_list"
        cache = checkCache(cacheName)
        if cache:
            return cache
        else:
            data = User.objects.all()
            serializer = UserSerializer(data, many=True)
            return setCache(cacheName, serializer)
        
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        return checkValidity(serializer)

def checkValidity(serializer):
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def checkCache(cacheName):
    cached_data = cache.get(cacheName)
    if cached_data:
        return Response(cached_data)
    return False

def setCache(cacheName, serializer):
    response_data = serializer.data
    cache.set(cacheName, response_data, CACHE_TTL)
    return Response(response_data)