
import React from 'react';
import { GOALS } from '../constants';
import type { MarketingGoal } from '../types';

interface Step1GoalProps {
  selectedGoal: MarketingGoal | null;
  onGoalSelect: (goal: MarketingGoal) => void;
}

const Step1Goal: React.FC<Step1GoalProps> = ({ selectedGoal, onGoalSelect }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800">Step 1: Set Your Primary Goal</h2>
      <p className="mt-2 text-gray-600">
        A clear goal helps focus your efforts. What do you want to achieve with your social media marketing?
      </p>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {GOALS.map(({ name, description, Icon }) => (
          <button
            key={name}
            onClick={() => onGoalSelect(name)}
            className={`flex flex-col items-center rounded-lg border-2 p-6 text-center shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              ${selectedGoal === name 
                ? 'border-indigo-600 bg-indigo-50' 
                : 'border-gray-300 bg-white hover:border-indigo-500 hover:shadow-md'
              }`}
          >
            <Icon className={`h-12 w-12 mb-4 ${selectedGoal === name ? 'text-indigo-600' : 'text-gray-500'}`} />
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step1Goal;
