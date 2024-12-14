import { HfInference } from '@huggingface/inference';

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

const HF_ACCESS_TOKEN = process.env.REACT_APP_HF_ACCESS_TOKEN;

const hf = new HfInference(HF_ACCESS_TOKEN);

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");

    let output = "";

    try {
        for await (const chunk of hf.chatCompletionStream({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
            temperature: 0.1,
        })) {
            if (chunk.choices && chunk.choices[0]?.delta?.content) {
                output += chunk.choices[0].delta.content;
            }
        }

        return output;
    } catch (error) {
        console.error("Error fetching recipe:", error);
        throw new Error("Failed to fetch a recipe. Please try again.");
    }
}