from rest_framework import serializers
from .models import Article, Comment


class ArticleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Article
        fields = ('id', 'get_user', 'article_title', 'showArticle', 'content', 'created_at', 'updated_at')


class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields = ('id', 'get_user', 'article_id', 'content', 'created_at', 'updated_at')