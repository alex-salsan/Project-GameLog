from django.contrib.auth.models import User
from rest_framework.test import APITestCase


class AuthTests(APITestCase):
    def test_register_creates_user(self):
        res = self.client.post('/api/register/', {'username': 'alice', 'password': 'pass12345'}, format='json')
        self.assertEqual(res.status_code, 201)
        self.assertNotIn('password', res.data)
        self.assertTrue(User.objects.filter(username='alice').exists())

    def test_register_rejects_duplicate_username(self):
        User.objects.create_user('alice', password='pass12345')
        res = self.client.post('/api/register/', {'username': 'alice', 'password': 'pass12345'}, format='json')
        self.assertEqual(res.status_code, 400)

    def test_login_returns_tokens(self):
        User.objects.create_user('alice', password='pass12345')
        res = self.client.post('/api/login/', {'username': 'alice', 'password': 'pass12345'}, format='json')
        self.assertEqual(res.status_code, 200)
        self.assertIn('access', res.data)
        self.assertIn('refresh', res.data)

    def test_login_rejects_wrong_password(self):
        User.objects.create_user('alice', password='pass12345')
        res = self.client.post('/api/login/', {'username': 'alice', 'password': 'wrong'}, format='json')
        self.assertEqual(res.status_code, 401)
