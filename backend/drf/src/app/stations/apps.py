from django.apps import AppConfig


class StationsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "src.app.stations"

    def ready(self):
        import src.app.stations.signals
