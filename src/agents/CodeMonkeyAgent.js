class CodeMonkeyAgent {
  constructor(openai, model) {
    this.openai = openai;
    this.model = model;
  }

  async implementChanges(description, codebase) {
    const response = await this.openai.chat.completions.create({
      model: this.model, // Use the updated model here
      messages: [
        { role: 'system', content: 'You are a Code Monkey. Implement the described changes in the codebase. Return your response in valid JSON format.' },
        { role: 'user', content: `Implement these changes: ${description}\nCurrent codebase: ${JSON.stringify(codebase)}\n\nExample JSON response:\n{\n  "filename": "updated_code.js",\n  "content": "updated code here"\n}` }
      ],
    });

    const content = response.choices[0].message.content;
    try {
      // Remove any markdown code block syntax
      const cleanedContent = content.replace(/```(?:json)?\n?/g, '').trim();
      const parsedContent = JSON.parse(cleanedContent);
      if (typeof parsedContent === 'object' && parsedContent !== null) {
        return parsedContent;
      }
    } catch (error) {
      console.error("Error parsing JSON response:", error);
    }
    
    // If parsing fails or the result is not an object, return a structured response
    return {
      "filename": "updated_code.js",
      "content": content.replace(/```(?:json)?\n?/g, '').trim()
    };
  }
}

export default CodeMonkeyAgent;
