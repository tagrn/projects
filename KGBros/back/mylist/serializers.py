from rest_framework import serializers
from .models import MyMovie


class MyMovieSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MyMovie
        fields = ('id', 'movie_id', 'title', 'get_user', 'pubDate', 'image', 'overview', 'userRation', 'created_at', 'updated_at')