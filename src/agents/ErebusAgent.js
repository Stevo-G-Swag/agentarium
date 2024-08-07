import OpenAI from 'openai';
import ProductOwnerAgent from './ProductOwnerAgent';
import SpecificationWriterAgent from './SpecificationWriterAgent';
import ArchitectAgent from './ArchitectAgent';
import TechLeadAgent from './TechLeadAgent';
import DeveloperAgent from './DeveloperAgent';
import CodeMonkeyAgent from './CodeMonkeyAgent';
import ReviewerAgent from './ReviewerAgent';
import TroubleshooterAgent from './TroubleshooterAgent';
import DebuggerAgent from './DebuggerAgent';
import TechnicalWriterAgent from './TechnicalWriterAgent';
import FrontendAgent from './FrontendAgent';
import BackendAgent from './BackendAgent';
import DatabaseAgent from './DatabaseAgent';
import DevOpsAgent from './DevOpsAgent';
import SecurityAgent from './SecurityAgent';
import PerformanceAgent from './PerformanceAgent';
import AccessibilityAgent from './AccessibilityAgent';
import LocalizationAgent from './LocalizationAgent';
import BlockchainAgent from './BlockchainAgent';
import CodeEditor from '../components/CodeEditor';
import TerminalComponent from '../components/TerminalComponent';
import BrowserPreview from '../components/BrowserPreview';

export class ErebusAgent {
  constructor(apiKey, model) {
    this.openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    this.model = model;
    this.codebase = {};
    this.agents = {
      productOwner: new ProductOwnerAgent(),
      specificationWriter: new SpecificationWriterAgent(this.openai, this.model),
      architect: new ArchitectAgent(this.openai, this.model),
      techLead: new TechLeadAgent(this.openai, this.model),
      developer: new DeveloperAgent(this.openai, this.model),
      codeMonkey: new CodeMonkeyAgent(this.openai, this.model),
      reviewer: new ReviewerAgent(this.openai, this.model),
      troubleshooter: new TroubleshooterAgent(this.openai, this.model),
      debugger: new DebuggerAgent(this.openai, this.model),
      technicalWriter: new TechnicalWriterAgent(this.openai, this.model),
      frontend: new FrontendAgent(this.openai, this.model),
      backend: new BackendAgent(this.openai, this.model),
      database: new DatabaseAgent(this.openai, this.model),
      devOps: new DevOpsAgent(this.openai, this.model),
      security: new SecurityAgent(this.openai, this.model),
      performance: new PerformanceAgent(this.openai, this.model),
      accessibility: new AccessibilityAgent(this.openai, this.model),
      localization: new LocalizationAgent(this.openai, this.model),
      blockchain: new BlockchainAgent(this.openai, this.model),
    };
    this.tools = {
      codeEditor: CodeEditor,
      terminal: TerminalComponent,
      browser: BrowserPreview,
    };
    this.prompts = this.loadPrompts();
    this.feedback = [];
  }

  loadPrompts() {
    // For client-side, we'll use a simple object to store prompts
    return {
      specification_writer: "You are an expert software architect. Your task is to design the high-level architecture for a software application based on the given specification.",
      architect: "You are an expert software architect. Your task is to design the high-level architecture for a software application based on the given specification.",
      tech_lead: "You are an experienced tech lead. Your task is to create development tasks based on the given architecture.",
      developer: "You are an expert software developer. Your task is to implement the specified feature or component based on the given architecture and requirements.",
      code_monkey: "You are a diligent code implementer. Your task is to write or modify code based on the given instructions and existing codebase.",
      reviewer: "You are an experienced code reviewer. Your task is to review the given code changes and provide constructive feedback.",
      troubleshooter: "You are a Troubleshooter. Provide feedback on errors and suggest solutions."
    };
  }

  async process(appName, description, updateCallback, userFeedback) {
    try {
      updateCallback('specification', 'Writing specification...');
      const specification = await this.agents.specificationWriter.writeSpecification(description, this.prompts.specification_writer);
      
      updateCallback('architecture', 'Designing architecture...');
      const architecture = await this.agents.architect.designArchitecture(specification, this.prompts.architect);
      
      updateCallback('tasks', 'Creating tasks...');
      const tasks = await this.agents.techLead.createTasks(architecture, this.prompts.tech_lead);
      
      for (const task of tasks) {
        updateCallback('development', `Implementing task: ${task.name}...`);
        let taskImplementation = await this.agents.developer.describeImplementation(task, this.prompts.developer);
        
        updateCallback('coding', 'Writing code...');
        let codeChanges = await this.agents.codeMonkey.implementChanges(taskImplementation, this.codebase, this.prompts.code_monkey);
        
        // Use the CodeEditor tool
        this.tools.codeEditor.updateCode(codeChanges);
        
        updateCallback('review', 'Reviewing changes...');
        let reviewResult = await this.agents.reviewer.reviewChanges(codeChanges, this.prompts.reviewer);
        
        while (!reviewResult.approved) {
          updateCallback('revision', 'Revising code...');
          codeChanges = await this.agents.codeMonkey.implementChanges(reviewResult.feedback, this.codebase, this.prompts.code_monkey);
          this.tools.codeEditor.updateCode(codeChanges);
          reviewResult = await this.agents.reviewer.reviewChanges(codeChanges, this.prompts.reviewer);
        }
        
        this.updateCodebase(codeChanges);
        await this.tools.terminal.executeCommand(`git commit -m "Implemented ${task.name}"`);
      }
      
      updateCallback('frontend', 'Optimizing frontend...');
      await this.agents.frontend.optimize(this.codebase);
      
      updateCallback('backend', 'Optimizing backend...');
      await this.agents.backend.optimize(this.codebase);
      
      updateCallback('database', 'Optimizing database...');
      await this.agents.database.optimize(this.codebase);
      
      updateCallback('devOps', 'Setting up CI/CD...');
      const cicdConfig = await this.agents.devOps.setupCICD(this.codebase);
      
      updateCallback('security', 'Performing security analysis...');
      const securityReport = await this.agents.security.analyze(this.codebase);
      
      updateCallback('performance', 'Optimizing performance...');
      await this.agents.performance.optimize(this.codebase);
      
      updateCallback('accessibility', 'Ensuring accessibility...');
      await this.agents.accessibility.implement(this.codebase);
      
      updateCallback('localization', 'Implementing localization...');
      await this.agents.localization.implement(this.codebase);
      
      updateCallback('blockchain', 'Analyzing blockchain integration...');
      const blockchainSuggestions = await this.agents.blockchain.analyze(this.codebase);
      
      updateCallback('documentation', 'Writing documentation...');
      const documentation = await this.agents.technicalWriter.writeDocumentation(this.codebase, this.prompts.technical_writer);
      
      this.feedback.push(userFeedback);
      this.learn(userFeedback);
      
      updateCallback('complete', 'Project completed!');
      return {
        appName,
        specification,
        architecture,
        codebase: this.codebase,
        documentation,
        cicdConfig,
        securityReport,
        blockchainSuggestions
      };
    } catch (error) {
      console.error('Error processing app creation:', error);
      updateCallback('error', 'An error occurred. Troubleshooting...');
      return this.agents.troubleshooter.provideFeedback(error, this.prompts.troubleshooter);
    }
  }

  learn(feedback) {
    // Implement adaptive learning based on user feedback
  }

  updateCodebase(changes) {
    for (const [filename, content] of Object.entries(changes)) {
      this.codebase[filename] = content;
    }
  }
}
