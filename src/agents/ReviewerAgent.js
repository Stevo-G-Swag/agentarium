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

    const content = response.choices[0].message.content;
    try {
      // Remove any markdown code block syntax
      const cleanedContent = content.replace(/```(?:json)?\n?/g, '').trim();
      return JSON.parse(cleanedContent);
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      return {
        approved: false,
        feedback: "Error parsing review response. Please try again."
      };
    }
  }
}

export default ReviewerAgent;
