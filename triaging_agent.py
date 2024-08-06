from frontend_agent import FrontendAgent
from backend_agent import BackendAgent
from testing_agent import TestingAgent

class TriagingAgent:
    def __init__(self):
        self.frontend_agent = FrontendAgent()
        self.backend_agent = BackendAgent()
        self.testing_agent = TestingAgent()

    def process_query(self, query):
        conversation_history = []
        
        if "frontend" in query.lower():
            frontend_result = self.frontend_agent.handle(query, conversation_history)
            conversation_history.append(("FrontendAgent", frontend_result))
        
        if "backend" in query.lower() or "api" in query.lower():
            backend_result = self.backend_agent.handle(query, conversation_history)
            conversation_history.append(("BackendAgent", backend_result))
        
        if "test" in query.lower():
            testing_result = self.testing_agent.handle(query, conversation_history)
            conversation_history.append(("TestingAgent", testing_result))
        
        return conversation_history
