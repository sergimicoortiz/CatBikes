from django.apps import AppConfig


class UserConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'src.app.user'

    def ready(self):
            import src.app.user.signals