// Data models for the charity website

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: Date;
  category: string;
  featuredImage: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  socialLinks: SocialLink[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  venue: string;
  location: string;
  image: string;
  registrationUrl?: string;
}

export interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  category: string;
  image: string;
}
