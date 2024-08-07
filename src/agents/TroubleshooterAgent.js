class TroubleshooterAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async provideFeedback(error) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are a Troubleshooter. Provide feedback on errors and suggest solutions.' },
        { role: 'user', content: `Provide feedback for this error: ${error}` }
      ],
    });
    return response.choices[0].message.content;
  }
}

export default TroubleshooterAgent;
