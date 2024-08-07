class ReviewerAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async reviewChanges(changes) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are a Reviewer. Review the code changes and provide feedback. Return your response in valid JSON format.' },
        { role: 'user', content: `Review these changes: ${JSON.stringify(changes)}\n\nExample JSON response:\n{\n  "approved": true,\n  "feedback": "The changes look good. No issues found."\n}` }
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

export default ReviewerAgent;
