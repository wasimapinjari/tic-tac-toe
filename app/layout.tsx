import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe | Wasim A Pinjari',
  description: "World's Greatest Tic-Tac-Toe Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const json = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://wasimapinjari.netlify.app/',
        url: 'https://wasimapinjari.netlify.app/',
        name: 'Wasim A Pinjari',
        isPartOf: { '@id': 'https://wasimapinjari.netlify.app/#website' },
        datePublished: '2023-04-23T00:00:00+00:00',
        dateModified: '2023-04-23T00:00:00+00:00',
        description:
          'Ambitious coder, music lover, and nature enthusiast wanting to explore the world, meet new people, and live life to the fullest.',
        breadcrumb: { '@id': 'https://wasimapinjari.netlify.app/#breadcrumb' },
        inLanguage: 'en-US',
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: ['https://wasimapinjari.netlify.app/'],
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://wasimapinjari.netlify.app/#breadcrumb',
        itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home' }],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://wasimapinjari.netlify.app/#website',
        url: 'https://wasimapinjari.netlify.app/',
        name: 'Wasim A Pinjari',
        description:
          'Ambitious coder, music lover, and nature enthusiast wanting to explore the world, meet new people, and live life to the fullest.',

        inLanguage: 'en-US',
      },
      {
        '@type': 'Person',
        name: 'Wasim A Pinjari',
        url: 'https://wasimapinjari.netlify.app',
        description: 'Wasim A Pinjari is a developer and loves designing.',
        image: {
          '@type': 'ImageObject',
          url: 'https://wasimapinjari.netlify.app/assets/images/me.jpg',
        },
        sameAs: [
          'https://facebook.com/wasimapinjari',
          'https://instagram.com/wasimapinjari',
          'https://twitter.com/wasimapinjari',
          'https://wasimapinjari.netlify.app',
          'https://linkedin.com/in/wasimapinjari',
          'https://github.com/wasimapinjari',
          'https://pinterest.com/wasimapinjari',
        ],
      },
    ],
  };
  return (
    <html lang='en'>
      <head>
        <meta name='theme-color' content='white' />
        <meta
          name='description'
          content="World's greatest tic-tac-toe project build by Wasim A Pinjari"
        />
        <meta
          name='image'
          content='https://wasimapinjari.netlify.app/assets/images/logo.png'
        />
        <meta name='robots' content='index, follow' />
        <meta name='article-author' content='Wasim A Pinjari' />

        <meta property='og:locale' content='en_US' />
        <meta property='og:site_name' content='Tic-Tac-Toe | Wasim A Pinjari' />
        <meta property='og:title' content='Tic-Tac-Toe | Wasim A Pinjari' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content="'https://wasimapinjari.netlify.app" />
        <meta property='og:description' content='' />
        <meta
          property='og:image'
          content='https://wasimapinjari.netlify.app/assets/images/logo.png'
        />
        <meta property='og:image:alt' content='Wasim A Pinjari site logo' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@wasimapinjari' />
        <meta name='twitter:creator' content='@wasimapinjari' />
        <meta name='twitter:title' content='Wasim A Pinjari | Blog' />
        <meta
          name='twitter:description'
          content='Ambitious coder, music lover, and nature enthusiast wanting to explore the world, meet new people, and live life to the fullest.'
        />
        <meta
          name='twitter:image'
          content='https://wasimapinjari.netlify.app/assets/images/logo.png'
        />
        <meta name='twitter:image:alt' content='Wasim A Pinjari site logo' />
        <meta
          name='twitter:image:src'
          content='https://wasimapinjari.netlify.app/assets/images/logo.png'
        />

        <meta
          property='article:publisher'
          content='https://wasimapinjari.bio.link/'
        />
        <meta
          property='article:author'
          content='https://wasimapinjari.bio.link/'
        />
        <meta
          property='article:published_time'
          content='2024-06-20T00:00:00+00:00'
        />
        <meta
          property='article:modified_time'
          content='2024-06-20T00:00:00+00:00'
        />
        <link rel='profile' href='https://gmpg.org/xfn/11' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='./apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='./favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='./favicon-16x16.png'
        />
        <link rel='manifest' href='./site.webmanifest' />
        <link rel='canonical' href='https://wasimapinjari.netlify.app/' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
