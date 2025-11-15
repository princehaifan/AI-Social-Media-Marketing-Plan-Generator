
export type MarketingGoal = 'Brand Awareness' | 'Lead Generation' | 'Sales Conversion';

export type SocialPlatform = 'Facebook' | 'Instagram' | 'LinkedIn' | 'YouTube' | 'X' | 'TikTok';

export interface BusinessDetails {
  name: string;
  description: string;
  product: string;
}

export interface ContentIdea {
  type: 'Post' | 'Reel' | 'Story';
  title: string;
  description: string;
}

export interface GeneratedPost {
  platform: SocialPlatform;
  ideaTitle: string;
  caption: string;
  imagePrompt: string;
  hashtags: string[];
}

export interface MarketingPlan {
  goal: MarketingGoal | null;
  platforms: SocialPlatform[];
  businessDetails: BusinessDetails;
  generatedContent: GeneratedPost[];
}
