from django.urls import path
from . import views

app_name="reviews"

urlpatterns = [
    path('detail/<str:movie_title>/', views.review_CR, name='review_CR'),
    path('detail/delete/<int:pk>/', views.review_D, name='review_D'),
    path('search/random/', views.search_random, name='search_random'),
    path('search/detail/<int:id>/', views.search_detail, name='search_detail'),
    path('search/recommended/<int:id>/', views.search_recommended, name='search_recommended'),
    path('search/<str:division>/', views.search, name='search'),
]