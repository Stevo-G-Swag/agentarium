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
          { role: 'system', content: 'You are a Tech Lead. Create development tasks based on the architecture. Return the tasks as a JSON array of objects, where each object has a "name" and "description" field.' },
          { role: 'user', content: `Create tasks for this architecture: ${architecture}` }
        ],
      });
      const content = response.choices[0].message.content;
      try {
        return JSON.parse(content);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return [{ name: 'Error', description: 'Failed to parse tasks. Please try again.' }];
      }
    } catch (error) {
      console.error('Error in createTasks:', error);
      return [{ name: 'Error', description: 'Failed to create tasks. Please try again.' }];
    }
  }
}

export default TechLeadAgent;
