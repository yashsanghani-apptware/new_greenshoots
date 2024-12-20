from django.db import models

class Function(models.Model):
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=False)
    code_path = models.FilePathField(path="/path/to/function/directory")

    def __str__(self):
        return self.name

