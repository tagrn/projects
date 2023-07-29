from django.urls import path
from . import views

urlpatterns = [
    path('', views.article_CR),
    path('<int:pk>/', views.article_UD),
    path('<int:pk>/comment/', views.comment_CR),
    path('<int:pk>/comment/<int:comment_pk>/', views.comment_UD),
]
