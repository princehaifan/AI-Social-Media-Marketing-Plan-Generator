
import React from 'react';
import { PLATFORMS } from '../constants';
import type { SocialPlatform } from '../types';

interface Step2PlatformProps {
  selectedPlatforms: SocialPlatform[];
  onPlatformToggle: (platform: SocialPlatform) => void;
}

const Step2Platform: React.FC<Step2PlatformProps> = ({ selectedPlatforms, onPlatformToggle }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800">Step 2: Choose Your Platforms</h2>
      <p className="mt-2 text-gray-600">
        Select the platforms where your target audience spends their time. You can choose more than one.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
        {PLATFORMS.map(({ name, description }) => {
          const isSelected = selectedPlatforms.includes(name);
          return (
            <button
              key={name}
              onClick={() => onPlatformToggle(name)}
              className={`flex flex-col justify-between rounded-lg border-2 p-4 text-left shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                ${isSelected
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-300 bg-white hover:border-indigo-500 hover:shadow-md'
                }`}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <p className="mt-2 text-sm text-gray-600">{description}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 
                    ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-400'}`}
                >
                  {isSelected && (
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Step2Platform;
