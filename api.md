# API Document
This is an API document.

## User
### Register
Create a new user
**Request:**
```json
POST /user/register HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

{
    "email": "abc@abc.com",
    "password": "12345678",
    "clinic":"ABC",
    "phone":"12345678",
    "address": "ABC Street"
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
  "id": "5f3193eb4ff19b0cc4166fe9",
  "email": "abc@abc.com",
  "clinic": "ABC",
  "address": "ABC Street",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzE5M2ViNGZmMTliMGNjNDE2NmZlOSIsImlhdCI6MTU5NzIwMTA3NSwiZXhwIjoxNTk3MjAxMDg1fQ.3td9bsk7fon-SuEpYfwjOvz7Pf_AohmFa82Deqhbc6Q",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzE5M2ViNGZmMTliMGNjNDE2NmZlOSIsImlhdCI6MTU5NzIwMTA3NX0.DL0yn0DFp9dkixSwWVr3VLw0HcGCMNooDSF_PS0JM68"
}
```
**Failed Response:**
```json
HTTP/1.1 
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "code": 409,
    "message": "abc@abc.com has already register",
}
``` 
### Login
User Login
**Request:**
```json
POST /user/login HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

{
    "email": "abc@abc.com",
    "password": "12345678" 
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
  "id": "5f3193eb4ff19b0cc4166fe9",
  "email": "abc@abc.com",
  "clinic": "ABC",
  "address": "ABC Street",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzE5M2ViNGZmMTliMGNjNDE2NmZlOSIsImlhdCI6MTU5NzIwMTA3NSwiZXhwIjoxNTk3MjAxMDg1fQ.3td9bsk7fon-SuEpYfwjOvz7Pf_AohmFa82Deqhbc6Q",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzE5M2ViNGZmMTliMGNjNDE2NmZlOSIsImlhdCI6MTU5NzIwMTA3NX0.DL0yn0DFp9dkixSwWVr3VLw0HcGCMNooDSF_PS0JM68"
}
```
**Failed Response:**
```json
HTTP/1.1 
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "code": 120,
    "message": "User Not Found",
}
``` 
### Refresh token
Get a new token for User.

```json
POST /user/refresh-token HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzE5M2ViNGZmMTliMGNjNDE2NmZlOSIsImlhdCI6MTU5NzIwMTA3NX0.DL0yn0DFp9dkixSwWVr3VLw0HcGCMNooDSF_PS0JM68"
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzE5M2ViNGZmMTliMGNjNDE2NmZlOSIsImlhdCI6MTU5NzIwMTA3NSwiZXhwIjoxNTk3MjAxMDg1fQ.3td9bsk7fon-SuEpYfwjOvz7Pf_AohmFa82Deqhbc33",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzE5M2ViNGZmMTliMGNjNDE2NmZlOSIsImlhdCI6MTU5NzIwMTA3NX0.DL0yn0DFp9dkixSwWVr3VLw0HcGCMNooDSF_PS0JM69"
}
```
**Failed Response:**
```json
HTTP/1.1 404 Not Found
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "message": "Token not found",
}
``` 
---
## Consultation Records
- API for Consultation record
### Create
**Request:**
```json
POST /consultation/create HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy
Headers: {
  "Authorization": "Bearer `Your access token`"
}
{
    "clinic": "ABC",
    "doctor": "Chan Tai Man",
    "patient": "Eric",
    "diagnosis": "Flu",
    "medication": "Panadol",
    "start":"2020-11-22 10:50:00",
    "end":"2020-11-22 11:30:00",
    "fee": 500,
    "hasFollowup": true
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
  "_id": "5f335f2bc75f1d213b93e469",
  "clinic": "ABC",
  "doctor": "Chan Tai Man",
  "patient": "Eric",
  "diagnosis": "Flu",
  "medication": "Panadol",
  "start": "2020-11-22T02:50:00.000Z",
  "end": "2020-11-22T03:30:00.000Z",
  "fee": "500",
  "hasFollowup": true
}
```
**Failed Response:**
```json
HTTP/1.1 400
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "message": "clinic is not correct or Null",
}
``` 
### Get Simply Record List
- Get a list of record for calender
**Request:**
```json
GET /consultation/simplyRecords HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy
Headers: {
  "Authorization": "Bearer `Your access token`"
}
{
    "clinic": "ABC",
    "start": "2020-08-01 00:00:00",
    "end": "2020-08-31 23:59:59",
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
  "2020-08-09": [
      {
          "_id": "5f2f8bd44a9f705691ea0c73",
          "clinic": "ABC",
          "doctor": "a",
          "patient": "a",
          "start": "2020-08-09T05:50:00.000Z",
          "end": "2020-08-09T06:30:00.000Z"
      },
  ],
  "2020-08-10": [
      {
          "_id": "5f2f8bd44a9f705691ea0c73",
          "clinic": "ABC",
          "doctor": "a",
          "patient": "b",
          "start": "2020-08-10T15:50:00.000Z",
          "end": "2020-08-10T16:30:00.000Z"
      },
  ]
}
```
**Failed Response:**
```json
HTTP/1.1 401 Unauthorized
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "message": "invalid signature",
}
``` 
### Get Detail
**Request:**
```json
GET /consultation/record/:id HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy
Headers: {
  "Authorization": "Bearer `Your access token`"
}
{
    "id": "5f2f8bd44a9f705691ea0c73",
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "_id": "5f30bc2745747229ab8137d4",
    "clinic": "a",
    "doctor": "a",
    "patient": "cccccccccc",
    "diagnosis": "a",
    "medication": "a",
    "start": "2020-11-19T02:50:00.000Z",
    "end": "2020-11-19T03:30:00.000Z",
    "fee": "10000",
    "hasFollowup": true,
    "createdAt": "2020-08-10T03:16:55.184Z",
    "updatedAt": "2020-08-10T03:16:55.184Z",
    "__v": 0
}
```
**Failed Response:**
```json
HTTP/1.1 401 Unauthorized
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "message": "invalid signature",
}
``` 