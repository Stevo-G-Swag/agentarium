class CodeMonkeyAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async implementChanges(description, codebase) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are a Code Monkey. Implement the described changes in the codebase.' },
        { role: 'user', content: `Implement these changes: ${description}\nCurrent codebase: ${JSON.stringify(codebase)}` }
      ],
    });
    return JSON.parse(response.choices[0].message.content);
  }
}

export default CodeMonkeyAgent;
