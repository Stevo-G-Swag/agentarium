class TechLeadAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async createTasks(architecture) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are a Tech Lead. Create development tasks based on the architecture.' },
        { role: 'user', content: `Create tasks for this architecture: ${architecture}` }
      ],
    });
    return JSON.parse(response.choices[0].message.content);
  }
}

export default TechLeadAgent;
