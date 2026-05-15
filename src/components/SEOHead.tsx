import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
  /** Optional image URL for OG/Twitter cards. Defaults to /profile.png */
  image?: string;
  /** Extra JSON-LD blocks to inject (e.g. CreativeWork for a project page) */
  extraJsonLd?: Record<string, unknown>[];
}

const SITE_URL = 'https://thanas.vercel.app';
const PROFILE_IMG = `${SITE_URL}/profile.png`;
const SAME_AS = [
  'https://github.com/Thanas-R',
  'https://www.linkedin.com/in/thanasr/',
  'https://thanas.medium.com/'
];
const JSONLD_ID_PREFIX = 'seo-jsonld-';

const buildJsonLd = (title: string, description: string, url: string, type: string) => {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Thanas R',
    alternateName: ['Thanas', 'Thanas Ramesh'],
    url: SITE_URL,
    image: PROFILE_IMG,
    jobTitle: 'Developer',
    description: 'Developer & creative problem-solver. Building thoughtful digital experiences with code.',
    knowsAbout: ['Frontend Development', 'AI/ML', 'UI/UX Design', 'Full-stack Development'],
    alumniOf: { '@type': 'EducationalOrganization', name: 'PES University' },
    sameAs: SAME_AS
  };
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Thanas R',
    alternateName: ['Thanas', 'Thanas Ramesh'],
    url: SITE_URL,
    logo: PROFILE_IMG,
    image: PROFILE_IMG,
    founder: { '@type': 'Person', name: 'Thanas R' },
    sameAs: SAME_AS
  };
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Thanas R',
    alternateName: ['Thanas', 'Thanas Ramesh'],
    url: SITE_URL,
    description: 'Portfolio of Thanas R — developer & creative problem-solver.',
    publisher: { '@type': 'Person', name: 'Thanas R', url: SITE_URL, image: PROFILE_IMG, sameAs: SAME_AS }
  };
  const webpage = {
    '@context': 'https://schema.org',
    '@type': type === 'profile' ? 'ProfilePage' : 'WebPage',
    name: title,
    description,
    url,
    isPartOf: { '@type': 'WebSite', name: 'Thanas R', url: SITE_URL },
    about: { '@type': 'Person', name: 'Thanas R' },
    inLanguage: 'en'
  };
  return [person, organization, website, webpage];
};

/**
 * Sets document.title and updates meta tags dynamically per page.
 * Google uses these for search result titles & descriptions.
 */
const SEOHead = ({ title, description, path = '/', type = 'website', image, extraJsonLd = [] }: SEOHeadProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // OG tags
    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    const url = `${SITE_URL}${path}`;

    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:type"]', type);
    setMeta('meta[property="og:image"]', image ?? PROFILE_IMG);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', image ?? PROFILE_IMG);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = url;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = url;
      document.head.appendChild(canonical);
    }

    // Inject per-page JSON-LD: Person, Organization, WebSite, WebPage + extras
    const blocks = [...buildJsonLd(title, description, url, type), ...extraJsonLd];
    const injected: HTMLScriptElement[] = [];
    blocks.forEach((data, i) => {
      const id = `${JSONLD_ID_PREFIX}${i}`;
      document.getElementById(id)?.remove();
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
      injected.push(script);
    });

    return () => {
      // Reset to defaults on unmount
      document.title = 'Thanas R';
      injected.forEach((s) => s.remove());
    };
  }, [title, description, path, type, image, extraJsonLd]);

  return null;
};

export default SEOHead;
