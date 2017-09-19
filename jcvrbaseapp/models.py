from django.db import models
from django.utils import timezone


class baseIndex(models.Model):
    userWelcome = models.ForeignKey('auth.user')
    welcomeDate = models.DateTimeField(default=timezone.now)
    welcomeText = models.CharField(max_length=200)

    def publish(self):
        self.save()

    def __str__(self):
        return self.welcomeText
