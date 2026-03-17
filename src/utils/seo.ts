/**
 * SEO utilities for the application
 * Provides structured data, meta tags, and SEO optimization helpers
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'organization';
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

/**
 * Generate Open Graph meta tags
 */
export const generateOpenGraphTags = (metadata: SEOMetadata): Record<string, string> => {
  return {
    'og:title': metadata.title,
    'og:description': metadata.description,
    'og:type': metadata.type || 'website',
    ...(metadata.image && { 'og:image': metadata.image }),
    ...(metadata.url && { 'og:url': metadata.url }),
  };
};

/**
 * Generate Twitter Card meta tags
 */
export const generateTwitterCardTags = (metadata: SEOMetadata): Record<string, string> => {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': metadata.title,
    'twitter:description': metadata.description,
    ...(metadata.image && { 'twitter:image': metadata.image }),
  };
};

/**
 * Generate structured data for organization
 */
export const generateOrganizationSchema = (options: {
  name: string;
  description: string;
  url: string;
  logo: string;
  email?: string;
  phone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  socialProfiles?: string[];
}): StructuredData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: options.name,
    description: options.description,
    url: options.url,
    logo: options.logo,
    ...(options.email && { email: options.email }),
    ...(options.phone && { telephone: options.phone }),
    ...(options.address && { address: {
      '@type': 'PostalAddress',
      ...options.address,
    }}),
    ...(options.socialProfiles && {
      sameAs: options.socialProfiles,
    }),
  };
};

/**
 * Generate structured data for article
 */
export const generateArticleSchema = (options: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  url: string;
}): StructuredData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: options.headline,
    description: options.description,
    image: options.image,
    datePublished: options.datePublished,
    ...(options.dateModified && { dateModified: options.dateModified }),
    author: {
      '@type': 'Person',
      name: options.author.name,
      ...(options.author.url && { url: options.author.url }),
    },
    url: options.url,
  };
};

/**
 * Generate structured data for breadcrumb navigation
 */
export const generateBreadcrumbSchema = (items: Array<{
  name: string;
  url: string;
}>): StructuredData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Generate structured data for event
 */
export const generateEventSchema = (options: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
  };
  image?: string;
  url?: string;
  organizer?: {
    name: string;
    url?: string;
  };
}): StructuredData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: options.name,
    description: options.description,
    startDate: options.startDate,
    ...(options.endDate && { endDate: options.endDate }),
    location: {
      '@type': 'Place',
      name: options.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: options.location.address,
      },
    },
    ...(options.image && { image: options.image }),
    ...(options.url && { url: options.url }),
    ...(options.organizer && {
      organizer: {
        '@type': 'Organization',
        name: options.organizer.name,
        ...(options.organizer.url && { url: options.organizer.url }),
      },
    }),
  };
};

/**
 * Add structured data to document head
 */
export const addStructuredData = (data: StructuredData): void => {
  if (typeof document === 'undefined') return;

  // Remove existing structured data script if present
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Create and add new structured data script
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

/**
 * Generate canonical URL meta tag
 */
export const generateCanonicalTag = (url: string): void => {
  if (typeof document === 'undefined') return;

  // Remove existing canonical tag if present
  const existingCanonical = document.querySelector('link[rel="canonical"]');
  if (existingCanonical) {
    existingCanonical.remove();
  }

  // Create and add new canonical tag
  const link = document.createElement('link');
  link.rel = 'canonical';
  link.href = url;
  document.head.appendChild(link);
};

/**
 * Generate robots meta tag
 */
export const generateRobotsTag = (options: {
  index?: boolean;
  follow?: boolean;
  nosnippet?: boolean;
  noarchive?: boolean;
}): string => {
  const parts: string[] = [];

  if (options.index !== false) parts.push('index');
  else parts.push('noindex');

  if (options.follow !== false) parts.push('follow');
  else parts.push('nofollow');

  if (options.nosnippet) parts.push('nosnippet');
  if (options.noarchive) parts.push('noarchive');

  return parts.join(', ');
};

/**
 * Generate viewport meta tag
 */
export const generateViewportTag = (): string => {
  return 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
};

/**
 * Generate theme color meta tag
 */
export const generateThemeColorTag = (color: string): void => {
  if (typeof document === 'undefined') return;

  // Remove existing theme-color tag if present
  const existingThemeColor = document.querySelector('meta[name="theme-color"]');
  if (existingThemeColor) {
    existingThemeColor.remove();
  }

  // Create and add new theme-color tag
  const meta = document.createElement('meta');
  meta.name = 'theme-color';
  meta.content = color;
  document.head.appendChild(meta);
};

/**
 * Generate sitemap entry
 */
export const generateSitemapEntry = (options: {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}): string => {
  return `
  <url>
    <loc>${options.url}</loc>
    ${options.lastModified ? `<lastmod>${options.lastModified}</lastmod>` : ''}
    ${options.changeFrequency ? `<changefreq>${options.changeFrequency}</changefreq>` : ''}
    ${options.priority ? `<priority>${options.priority}</priority>` : ''}
  </url>
  `.trim();
};

/**
 * Generate complete sitemap XML
 */
export const generateSitemap = (entries: Array<{
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}>): string => {
  const sitemapEntries = entries.map(entry => generateSitemapEntry(entry)).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;
};

/**
 * Generate robots.txt content
 */
export const generateRobotsTxt = (options: {
  userAgent?: string;
  disallow?: string[];
  allow?: string[];
  sitemapUrl?: string;
  crawlDelay?: number;
}): string => {
  const lines: string[] = [];

  lines.push(`User-agent: ${options.userAgent || '*'}`);

  if (options.disallow) {
    options.disallow.forEach(path => lines.push(`Disallow: ${path}`));
  }

  if (options.allow) {
    options.allow.forEach(path => lines.push(`Allow: ${path}`));
  }

  if (options.crawlDelay) {
    lines.push(`Crawl-delay: ${options.crawlDelay}`);
  }

  if (options.sitemapUrl) {
    lines.push(`\nSitemap: ${options.sitemapUrl}`);
  }

  return lines.join('\n');
};

/**
 * Extract keywords from text
 */
export const extractKeywords = (text: string, limit = 10): string[] => {
  // Simple keyword extraction - in production, use a more sophisticated approach
  const words = text
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3);

  // Count word frequency
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Sort by frequency and return top keywords
  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([word]) => word);
};

/**
 * Generate meta description from content
 */
export const generateMetaDescription = (content: string, maxLength = 160): string => {
  const description = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .substring(0, maxLength);

  // Add ellipsis if truncated
  return description.length === maxLength ? `${description}...` : description;
};
