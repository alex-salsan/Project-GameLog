from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Game(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='game')
  name = models.CharField(max_length=200)
  played_at = models.DateTimeField()
  rating = models.DecimalField(
    max_digits=3,
    decimal_places=1,
    validators=[MinValueValidator(0), MaxValueValidator(10)]
  )
  review = models.TextField(blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)

  class Meta:
      ordering = ['-played_at']

  def __str__(self):
      return f"{self.name} ({self.user.username})"