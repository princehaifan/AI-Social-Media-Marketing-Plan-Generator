
import React, { useState } from 'react';
import type { MarketingPlan } from '../types';

interface Step4PlanProps {
  plan: MarketingPlan;
}

const PostCard: React.FC<{ post: MarketingPlan['generatedContent'][0] }> = ({ post }) => {
    const [copiedItem, setCopiedItem] = useState<string | null>(null);

    const handleCopy = (text: string, itemName: string) => {
        navigator.clipboard.writeText(text);
        setCopiedItem(itemName);
        setTimeout(() => setCopiedItem(null), 2000);
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="text-xl font-bold text-gray-900">
                {post.platform} Post: <span className="font-semibold">{post.ideaTitle}</span>
            </h4>
            
            <div className="mt-4 space-y-4">
                <div>
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700">Caption</label>
                        <button onClick={() => handleCopy(post.caption, 'caption')} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                            {copiedItem === 'caption' ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-sm text-gray-700 border border-gray-200">{post.caption}</p>
                </div>
                
                <div>
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700">Image Prompt</label>
                        <button onClick={() => handleCopy(post.imagePrompt, 'prompt')} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                            {copiedItem === 'prompt' ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <p className="mt-1 rounded-md bg-gray-50 p-3 text-sm text-gray-700 border border-gray-200 italic">{post.imagePrompt}</p>
                </div>

                <div>
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700">Hashtags</label>
                        <button onClick={() => handleCopy(post.hashtags.join(' '), 'hashtags')} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                            {copiedItem === 'hashtags' ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <p className="mt-1 rounded-md bg-gray-50 p-3 text-sm text-indigo-700 border border-gray-200">{post.hashtags.join(' ')}</p>
                </div>
            </div>
        </div>
    );
};


const Step4Plan: React.FC<Step4PlanProps> = ({ plan }) => {
  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Step 4: Your Social Media Marketing Plan</h2>
        <p className="mt-2 text-gray-600">
          Here is your complete plan. You can now copy the content and post it on your social media channels.
        </p>
      </div>
      
      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow">
         <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">Plan Summary</h3>
         <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Business Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{plan.businessDetails.name}</dd>
            </div>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Marketing Goal</dt>
                <dd className="mt-1 text-sm text-gray-900">{plan.goal}</dd>
            </div>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Target Platforms</dt>
                <dd className="mt-1 text-sm text-gray-900">{plan.platforms.join(', ')}</dd>
            </div>
         </dl>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Generated Content</h3>
        {plan.generatedContent.length > 0 ? (
          <div className="space-y-6">
            {plan.generatedContent.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center rounded-lg border-2 border-dashed border-gray-300 p-12">
            <p className="mt-1 text-sm text-gray-500">
              You haven't generated any posts yet. Go back to Step 3 to create content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step4Plan;
