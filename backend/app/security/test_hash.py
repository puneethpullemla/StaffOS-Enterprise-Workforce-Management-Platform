from app.security.hashing import hash_password, verify_password

password = "Puneeth@123"

hashed = hash_password(password)

print("Original:", password)
print("Hashed:", hashed)

print("Correct Password:", verify_password(password, hashed))
print("Wrong Password:", verify_password("WrongPassword", hashed))