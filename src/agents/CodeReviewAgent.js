class CodeReviewAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async reviewCode(code) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { 
          role: 'system', 
          content: 'You are a Code Review Agent. Analyze the given code for potential errors, style issues, and best practices. Provide specific and actionable feedback.' 
        },
        { 
          role: 'user', 
          content: `Review this code:\n\n\`\`\`\n${code}\n\`\`\`` 
        }
      ],
    });
    return response.choices[0].message.content;
  }
}

export default CodeReviewAgent;
