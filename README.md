# Welcome to your GPT Engineer project

## Project info

**Project**: feature-builder-agentarium 

**URL**: https://run.gptengineer.app/projects/fb18ad09-34f0-45fb-82ba-7c5e9be929cd/improve

**Description**: **Prompt:**




You are tasked with designing a multi-agent system for a software development team. This system should consist of several specialized agents, each responsible for different aspects of software development. The goal is to create a fully functional codebase that includes a triaging agent, a frontend agent, a backend agent, and a testing agent. Each agent should have specific tools to perform its tasks, and the system should be able to handle a user query that involves developing a new feature for a web application.




**Project Structure:**




1. **Main Entry Point:**
   - `main.py`: This script initializes the triaging agent and processes a user query to develop a new feature for a web application.




2. **Agents:**
   - `triaging_agent.py`: Routes tasks to the appropriate agents based on the user query.
   - `frontend_agent.py`: Handles frontend development tasks such as creating forms and styling components.
   - `backend_agent.py`: Manages backend development tasks including API creation and database integration.
   - `testing_agent.py`: Responsible for creating and running automated tests.




3. **Tools:**
   - `frontend_tools.py`: Contains functions for creating HTML forms and CSS styles.
   - `backend_tools.py`: Provides functions for creating APIs using Flask and integrating with a SQLite database.
   - `testing_tools.py`: Includes functions for creating unit tests using the `unittest` framework and simulating test execution.




4. **Tests:**
   - `test_agents.py`: Uses `unittest` to verify that the triaging agent correctly routes tasks to the appropriate agents.




**Detailed Functionality:**




- **main.py:**
  - Initialize the `TriagingAgent`.
  - Process a user query that specifies the need for a frontend form, a backend API, and automated tests.




- **triaging_agent.py:**
  - Implement logic to parse the user query and determine which agents to activate based on keywords (e.g., "frontend", "backend", "test").
  - Call the appropriate agent's `handle` method and pass the query along with a conversation history.




- **frontend_agent.py:**
  - Use `create_form` and `style_component` from `frontend_tools.py` to generate HTML and CSS based on the query.
  - Append the generated code to the conversation history.




- **backend_agent.py:**
  - Utilize `create_api` and `integrate_database` from `backend_tools.py` to produce backend logic.
  - Append the generated code to the conversation history.




- **testing_agent.py:**
  - Leverage `create_unit_tests` and `run_tests` from `testing_tools.py` to create and simulate test execution.
  - Append the test code and results to the conversation history.




- **frontend_tools.py:**
  - Implement `create_form` to generate an HTML form with fields for name and email.
  - Implement `style_component` to provide basic CSS styling for the form.




- **backend_tools.py:**
  - Implement `create_api` to set up a Flask API endpoint for form submissions.
  - Implement `integrate_database` to define functions for initializing and interacting with a SQLite database.




- **testing_tools.py:**
  - Implement `create_unit_tests` to define a test case for the API using `unittest`.
  - Implement `run_tests` to simulate running the tests and return a success message.




- **test_agents.py:**
  - Write test cases to ensure that the `TriagingAgent` correctly identifies and routes tasks to the `FrontendAgent`, `BackendAgent`, and `TestingAgent`.




**Objective:**




The system should be capable of processing a user query that specifies a need for a frontend form, backend API, and automated tests, and then generate the corresponding code for each component. The triaging agent should effectively delegate tasks to the appropriate agents, and the entire system should be testable using the provided `unittest` framework. 

## Who is the owner of this repository?
By default, GPT Engineer projects are created with public GitHub repositories.

However, you can easily transfer the repository to your own GitHub account by navigating to your [GPT Engineer project](https://run.gptengineer.app/projects/fb18ad09-34f0-45fb-82ba-7c5e9be929cd/improve) and selecting Settings -> GitHub. 

## How can I edit this code?
There are several ways of editing your application.

**Use GPT Engineer**

Simply visit the GPT Engineer project at [GPT Engineer](https://run.gptengineer.app/projects/fb18ad09-34f0-45fb-82ba-7c5e9be929cd/improve) and start prompting.

Changes made via gptengineer.app will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in the GPT Engineer UI.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps: 

```sh
git clone https://github.com/GPT-Engineer-App/feature-builder-agentarium.git
cd feature-builder-agentarium
npm i

# This will run a dev server with auto reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

All GPT Engineer projects can be deployed directly via the GPT Engineer app. 

Simply visit your project at [GPT Engineer](https://run.gptengineer.app/projects/fb18ad09-34f0-45fb-82ba-7c5e9be929cd/improve) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain, then we recommend GitHub Pages.

To use GitHub Pages you will need to follow these steps: 
- Deploy your project using GitHub Pages - instructions [here](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-your-site)
- Configure a custom domain for your GitHub Pages site - instructions [here](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)