class DebuggerAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async debug(error, codebase) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are a Debugger. Analyze the error and suggest fixes.' },
        { role: 'user', content: `Debug this error: ${error}\nCodebase: ${JSON.stringify(codebase)}` }
      ],
    });
    return response.choices[0].message.content;
  }
}

export default DebuggerAgent;
