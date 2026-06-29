from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_attendance():

    response = client.get("/attendance")

    assert response.status_code == 200