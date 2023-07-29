import os
import json
import urllib.request
import random, requests


from django.shortcuts import get_object_or_404
from django.conf import settings

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .serializers import ReviewSerializer
from .models import Review

from decouple import config

# Create your views here.

@api_view(['GET', 'POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def review_CR(request, movie_title):
    if request.method == 'GET':
        reviews = Review.objects.filter(movie_title=movie_title)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    else:
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def review_D(request, pk):
    review = get_object_or_404(Review, pk=pk)
    print(request.user.reviews.filter(pk=pk))
    if not request.user.reviews.filter(pk=pk).exists():
        return Response({ 'detail': '권한이 없습니다.'})

    review.delete()
    return Response({ 'id': pk })


@api_view(['GET'])
def search(request, division):
    # secret_file = os.path.join(settings.BASE_DIR, '.secrets.json')

    # # secrets.json 파일을 읽은 후 secrets 변수에 저장
    # with open(secret_file) as f:
    #     secrets = json.loads(f.read())

    # client_id = secrets["naver"]["CLIENT_ID"]
    # client_secret = secrets["naver"]["CLIENT_SECRET"]
    # tmdb_api_key = secrets["tmdb"]["api_key"]
    # tmdb_token = secrets["tmdb"]["token"]
    tmdb_api_key = config('TMDB_SECRET_KEY')
    
    # q = request.GET.get('query')
    # yf = request.GET.get('yearfrom')
    # encTextQ = urllib.parse.quote("{}".format(q))
    # encTextYF = urllib.parse.quote("{}".format(yf))
    # if encTextQ == 'None':
    #     randomNum = random.randrange(65, 90)
    #     encTextQ = chr(randomNum)
    # if encTextYF == 'None':
    #     randomNum = random.randrange(2000, 2020)
    #     encTextYF = str(randomNum)
    # url = "https://openapi.naver.com/v1/search/movie?query="\
    #     + encTextQ + "&display=100&yearfrom=" + encTextYF  # json 결과
    randomNum = random.randrange(1, 10)
    url = "https://api.themoviedb.org/3/movie/" + division + "?api_key=" + tmdb_api_key + "&language=ko&page=" + str(randomNum)

    # movie_api_request = urllib.request.Request(url)
    # movie_api_request.add_header("X-Naver-Client-Id", client_id)
    # movie_api_request.add_header("X-Naver-Client-Secret", client_secret)
    response = requests.get(url).json()
    if response.get('results'):
        items = {'data': response['results']}
        # print(items)
        return Response(items)


@api_view(['GET'])
def search_random(request):
    # secret_file = os.path.join(settings.BASE_DIR, '.secrets.json')

    # with open(secret_file) as f:
    #     secrets = json.loads(f.read())

    # tmdb_api_key = secrets["tmdb"]["api_key"]
    # tmdb_token = secrets["tmdb"]["token"]
    tmdb_api_key = config('TMDB_SECRET_KEY')
    
    randomNum = random.randrange(1, 500)
    url = "https://api.themoviedb.org/3/movie/popular?api_key=" + tmdb_api_key + "&language=ko&page=" + str(randomNum)

    response = requests.get(url).json()
    if response.get('results'):
        items = {'data': response['results']}
        return Response(items)

@api_view(['GET'])
def search_recommended(request, id):
    # secret_file = os.path.join(settings.BASE_DIR, '.secrets.json')

    # with open(secret_file) as f:
    #     secrets = json.loads(f.read())

    # tmdb_api_key = secrets["tmdb"]["api_key"]
    # tmdb_token = secrets["tmdb"]["token"]
    tmdb_api_key = config('TMDB_SECRET_KEY')
    
    randomNum = random.randrange(1, 5)
    url = "https://api.themoviedb.org/3/movie/" + str(id) + "/similar?api_key=" + tmdb_api_key + "&language=ko&page=" + str(randomNum)
    response = requests.get(url).json()
    print(type(response))
    if response.get('results'):
        items = {'data': response['results']}
        print(type(items))
        return Response(items)


@api_view(['GET'])
def search_detail(request, id):
    # secret_file = os.path.join(settings.BASE_DIR, '.secrets.json')

    # with open(secret_file) as f:
    #     secrets = json.loads(f.read())

    # tmdb_api_key = secrets["tmdb"]["api_key"]
    # tmdb_token = secrets["tmdb"]["token"]
    tmdb_api_key = config('TMDB_SECRET_KEY')
    
    url = "https://api.themoviedb.org/3/movie/" + str(id) + "?api_key=" + tmdb_api_key + "&language=ko"
    print(url)
    response = requests.get(url).json()
    return Response(response)