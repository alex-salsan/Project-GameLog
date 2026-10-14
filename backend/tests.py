from django.contrib.auth.models import User
from rest_framework.test import APIClient, APITestCase

GAME = {
    'name': 'The Witcher 3 Remasteredes',
    'played_at': '2026-10-01T20:00:00Z',
    'rating': 9.5,
    'review': 'Genial',
}


class GameAccessTests(APITestCase):
    def setUp(self):
        self.alice = User.objects.create_user('alice', password='pass12345')
        self.bob = User.objects.create_user('bob', password='pass12345')
        self.client_alice = APIClient()
        self.client_alice.force_authenticate(self.alice)
        self.client_bob = APIClient()
        self.client_bob.force_authenticate(self.bob)

    def test_requires_authentication(self):
        res = APIClient().get('/api/games/')
        self.assertEqual(res.status_code, 401)

    def test_user_only_sees_own_games(self):
        self.client_alice.post('/api/games/', GAME, format='json')
        res = self.client_bob.get('/api/games/')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)

    def test_user_cannot_edit_or_delete_others_games(self):
        created = self.client_alice.post('/api/games/', GAME, format='json')
        game_id = created.data['id']
        put = self.client_bob.put(f'/api/games/{game_id}/', GAME, format='json')
        delete = self.client_bob.delete(f'/api/games/{game_id}/')
        self.assertIn(put.status_code, (403, 404))
        self.assertIn(delete.status_code, (403, 404))