
import React from 'react';
import { AwarenessIcon, LeadsIcon, SalesIcon } from './components/icons';
import type { MarketingGoal, SocialPlatform } from './types';

interface GoalDetail {
  name: MarketingGoal;
  description: string;
  Icon: React.FC<{className?: string}>;
}

interface PlatformDetail {
  name: SocialPlatform;
  description: string;
}

export const GOALS: GoalDetail[] = [
  {
    name: 'Brand Awareness',
    description: 'Make people know about your brand, product, or service and what you offer.',
    Icon: AwarenessIcon,
  },
  {
    name: 'Lead Generation',
    description: 'Attract people who show interest and invite them to take a small first step, like signing up.',
    Icon: LeadsIcon,
  },
  {
    name: 'Sales Conversion',
    description: 'Turn interested leads into actual customers by encouraging them to make a purchase.',
    Icon: SalesIcon,
  },
];

export const PLATFORMS: PlatformDetail[] = [
  {
    name: 'Facebook',
    description: 'Great for reaching a wide audience and building a strong community.',
  },
  {
    name: 'Instagram',
    description: 'Perfect for visual brands like fashion, food, or travel. Uses images and videos.',
  },
  {
    name: 'LinkedIn',
    description: 'The go-to platform for B2B, professional networking, and industry connections.',
  },
  {
    name: 'YouTube',
    description: 'Ideal for long-form video content, tutorials, and brand storytelling.',
  },
  {
    name: 'X',
    description: 'Best for real-time updates, news, and joining public conversations.',
  },
  {
    name: 'TikTok',
    description: 'Excellent for short-form, creative, and viral video content to reach younger audiences.',
  },
];
