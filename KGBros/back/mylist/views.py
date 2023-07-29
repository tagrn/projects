from django.shortcuts import get_object_or_404
from django.conf import settings

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .serializers import MyMovieSerializer
from .models import MyMovie

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from decouple import config

# Create your views here.

firebase_admin.initialize_app(cred,{
    'databaseURL' : 'https://my-movie-list-database.firebaseio.com/'
})

@api_view(['GET', 'POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def mylist_CR(request, username):
    mylist = MyMovie.objects.filter(get_user=username)
    if request.method == 'GET':
        serializer = MyMovieSerializer(mylist, many=True)
        return Response(serializer.data)
    else:
        serializer = MyMovieSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            result = ""
            for i in mylist:
                result += (str(i) +" \n\n")
            dir = db.reference() #기본 위치 지정
            dir.update({username:result})
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def mylist_D(request, pk):
    movie = get_object_or_404(MyMovie, pk=pk)
    get_user = movie.get_user

    if not request.user.my_list.filter(pk=pk).exists():
        return Response({ 'detail': '권한이 없습니다.'})

    movie.delete()
    mylist = MyMovie.objects.filter(get_user=get_user)
    print(mylist)
    result = ""
    for i in mylist:
        result += (str(i) +" \n\n")
    dir = db.reference() #기본 위치 지정
    dir.update({get_user:result})
    return Response({ 'id': pk })