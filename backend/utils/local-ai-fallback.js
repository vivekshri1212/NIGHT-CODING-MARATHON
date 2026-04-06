const normalizeTopics = (topicsToFocus) =>
  String(topicsToFocus || "")
    .split(",")
    .map((topic) => topic.trim())
    .filter(Boolean);

const createAnswer = (role, experience, topic, index) => {
  const safeTopic = topic || `core ${role} concepts`;

  return [
    `**What this checks:** Your understanding of **${safeTopic}** for a **${role}** interview.`,
    "",
    "**How to answer:**",
    "- Start with a short definition in plain language.",
    "- Mention one practical use case from real projects.",
    "- Explain one trade-off, pitfall, or best practice.",
    `- Tie it back to an engineer with **${experience} years** of experience.`,
    "",
    "**Example structure:**",
    "1. Definition",
    "2. Real-world usage",
    "3. Common mistakes",
    "",
    "```js",
    `// Example ${index + 1}: adapt this to your project context`,
    `const topic = "${safeTopic}";`,
    "console.log(`Be ready to explain ${topic}`);",
    "```",
  ].join("\n");
};

export const generateFallbackQuestions = ({
  role,
  experience,
  topicsToFocus,
  numberOfQuestions = 10,
}) => {
  const topics = normalizeTopics(topicsToFocus);
  const seeds =
    topics.length > 0
      ? topics
      : [
          `${role} fundamentals`,
          `${role} architecture`,
          "performance optimization",
          "debugging",
          "testing",
        ];

  return Array.from({ length: numberOfQuestions }, (_, index) => {
    const topic = seeds[index % seeds.length];

    return {
      question: `How would you explain ${topic} in a ${role} interview?`,
      answer: createAnswer(role, experience, topic, index),
    };
  });
};

export const generateFallbackExplanation = (question) => ({
  title: "Concept Breakdown",
  explanation: [
    `**Definition:** ${question} is an interview topic where you should explain the idea clearly, connect it to practical work, and show trade-off awareness.`,
    "",
    "A strong answer should begin with the simplest correct explanation, then move into how the concept appears in real projects. Interviewers usually care more about whether you can apply the concept than whether you memorized a textbook definition.",
    "",
    "You can make your answer stronger by covering:",
    "- what problem the concept solves",
    "- where you have used it or would use it",
    "- one limitation or mistake to avoid",
    "",
    "```js",
    "const answerShape = ['definition', 'use case', 'trade-off'];",
    "console.log(answerShape.join(' -> '));",
    "```",
    "",
    "**Key Takeaway:** Keep the explanation simple, practical, and tied to real engineering decisions.",
  ].join("\n"),
});
