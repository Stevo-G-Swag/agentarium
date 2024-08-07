class ArchitectAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async designArchitecture(specification) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are an Architect. Design the architecture and specify technologies for the app.' },
        { role: 'user', content: `Design the architecture for this specification: ${specification}` }
      ],
    });
    return response.choices[0].message.content;
  }
}

export default ArchitectAgent;
