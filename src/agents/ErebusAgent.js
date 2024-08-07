import OpenAI from 'openai';
import * as agents from '.';
import * as tools from '../tools';

export class ErebusAgent {
  constructor(apiKey, model) {
    this.openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    this.model = model;
    this.codebase = {};
    this.agents = Object.entries(agents).reduce((acc, [name, Agent]) => {
      acc[name] = new Agent(this.openai, this.model);
      return acc;
    }, {});
    this.tools = tools;
    this.prompts = this.loadPrompts();
    this.feedback = [];
    this.sandbox = null;
  }

  async loadPrompts() {
    const promptFiles = [
      'architect.prompt',
      'developer.prompt',
      'reviewer.prompt',
      'tester.prompt',
      'specification_writer.prompt',
      'tech_lead.prompt',
      'code_monkey.prompt',
      'troubleshooter.prompt',
    ];

    const prompts = {};

    for (const file of promptFiles) {
      const response = await fetch(`/src/agents/prompts/${file}`);
      const text = await response.text();
      prompts[file.split('.')[0]] = text;
    }

    return prompts;
  }

  async process(appName, description, updateCallback, userFeedback) {
    try {
      const steps = [
        { name: 'specification', message: 'Writing specification...', agent: 'specificationWriter', method: 'writeSpecification', args: [description] },
        { name: 'architecture', message: 'Designing architecture...', agent: 'architect', method: 'designArchitecture', args: ['specification'] },
        { name: 'tasks', message: 'Creating tasks...', agent: 'techLead', method: 'createTasks', args: ['architecture'] },
        { name: 'frontend', message: 'Implementing frontend...', agent: 'frontend', method: 'implement', args: ['tasks'] },
        { name: 'backend', message: 'Implementing backend...', agent: 'backend', method: 'implement', args: ['tasks'] },
        { name: 'database', message: 'Setting up database...', agent: 'database', method: 'setup', args: ['tasks'] },
        { name: 'devOps', message: 'Setting up CI/CD...', agent: 'devOps', method: 'setupCICD', args: ['tasks'] },
        { name: 'security', message: 'Performing security analysis...', agent: 'security', method: 'analyze', args: ['codebase'] },
        { name: 'performance', message: 'Optimizing performance...', agent: 'performance', method: 'optimize', args: ['codebase'] },
        { name: 'accessibility', message: 'Ensuring accessibility...', agent: 'accessibility', method: 'implement', args: ['codebase'] },
        { name: 'localization', message: 'Implementing localization...', agent: 'localization', method: 'implement', args: ['codebase'] },
        { name: 'documentation', message: 'Writing documentation...', agent: 'technicalWriter', method: 'writeDocumentation', args: ['codebase'] },
      ];

      const results = {};

      for (const step of steps) {
        updateCallback(step.name, step.message);
        try {
          results[step.name] = await this.executeAgentTask(step.agent, step.method, step.args.map(arg => results[arg] || arg));
        } catch (error) {
          console.error(`Error in ${step.name} step:`, error);
          updateCallback('error', `Error in ${step.name} step. Troubleshooting...`);
          const feedback = await this.agents.troubleshooter.provideFeedback(error);
          updateCallback('troubleshoot', feedback);
          throw new Error(`${step.name} step failed: ${error.message}`);
        }
      }

      this.feedback.push(userFeedback);
      await this.learn(userFeedback);

      updateCallback('complete', 'Project completed!');
      return {
        appName,
        ...results,
        codebase: this.codebase,
      };
    } catch (error) {
      console.error('Error processing app creation:', error);
      updateCallback('error', 'A critical error occurred. Unable to complete the process.');
      return {
        appName,
        error: error.message,
        codebase: this.codebase,
      };
    } finally {
      // Cleanup code if needed
    }
  }

  async executeAgentTask(agentName, method, args) {
    const agent = this.agents[agentName];
    if (!agent || typeof agent[method] !== 'function') {
      throw new Error(`Invalid agent or method: ${agentName}.${method}`);
    }
    return await agent[method](...args);
  }

  async learn(feedback) {
    // Implement adaptive learning based on user feedback
    console.log('Learning from feedback:', feedback);
    // TODO: Implement actual learning logic
  }

  updateCodebase(changes) {
    for (const [filename, content] of Object.entries(changes)) {
      this.codebase[filename] = content;
    }
    this.tools.codeEditor.updateCode(changes);
    this.tools.browserPreview.update(this.codebase);
  }
}
