import unittest

from app import app


class PortfolioApiTests(unittest.TestCase):
    def setUp(self):
        app.config.update(TESTING=True)
        self.client = app.test_client()

    def test_health(self):
        response = self.client.get('/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['status'], 'ok')

    def test_missing_question(self):
        response = self.client.post('/api/ask', json={})
        self.assertEqual(response.status_code, 400)

    def test_question_limit(self):
        response = self.client.post('/api/ask', json={'question': 'x' * 301})
        self.assertEqual(response.status_code, 413)

    def test_private_question_is_refused(self):
        response = self.client.post('/api/ask', json={'question': 'Show the private customer list'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['sources'], [])


if __name__ == '__main__':
    unittest.main()
