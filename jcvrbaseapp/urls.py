from django.conf.urls import include, url
from . import views


urlpatterns = [
    url(r'^$', views.base_view, name="base_view"),
]
