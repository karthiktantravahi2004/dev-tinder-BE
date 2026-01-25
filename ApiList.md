# API'S

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId:
- POST /request/review/accepted/:requestId
- POST /request/review/rejceted/:requestId

## userRequestRouter

- GET /user/request
- GET /user/connections
- GET /user/feed

- status: ignored,intrested,accpeted,rejected
