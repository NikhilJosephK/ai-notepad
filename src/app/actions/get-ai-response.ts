"use server";

export default async function getAiResponse({
  question,
  combinedText,
}: {
  question: string;
  combinedText: string;
}) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: `go through the following text, understand the context of ${combinedText} and if the question is related to the ${combinedText} then answer the question; else say "This is outside the scope of the notes". If it is only a greetings message then you can respond back with a greeting message, you can be a bit friendly and welcoming. The answer should be precise and to the point and you dont need to show how you arrived at the answer. Answer like how a human would answer. question: ${question}`,
          },
        ],
        model: "compound-beta-mini",
        temperature: 0.6,
        max_completion_tokens: 1024,
      }),
    }
  );
  const data = await response.json();
  return data;
}
