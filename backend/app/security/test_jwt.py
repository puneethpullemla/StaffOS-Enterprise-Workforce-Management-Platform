from app.security.jwt import create_access_token, verify_access_token

data = {
    "sub": "1",
    "email": "puneeth@gmail.com",
    "role": "Admin",
}

token = create_access_token(data)

print("TOKEN:")
print(token)

print()

payload = verify_access_token(token)

print("PAYLOAD:")
print(payload)