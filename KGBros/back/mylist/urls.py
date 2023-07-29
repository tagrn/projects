from django.urls import path
from . import views

app_name="mylist"

urlpatterns = [
    path('<str:username>/', views.mylist_CR, name='mylist_CR'),
    path('detail/<int:pk>/', views.mylist_D, name='mylist_D'),
]
