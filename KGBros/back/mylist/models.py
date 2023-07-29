from django.db import models
from django.conf import settings


class MyMovie(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="my_list")
    movie_id = models.IntegerField(default=35)
    title = models.CharField(max_length=100)
    image = models.TextField()
    overview = models.TextField()
    get_user = models.CharField(max_length=50)
    pubDate = models.CharField(max_length=50)
    userRation = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title