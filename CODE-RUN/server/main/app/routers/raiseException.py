from fastapi import HTTPException


def Raise_400_Error():
    return HTTPException(status_code=400)


def Raise_401_Error():
    return HTTPException(status_code=401)


def Raise_404_Error():
    return HTTPException(status_code=404)


def Raise_422_Error():
    return HTTPException(status_code=422)
