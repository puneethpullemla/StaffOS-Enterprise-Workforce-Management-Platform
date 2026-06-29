from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_register():

    response = client.post(
        "/auth/register",
        json={
            "username": "pytest",
            "email": "pytest@test.com",
            "password": "Password@123"
        }
    )

    assert response.status_code in [201, 400]