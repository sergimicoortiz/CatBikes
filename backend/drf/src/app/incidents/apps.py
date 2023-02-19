from django.apps import AppConfig


class IncidentsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "src.app.incidents"

    def ready(self):
        import src.app.incidents.signals
