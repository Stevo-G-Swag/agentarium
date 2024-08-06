from triaging_agent import TriagingAgent

def main():
    triaging_agent = TriagingAgent()
    user_query = "Create a web application with a frontend form for name and email, a backend API to handle form submissions, and automated tests for the API."
    result = triaging_agent.process_query(user_query)
    print(result)

if __name__ == "__main__":
    main()
