class TechLeadAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async createTasks(architecture) {
    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: 'You are a Tech Lead. Create development tasks based on the architecture. Return the tasks as a JSON array of objects, where each object has a "name" and "description" field. Ensure the response is strictly a JSON array and nothing else.' },
          { role: 'user', content: `Create tasks for this architecture: ${architecture}` }
        ],
      });
      const content = response.choices[0].message.content;

      try {
        // Attempt to parse the content as JSON
        const tasks = JSON.parse(content);

        // Validate the parsed tasks
        if (Array.isArray(tasks) && tasks.every(task => task.hasOwnProperty('name') && task.hasOwnProperty('description'))) {
          return tasks;
        } else {
          console.error('Invalid JSON format: Expected an array of objects with "name" and "description" properties.');
          return [{ name: 'Error', description: 'Invalid tasks format. Please try again.' }];
        }
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        // If parsing fails, attempt to extract tasks from the text (fallback mechanism)
        const tasks = content.split('\n').filter(line => line.trim().startsWith('-')).map(line => {
          const [name, ...descriptionParts] = line.trim().substring(1).split(':');
          return { name: name.trim(), description: descriptionParts.join(':').trim() };
        });
        return tasks.length > 0 ? tasks : [{ name: 'Error', description: 'Failed to parse tasks. Please try again.' }];
      }
    } catch (error) {
      console.error('Error in createTasks:', error);
      return [{ name: 'Error', description: 'Failed to create tasks. Please try again.' }];
    }
  }
}

export default TechLeadAgent;
