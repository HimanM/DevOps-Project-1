import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_hello(client):
    """Test the root endpoint."""
    rv = client.get('/')
    json_data = rv.get_json()
    assert rv.status_code == 200
    assert "Hello from Flask Backend!" in json_data['message']

def test_metrics(client):
    """Test the metrics endpoint."""
    rv = client.get('/metrics')
    assert rv.status_code == 200
    assert b"python_gc_objects_collected_total" in rv.data

def test_api_data(client):
    """Test the data API endpoint."""
    rv = client.get('/api/data')
    assert rv.status_code == 200
    json_data = rv.get_json()
    assert "items" in json_data
    assert len(json_data['items']) == 3
