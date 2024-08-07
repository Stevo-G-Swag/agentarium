class TriagingAgent {
  process(query) {
    const tasks = this.identifyTasks(query);
    return this.delegateTasks(tasks);
  }

  identifyTasks(query) {
    const tasks = [];
    if (query.toLowerCase().includes('frontend') || query.toLowerCase().includes('ui')) {
      tasks.push('frontend');
    }
    if (query.toLowerCase().includes('backend') || query.toLowerCase().includes('api')) {
      tasks.push('backend');
    }
    if (query.toLowerCase().includes('test')) {
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
