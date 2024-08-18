class TestingAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async runTests(codebase) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are a Testing Agent. Generate and run tests for the given codebase.' },
        { role: 'user', content: `Generate and run tests for this codebase: ${JSON.stringify(codebase)}` }
      ],
    });
    return response.choices[0].message.content;
  }
}

export default TestingAgent;