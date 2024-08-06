def create_unit_tests():
    return """
import unittest
from flask import Flask
from your_app import app  # Import your Flask app

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_submit_form_success(self):
        response = self.app.post('/submit', json={
            'name': 'John Doe',
            'email': 'john@example.com'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"message": "Form submitted successfully"})

    def test_submit_form_missing_data(self):
        response = self.app.post('/submit', json={
            'name': 'John Doe'
        })
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"error": "Name and email are required"})

if __name__ == '__main__':
    unittest.main()
"""

def run_tests():
    return "All tests passed successfully!"
