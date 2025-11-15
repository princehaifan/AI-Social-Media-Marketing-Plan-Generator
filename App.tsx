
import React, { useState } from 'react';
import Stepper from './components/Stepper';
import Step1Goal from './components/Step1Goal';
import Step2Platform from './components/Step2Platform';
import Step3Content from './components/Step3Content';
import Step4Plan from './components/Step4Plan';
import type { MarketingPlan, MarketingGoal, SocialPlatform, BusinessDetails, GeneratedPost } from './types';

const STEPS = ['Set Goal', 'Choose Platform', 'Create Content', 'View Plan'];

const initialPlanState: MarketingPlan = {
  goal: null,
  platforms: [],
  businessDetails: { name: '', description: '', product: '' },
  generatedContent: [],
};

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [plan, setPlan] = useState<MarketingPlan>(initialPlanState);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  
  const handleRestart = () => {
    setPlan(initialPlanState);
    setCurrentStep(0);
  };

  const handleGoalSelect = (goal: MarketingGoal) => {
    setPlan((prev) => ({ ...prev, goal }));
  };

  const handlePlatformToggle = (platform: SocialPlatform) => {
    setPlan((prev) => {
      const newPlatforms = prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms: newPlatforms };
    });
  };

  const updateBusinessDetails = (details: BusinessDetails) => {
    setPlan(prev => ({ ...prev, businessDetails: details }));
  };

  const addGeneratedPost = (post: GeneratedPost) => {
    setPlan(prev => ({ ...prev, generatedContent: [...prev.generatedContent, post] }));
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <Step1Goal selectedGoal={plan.goal} onGoalSelect={handleGoalSelect} />;
      case 1:
        return <Step2Platform selectedPlatforms={plan.platforms} onPlatformToggle={handlePlatformToggle} />;
      case 2:
        return <Step3Content plan={plan} updateBusinessDetails={updateBusinessDetails} addGeneratedPost={addGeneratedPost} />;
      case 3:
        return <Step4Plan plan={plan} />;
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    switch (currentStep) {
      case 0:
        return !plan.goal;
      case 1:
        return plan.platforms.length === 0;
      case 2:
        return !plan.businessDetails.name || !plan.businessDetails.description || !plan.businessDetails.product;
      default:
        return false;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
            AI Social Media Marketing Plan Generator
          </h1>
        </div>
      </header>
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
              <Stepper steps={STEPS} currentStep={currentStep} />
              <div className="mt-8 border-t border-gray-200 pt-8">
                {renderStepContent()}
              </div>
              <div className="mt-8 flex justify-between border-t border-gray-200 pt-6">
                {currentStep > 0 && currentStep < STEPS.length -1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Back
                  </button>
                )}
                {currentStep === STEPS.length - 1 ? (
                    <button
                        type="button"
                        onClick={handleRestart}
                        className="ml-auto rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Start Over
                      </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isNextDisabled()}
                    className="ml-auto rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
