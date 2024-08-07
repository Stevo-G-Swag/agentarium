class TechnicalWriterAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async writeDocumentation(codebase) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are a Technical Writer. Write documentation for the given codebase.' },
        { role: 'user', content: `Write documentation for this codebase: ${JSON.stringify(codebase)}` }
      ],
    });
    return response.choices[0].message.content;
  }
}

export default TechnicalWriterAgent;
