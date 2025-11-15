
import { GoogleGenAI, Type } from "@google/genai";
import type { BusinessDetails, MarketingGoal, SocialPlatform, ContentIdea, GeneratedPost } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const ideasSchema = {
  type: Type.OBJECT,
  properties: {
    ideas: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, enum: ['Post', 'Reel', 'Story'] },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['type', 'title', 'description'],
      },
    },
  },
  required: ['ideas'],
};

const postSchema = {
    type: Type.OBJECT,
    properties: {
        caption: { type: Type.STRING },
        imagePrompt: { type: Type.STRING },
        hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ['caption', 'imagePrompt', 'hashtags'],
};


export const generateContentIdeas = async (
  goal: MarketingGoal,
  platforms: SocialPlatform[],
  details: BusinessDetails
): Promise<ContentIdea[]> => {
  const platformList = platforms.join(', ');
  const prompt = `
    You are a social media marketing expert. Create 5 diverse and engaging content ideas for a business with the following details:
    - Business Name: ${details.name}
    - Business Description: ${details.description}
    - Product/Service to Promote: ${details.product}
    - Marketing Goal: ${goal}
    - Target Platforms: ${platformList}

    Generate a mix of ideas suitable for different content formats (standard post, reel/short video, story).
    For each idea, provide a type ('Post', 'Reel', or 'Story'), a catchy title, and a brief description.
    Ensure the ideas are tailored to the specified goal and business.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: ideasSchema,
      },
    });
    const jsonResponse = JSON.parse(response.text);
    return jsonResponse.ideas || [];
  } catch (error) {
    console.error("Error generating content ideas:", error);
    throw new Error("Failed to generate content ideas. Please try again.");
  }
};


export const generateFullPost = async (
  idea: ContentIdea,
  goal: MarketingGoal,
  platform: SocialPlatform,
  details: BusinessDetails
): Promise<Omit<GeneratedPost, 'platform' | 'ideaTitle'>> => {
    const prompt = `
        You are a social media copywriter. Based on the following content idea, generate a complete post for the specified platform.

        - Business Name: ${details.name}
        - Business Description: ${details.description}
        - Marketing Goal: ${goal}
        - Target Platform: ${platform}
        - Content Idea Title: "${idea.title}"
        - Content Idea Description: "${idea.description}"

        Your task is to generate:
        1.  A compelling and platform-appropriate caption. The tone should align with the marketing goal.
        2.  A detailed prompt for an AI image generator (like Midjourney or DALL-E) to create a stunning, relevant visual for this post. The prompt should be descriptive and imaginative.
        3.  A list of 5-7 relevant and trending hashtags.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: postSchema,
            },
        });
        const jsonResponse = JSON.parse(response.text);
        return {
            caption: jsonResponse.caption || '',
            imagePrompt: jsonResponse.imagePrompt || '',
            hashtags: jsonResponse.hashtags || [],
        };
    } catch (error) {
        console.error("Error generating full post:", error);
        throw new Error("Failed to generate the full post. Please try again.");
    }
};
