class ReviewerAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async reviewChanges(changes) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are a Reviewer. Review the code changes and provide feedback.' },
        { role: 'user', content: `Review these changes: ${JSON.stringify(changes)}` }
      ],
    });
    return JSON.parse(response.choices[0].message.content);
  }
}

export default ReviewerAgent;
