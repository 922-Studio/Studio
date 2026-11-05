import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {getBlogPosts} from '@/lib/content';

const baseUrl = 'https://studio.922-studio.com';

function entry(path: string, lastModified: Date): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map(l => [l, `${baseUrl}/${l}${path}`])
  );
  return routing.locales.map(locale => ({
    url: `${baseUrl}/${locale}${path}`,
    lastModified,
    alternates: {languages},
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...entry('', now),
    ...entry('/blog', now),
    ...entry('/impressum', now),
    ...getBlogPosts().flatMap(p => entry(`/blog/${p.slug}`, new Date(p.date))),
  ];
}
