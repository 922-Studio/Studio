import {describe, it, expect} from 'vitest';
import sitemap from './sitemap';
import robots from './robots';

describe('sitemap', () => {
  it('lists every locale of core routes with alternates', () => {
    const urls = sitemap().map(e => e.url);
    for (const p of ['', '/blog', '/impressum']) {
      expect(urls).toContain(`https://studio.922-studio.com/en${p}`);
      expect(urls).toContain(`https://studio.922-studio.com/de${p}`);
    }
    expect(sitemap()[0].alternates?.languages).toHaveProperty('de');
  });

  it('robots references sitemap', () => {
    expect(robots().sitemap).toBe('https://studio.922-studio.com/sitemap.xml');
  });
});
