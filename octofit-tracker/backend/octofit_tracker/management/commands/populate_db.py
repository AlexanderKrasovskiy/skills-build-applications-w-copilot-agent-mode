from django.core.management.base import BaseCommand
from django.conf import settings

import pymongo

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Получаем соединение с MongoDB
        client = pymongo.MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']

        # Очистка коллекций
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Данные пользователей
        users = [
            {"name": "Tony Stark", "email": "tony@marvel.com", "team": "marvel"},
            {"name": "Steve Rogers", "email": "steve@marvel.com", "team": "marvel"},
            {"name": "Bruce Wayne", "email": "bruce@dc.com", "team": "dc"},
            {"name": "Clark Kent", "email": "clark@dc.com", "team": "dc"},
        ]
        db.users.insert_many(users)
        db.users.create_index([("email", pymongo.ASCENDING)], unique=True)

        # Данные команд
        teams = [
            {"name": "marvel", "members": ["tony@marvel.com", "steve@marvel.com"]},
            {"name": "dc", "members": ["bruce@dc.com", "clark@dc.com"]},
        ]
        db.teams.insert_many(teams)

        # Данные активностей
        activities = [
            {"user_email": "tony@marvel.com", "activity": "run", "distance": 5},
            {"user_email": "steve@marvel.com", "activity": "cycle", "distance": 20},
            {"user_email": "bruce@dc.com", "activity": "swim", "distance": 2},
            {"user_email": "clark@dc.com", "activity": "fly", "distance": 100},
        ]
        db.activities.insert_many(activities)

        # Данные лидерборда
        leaderboard = [
            {"team": "marvel", "points": 100},
            {"team": "dc", "points": 120},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Данные тренировок
        workouts = [
            {"user_email": "tony@marvel.com", "workout": "bench press", "reps": 10},
            {"user_email": "steve@marvel.com", "workout": "push ups", "reps": 50},
            {"user_email": "bruce@dc.com", "workout": "pull ups", "reps": 20},
            {"user_email": "clark@dc.com", "workout": "squats", "reps": 30},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db успешно заполнена тестовыми данными!'))
