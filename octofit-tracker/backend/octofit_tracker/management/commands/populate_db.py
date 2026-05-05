from django.core.management.base import BaseCommand
from octofit_tracker.models import Team, User, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        spiderman = User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel)
        ironman = User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel)
        wonderwoman = User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc)
        batman = User.objects.create(name='Batman', email='batman@dc.com', team=dc)

        # Activities
        Activity.objects.create(user=spiderman, activity='web swinging', duration=30)
        Activity.objects.create(user=ironman, activity='flying', duration=45)
        Activity.objects.create(user=wonderwoman, activity='training', duration=60)
        Activity.objects.create(user=batman, activity='detective work', duration=50)

        # Workouts
        Workout.objects.create(user=spiderman, workout='pull-ups', reps=100)
        Workout.objects.create(user=ironman, workout='bench press', reps=80)
        Workout.objects.create(user=wonderwoman, workout='squats', reps=120)
        Workout.objects.create(user=batman, workout='push-ups', reps=150)

        # Leaderboard
        Leaderboard.objects.create(user=spiderman, score=1000)
        Leaderboard.objects.create(user=ironman, score=950)
        Leaderboard.objects.create(user=wonderwoman, score=1100)
        Leaderboard.objects.create(user=batman, score=1200)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data using Django ORM.'))
