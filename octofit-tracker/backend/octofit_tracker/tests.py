from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from .models import User, Team, Activity, Leaderboard, Workout

class APITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.team = Team.objects.create(name="TeamTest")
        self.user = User.objects.create(name="Test User", email="test@example.com", team="TeamTest")
        self.activity = Activity.objects.create(user_email="test@example.com", activity="run", distance=5.0)
        self.leaderboard = Leaderboard.objects.create(team="TeamTest", points=100)
        self.workout = Workout.objects.create(user_email="test@example.com", workout="pushups", reps=20)

    def test_api_root(self):
        response = self.client.get(reverse('api-root'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('users', response.data)

    def test_user_list(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, 200)

    def test_team_list(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, 200)

    def test_activity_list(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, 200)

    def test_leaderboard_list(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, 200)

    def test_workout_list(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, 200)
