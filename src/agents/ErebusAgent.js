import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

class AgentCore {
  // ... (keep existing code)
}

class DRLModule {
  // ... (keep existing code)
}

class MASModule {
  // ... (keep existing code)
}

class CognitiveArchitecture {
  // ... (keep existing code)
}

class ACIInterface {
  // ... (keep existing code)
}

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
    };
    this.prompts = this.loadPrompts();
  }

  loadPrompts() {
    const promptsDir = path.join(__dirname, 'prompts');
    const prompts = {};
    fs.readdirSync(promptsDir).forEach(file => {
      const promptName = path.basename(file, '.prompt');
      prompts[promptName] = fs.readFileSync(path.join(promptsDir, file), 'utf-8');
    });
    return prompts;
  }

  async process(appName, description, updateCallback) {
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
        
        updateCallback('review', 'Reviewing changes...');
        let reviewResult = await this.agents.reviewer.reviewChanges(codeChanges, this.prompts.reviewer);
        
        while (!reviewResult.approved) {
          updateCallback('revision', 'Revising code...');
          codeChanges = await this.agents.codeMonkey.implementChanges(reviewResult.feedback, this.codebase, this.prompts.code_monkey);
          reviewResult = await this.agents.reviewer.reviewChanges(codeChanges, this.prompts.reviewer);
        }
        
        this.updateCodebase(codeChanges);
      }
      
      updateCallback('documentation', 'Writing documentation...');
      const documentation = await this.agents.technicalWriter.writeDocumentation(this.codebase, this.prompts.technical_writer);
      
      updateCallback('complete', 'Project completed!');
      return {
        appName,
        specification,
        architecture,
        codebase: this.codebase,
        documentation
      };
    } catch (error) {
      console.error('Error processing app creation:', error);
      updateCallback('error', 'An error occurred. Troubleshooting...');
      return this.agents.troubleshooter.provideFeedback(error, this.prompts.troubleshooter);
    }
  }

  updateCodebase(changes) {
    for (const [filename, content] of Object.entries(changes)) {
      this.codebase[filename] = content;
    }
  }
}
