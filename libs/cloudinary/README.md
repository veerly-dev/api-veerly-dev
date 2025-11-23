# SignUp

```
mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    message
    accessToken
    refreshToken
    user {
      id
      name
      email
      role
    }
  }
}
{
  "input": {
    "name": "Veera",
    "email": "web@gmail.com",
    "password": "veerly1234"
  }
}
{
  "data": {
    "signUp": {
      "message": "User registered successfully",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGUwZDYyMi0yOTc4LTRjZTUtOWZhZi05YzY5MmI2MDNhOTgiLCJlbWFpbCI6IndlYkBnbWFpbC5jb20iLCJpYXQiOjE3NjM1Mjk3NzAsImV4cCI6MTc2MzUzMDY3MH0.d-1g5yzF4MtmcBup5RbwdJG5MyWexqC_dxDJ0ycgSrI",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGUwZDYyMi0yOTc4LTRjZTUtOWZhZi05YzY5MmI2MDNhOTgiLCJpYXQiOjE3NjM1Mjk3NzAsImV4cCI6MTc2NDEzNDU3MH0.0JkcSSCDuZ508Rbxf_wTLvmFRE_EE3H5lVVBPWil94k",
      "user": {
        "id": "58e0d622-2978-4ce5-9faf-9c692b603a98",
        "name": "Veera",
        "email": "web@gmail.com",
        "role": "admin"
      }
    }
  }
}
```

# SignIn

```
mutation SignIn {
  signIn(input: {
    email: "web@gmail.com",
    password: "veerly1234"
  }) {
    message
    accessToken
    refreshToken
    user {
      id
      name
      email
      role
    }
  }
}
{
  "data": {
    "signIn": {
      "message": "Login successful",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGUwZDYyMi0yOTc4LTRjZTUtOWZhZi05YzY5MmI2MDNhOTgiLCJlbWFpbCI6IndlYkBnbWFpbC5jb20iLCJpYXQiOjE3NjM1Mjk5NjcsImV4cCI6MTc2MzUzMDg2N30.IxKTnu0uz_PA5_yfeHhWpAOoM3vpRyXrjy5qnwrYwzE",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGUwZDYyMi0yOTc4LTRjZTUtOWZhZi05YzY5MmI2MDNhOTgiLCJpYXQiOjE3NjM1Mjk5NjcsImV4cCI6MTc2NDEzNDc2N30.SckvRHlltBP81mn-WA0dzudM9-CNu9RjVDxLFazKBiY",
      "user": {
        "id": "58e0d622-2978-4ce5-9faf-9c692b603a98",
        "name": "Veera",
        "email": "web@gmail.com",
        "role": "admin"
      }
    }
  }
}
```

# VERIFY ACCESS TOKEN

```
mutation VerifyToken {
  verifyAccessToken(token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGUwZDYyMi0yOTc4LTRjZTUtOWZhZi05YzY5MmI2MDNhOTgiLCJlbWFpbCI6IndlYkBnbWFpbC5jb20iLCJpYXQiOjE3NjM1Mjk5NjcsImV4cCI6MTc2MzUzMDg2N30.IxKTnu0uz_PA5_yfeHhWpAOoM3vpRyXrjy5qnwrYwzE") {
    valid
    message
    user {
      id
      name
      email
      role
    }
  }
}
{
  "data": {
    "verifyAccessToken": {
      "valid": true,
      "message": "Access token is valid",
      "user": {
        "id": "58e0d622-2978-4ce5-9faf-9c692b603a98",
        "name": "Veera",
        "email": "web@gmail.com",
        "role": "admin"
      }
    }
  }
}
```

# REFRESH TOKEN

```
mutation RefreshToken {
  refreshAccessToken(refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGUwZDYyMi0yOTc4LTRjZTUtOWZhZi05YzY5MmI2MDNhOTgiLCJlbWFpbCI6IndlYkBnbWFpbC5jb20iLCJpYXQiOjE3NjM1Mjk5NjcsImV4cCI6MTc2MzUzMDg2N30.IxKTnu0uz_PA5_yfeHhWpAOoM3vpRyXrjy5qnwrYwzE") {
    message
    accessToken
    refreshToken
    user {
      id
      name
      email
      role
    }
  }
}
{
  "data": {
    "refreshAccessToken": {
      "message": "Tokens refreshed successfully",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGUwZDYyMi0yOTc4LTRjZTUtOWZhZi05YzY5MmI2MDNhOTgiLCJlbWFpbCI6IndlYkBnbWFpbC5jb20iLCJpYXQiOjE3NjM1MzAwODMsImV4cCI6MTc2MzUzMDk4M30._rR8K226arGdpM4eKrCMOkWsTutxeMDTQaKeXkDd-Bs",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGUwZDYyMi0yOTc4LTRjZTUtOWZhZi05YzY5MmI2MDNhOTgiLCJpYXQiOjE3NjM1MzAwODMsImV4cCI6MTc2NDEzNDg4M30.dvVt5CYulaPfyisCW3ERWCTs5xpYHtgndecXr1nhtJs",
      "user": {
        "id": "58e0d622-2978-4ce5-9faf-9c692b603a98",
        "name": "Veera",
        "email": "web@gmail.com",
        "role": "admin"
      }
    }
  }
}
```
