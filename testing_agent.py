from testing_tools import create_unit_tests, run_tests

class TestingAgent:
    def handle(self, query, conversation_history):
        test_code = create_unit_tests()
        test_results = run_tests()
        return f"Test Code:\n{test_code}\n\nTest Results:\n{test_results}"
