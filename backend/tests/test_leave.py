from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_leaves():

    response = client.get("/leaves")

    assert response.status_code == 200