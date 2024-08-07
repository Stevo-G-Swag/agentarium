class DeveloperAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async describeImplementation(task) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are a Developer. Describe how to implement the given task.' },
        { role: 'user', content: `Describe how to implement this task: ${task}` }
      ],
    });
    return response.choices[0].message.content;
  }
}

export default DeveloperAgent;
