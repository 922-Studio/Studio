import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {MapPin, Mail} from 'lucide-react';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'impressum'});

  return {
    title: `${t('title')} — 922-Studio`,
    description: t('subheading'),
    robots: {index: true, follow: true},
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function ImpressumPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'impressum'});

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center font-heading text-3xl font-bold sm:text-4xl">
          {t('heading')}
        </h1>
        <p className="mt-3 text-center text-text-muted">{t('subheading')}</p>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="text-center">
            <p className="font-heading text-xl font-semibold text-text-primary">{t('name')}</p>
            <p className="mt-1 text-sm font-medium text-text-muted">{t('brand')}</p>
          </div>

          <div className="my-6 border-t border-border" />

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-text-muted" />
              <div className="text-sm leading-relaxed text-text-secondary">
                <p>{t('address_line1')}</p>
                <p>{t('address_line2')}</p>
                <p>{t('address_country')}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-text-muted" />
              <div>
                <p className="text-xs text-text-muted">{t('contact_label')}</p>
                <a
                  href={`mailto:${t('email')}`}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {t('email')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-8">
          <div>
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              {t('liability_heading')}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {t('liability_text')}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              {t('dispute_heading')}
            </h2>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-text-secondary">
              <p>
                {t('dispute_text')}{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-text-primary"
                >
                  {t('dispute_link_text')}
                </a>
              </p>
              <p>{t('dispute_note')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
