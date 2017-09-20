from django.contrib import admin
from .models import baseIndex
from .models import Room


admin.site.register(baseIndex)
admin.site.register(
    Room,
    list_display=["id", "title", "staff_only"],
    list_display_links=["id", "title"],
)
