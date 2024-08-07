import OpenAI from 'openai';

class TriagingAgent {
  constructor(apiKey, model) {
    this.openai = new OpenAI({ apiKey });
    this.model = model;
  }

  async process(query) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are a triaging agent that identifies tasks in user queries.' },
        { role: 'user', content: query }
      ],
    });

    const tasks = this.identifyTasks(response.choices[0].message.content);
    return this.delegateTasks(tasks);
  }

  identifyTasks(content) {
    const tasks = [];
    if (content.toLowerCase().includes('frontend') || content.toLowerCase().includes('ui')) {
      tasks.push('frontend');
    }
    if (content.toLowerCase().includes('backend') || content.toLowerCase().includes('api')) {
      tasks.push('backend');
    }
    if (content.toLowerCase().includes('test')) {
      tasks.push('testing');
    }
    return tasks;
  }

  delegateTasks(tasks) {
    const results = [];
    tasks.forEach(task => {
      switch (task) {
        case 'frontend':
          results.push('Frontend task: Create UI components');
          break;
        case 'backend':
          results.push('Backend task: Implement API endpoints');
          break;
        case 'testing':
          results.push('Testing task: Write unit tests');
          break;
      }
    });
    return results.join('\n');
  }
}

export default TriagingAgent;
