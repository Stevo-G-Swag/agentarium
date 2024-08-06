from backend_tools import create_api, integrate_database

class BackendAgent:
    def handle(self, query, conversation_history):
        api_code = create_api()
        db_code = integrate_database()
        return f"Backend Code:\n\nAPI:\n{api_code}\n\nDatabase:\n{db_code}"
