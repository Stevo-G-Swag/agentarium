import unittest
from triaging_agent import TriagingAgent

class TestTriagingAgent(unittest.TestCase):
    def setUp(self):
        self.agent = TriagingAgent()

    def test_frontend_routing(self):
        query = "Create a frontend form for user registration"
        result = self.agent.process_query(query)
        self.assertTrue(any(agent == "FrontendAgent" for agent, _ in result))

    def test_backend_routing(self):
        query = "Implement a backend API for user authentication"
        result = self.agent.process_query(query)
        self.assertTrue(any(agent == "BackendAgent" for agent, _ in result))

    def test_testing_routing(self):
        query = "Write automated tests for the login functionality"
        result = self.agent.process_query(query)
        self.assertTrue(any(agent == "TestingAgent" for agent, _ in result))

    def test_multiple_agent_routing(self):
        query = "Create a web application with a frontend form, backend API, and automated tests"
        result = self.agent.process_query(query)
        agents = [agent for agent, _ in result]
        self.assertIn("FrontendAgent", agents)
        self.assertIn("BackendAgent", agents)
        self.assertIn("TestingAgent", agents)

if __name__ == '__main__':
    unittest.main()
