class CodeMonkeyAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async implementChanges(description, codebase) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are a Code Monkey. Implement the described changes in the codebase. Return your response in valid JSON format.' },
        { role: 'user', content: `Implement these changes: ${description}\nCurrent codebase: ${JSON.stringify(codebase)}\n\nExample JSON response:\n{\n  "filename": "updated_code.js",\n  "content": "updated code here"\n}` }
      ],
    });

    const jsonString = response.choices[0].message.content;
    const isValidJson = /^(?:\{[\s\S]*\}|\[[\s\S]*\])$/.test(jsonString);

    if (isValidJson) {
      try {
        return JSON.parse(jsonString);
      } catch (error) {
        console.error("Error parsing JSON response (despite validation):", error);
        return {};
      }
    } else {
      console.error("Invalid JSON response:", jsonString);
      return {};
    }
  }
}

export default CodeMonkeyAgent;
