from django.contrib import admin
from .models import Role, Task, Admin, User

admin.site.register(Role)
admin.site.register(Task)
admin.site.register(Admin)
admin.site.register(User)