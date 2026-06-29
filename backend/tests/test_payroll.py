from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_payroll():

    response = client.get("/payroll")

    assert response.status_code == 200