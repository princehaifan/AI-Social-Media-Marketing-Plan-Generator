
import React, { useState } from 'react';
import type { BusinessDetails, ContentIdea, GeneratedPost, MarketingPlan } from '../types';
import { generateContentIdeas, generateFullPost } from '../services/geminiService';
import { LoadingSpinner } from './icons';

interface Step3ContentProps {
  plan: MarketingPlan;
  updateBusinessDetails: (details: BusinessDetails) => void;
  addGeneratedPost: (post: GeneratedPost) => void;
}

const Step3Content: React.FC<Step3ContentProps> = ({ plan, updateBusinessDetails, addGeneratedPost }) => {
  const { businessDetails, goal, platforms } = plan;
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
  const [generatingPostFor, setGeneratingPostFor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateBusinessDetails({
      ...businessDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateIdeas = async () => {
    if (!goal || platforms.length === 0) return;
    setIsLoadingIdeas(true);
    setError(null);
    setIdeas([]);
    try {
      const result = await generateContentIdeas(goal, platforms, businessDetails);
      setIdeas(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoadingIdeas(false);
    }
  };
  
  const handleGeneratePost = async (idea: ContentIdea, platform: typeof platforms[number]) => {
    if (!goal) return;
    setGeneratingPostFor(idea.title);
    setError(null);
    try {
        const postContent = await generateFullPost(idea, goal, platform, businessDetails);
        addGeneratedPost({
            ...postContent,
            platform,
            ideaTitle: idea.title,
        });
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
        setGeneratingPostFor(null);
    }
  };

  const isDetailsFilled = businessDetails.name && businessDetails.description && businessDetails.product;

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Step 3: Create Engaging Content</h2>
        <p className="mt-2 text-gray-600">
          First, tell us about your business. Then, we'll use AI to brainstorm content ideas for you.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Business Name</label>
            <input type="text" name="name" id="name" value={businessDetails.name} onChange={handleDetailsChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., Wanderlust Travels"/>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Business Description</label>
            <textarea name="description" id="description" rows={3} value={businessDetails.description} onChange={handleDetailsChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., A travel agency offering budget-friendly deals to explore new places."/>
          </div>
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700">Product/Service to Promote</label>
            <input type="text" name="product" id="product" value={businessDetails.product} onChange={handleDetailsChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., 'Exotic Getaway Packages'"/>
          </div>
          <button
            onClick={handleGenerateIdeas}
            disabled={!isDetailsFilled || isLoadingIdeas}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoadingIdeas ? <><LoadingSpinner /> Generating Ideas...</> : 'Generate Content Ideas'}
          </button>
        </div>
      </div>

      {error && <div className="rounded-md bg-red-50 p-4"><p className="text-sm font-medium text-red-800">{error}</p></div>}

      {ideas.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Your Content Ideas</h3>
          {ideas.map((idea, index) => {
            const isAlreadyGenerated = plan.generatedContent.some(p => p.ideaTitle === idea.title);
            return (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">{idea.type}</span>
                <h4 className="mt-2 text-lg font-semibold text-gray-900">{idea.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{idea.description}</p>
                 <div className="mt-4 flex flex-wrap gap-2">
                  {plan.platforms.map(platform => {
                    const isPostGeneratedForPlatform = plan.generatedContent.some(p => p.ideaTitle === idea.title && p.platform === platform);
                     return (
                      <button
                        key={platform}
                        onClick={() => handleGeneratePost(idea, platform)}
                        disabled={generatingPostFor === idea.title || isPostGeneratedForPlatform}
                        className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                         {generatingPostFor === idea.title ? <LoadingSpinner /> : (isPostGeneratedForPlatform ? `✓ Added for ${platform}` : `Generate for ${platform}`)}
                      </button>
                     );
                  })}
                 </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Step3Content;
