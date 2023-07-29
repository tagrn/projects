from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
        fields = ('id', 'movie_title', 'get_user', 'content', 'grade', 'created_at', 'updated_at')