import type { BlogPost, TeamMember, Event, DonationCampaign } from '../types';

/**
 * Get a blog post by ID
 */
export const getBlogPostById = (posts: BlogPost[], id: string): BlogPost | undefined => {
  return posts.find(post => post.id === id);
};

/**
 * Get blog posts by category
 */
export const getBlogPostsByCategory = (posts: BlogPost[], category: string): BlogPost[] => {
  return posts.filter(post => post.category === category);
};

/**
 * Get blog posts by tag
 */
export const getBlogPostsByTag = (posts: BlogPost[], tag: string): BlogPost[] => {
  return posts.filter(post => post.tags.includes(tag));
};

/**
 * Get recent blog posts
 */
export const getRecentBlogPosts = (posts: BlogPost[], count: number = 3): BlogPost[] => {
  return [...posts]
    .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())
    .slice(0, count);
};

/**
 * Get a team member by ID
 */
export const getTeamMemberById = (members: TeamMember[], id: string): TeamMember | undefined => {
  return members.find(member => member.id === id);
};

/**
 * Get team members by position
 */
export const getTeamMembersByPosition = (members: TeamMember[], position: string): TeamMember[] => {
  return members.filter(member => member.position === position);
};

/**
 * Get an event by ID
 */
export const getEventById = (events: Event[], id: string): Event | undefined => {
  return events.find(event => event.id === id);
};

/**
 * Get upcoming events
 */
export const getUpcomingEvents = (events: Event[]): Event[] => {
  const now = new Date();
  return events
    .filter(event => event.date >= now)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
};

/**
 * Get past events
 */
export const getPastEvents = (events: Event[]): Event[] => {
  const now = new Date();
  return events
    .filter(event => event.date < now)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

/**
 * Get a donation campaign by ID
 */
export const getDonationCampaignById = (campaigns: DonationCampaign[], id: string): DonationCampaign | undefined => {
  return campaigns.find(campaign => campaign.id === id);
};

/**
 * Get donation campaigns by category
 */
export const getDonationCampaignsByCategory = (campaigns: DonationCampaign[], category: string): DonationCampaign[] => {
  return campaigns.filter(campaign => campaign.category === category);
};

/**
 * Get donation campaigns sorted by progress
 */
export const getDonationCampaignsByProgress = (campaigns: DonationCampaign[]): DonationCampaign[] => {
  return [...campaigns].sort((a, b) => {
    const progressA = (a.raised / a.goal) * 100;
    const progressB = (b.raised / b.goal) * 100;
    return progressB - progressA;
  });
};

/**
 * Calculate donation progress percentage
 */
export const calculateDonationProgress = (raised: number, goal: number): number => {
  if (goal === 0) return 0;
  return Math.min((raised / goal) * 100, 100);
};

/**
 * Format currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format date
 */
export const formatDate = (date: Date, format: 'short' | 'long' = 'long'): string => {
  if (format === 'short') {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
