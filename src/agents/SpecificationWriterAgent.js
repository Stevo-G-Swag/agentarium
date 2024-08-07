class SpecificationWriterAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async writeSpecification(description) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are a Specification Writer. Ask questions to clarify the project requirements if needed.' },
        { role: 'user', content: `Write a specification for the following app: ${description}` }
      ],
    });
    return response.choices[0].message.content;
  }
}

export default SpecificationWriterAgent;
