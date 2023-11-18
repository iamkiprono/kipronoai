import OpenAI from "openai";

// const apiKey =  process.env.OPENAI_API_KEY

const openai = new OpenAI({
  apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getAIRes(prompt: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  // console.log(completion.choices[0].message.content);
  return {
    res: completion.choices[0].message.content,
    role: completion.choices[0].message.role,
    date: new Date().toLocaleString(),
  };
}
