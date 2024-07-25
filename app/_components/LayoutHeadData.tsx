import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe | Wasim A Pinjari',
  description: "World's greatest tic-tac-toe game",
  openGraph: {
    locale: 'en_US',
    siteName: 'Tic-Tac-Toe | Wasim A Pinjari',
    type: 'website',
    url: 'https://wasimapinjari.github.io/tic-tac-toe',
    description: "World's greatest tic-tac-toe game",
    images: ['https://wasimapinjari.github.io/tic-tac-toe/logo.png'],
  },
  twitter: {
    site: '@wasimapinjari',
    creator: '@wasimapinjari',
  },
};

const json = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://wasimapinjari.github.io/tic-tac-toe/',
      url: 'https://wasimapinjari.github.io/tic-tac-toe/',
      name: 'Tic-Tac-Toe | Wasim A Pinjari',
      isPartOf: {
        '@id': 'https://wasimapinjari.github.io/tic-tac-toe/#website',
      },
      datePublished: '2023-06-23T00:00:00+00:00',
      dateModified: '2023-06-23T00:00:00+00:00',
      description: "World's greatest tic-tac-toe game",
      breadcrumb: {
        '@id': 'https://wasimapinjari.github.io/tic-tac-toe/#breadcrumb',
      },
      inLanguage: 'en-US',
      potentialAction: [
        {
          '@type': 'ReadAction',
          target: ['https://wasimapinjari.github.io/tic-tac-toe/'],
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://wasimapinjari.github.io/tic-tac-toe/#breadcrumb',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home' }],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://wasimapinjari.github.io/tic-tac-toe/#website',
      url: 'https://wasimapinjari.github.io/tic-tac-toe/',
      name: 'Wasim A Pinjari',
      description: "World's greatest tic-tac-toe game",
      inLanguage: 'en-US',
      potentialAction: [
        {
          '@type': 'ReadAction',
          target: ['https://wasimapinjari.github.io/tic-tac-toe/'],
        },
      ],
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
        'https://www.facebook.com/wasimapinjari',
        'https://www.instagram.com/wasimapinjari',
        'https://twitter.com/wasimapinjari',
        'https://wasimapinjari.netlify.app',
        'https://www.linkedin.com/in/wasimapinjari',
        'https://github.com/wasimapinjari',
        'https://pinterest.com/wasimapinjari',
      ],
    },
  ],
};

export default function LayoutHeadData() {
  return (
    <head>
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='theme-color' content='#81AED9' />
      <meta
        name='image'
        content='https://wasimapinjari.github.io/tic-tac-toe/logo.png'
      />
      <meta name='robots' content='index, follow' />
      <meta name='author' content='Wasim A Pinjari' />
      <meta name='keywords' content='tic tac toe, online board game' />

      <meta name='title' content='Tic-Tac-Toe | Wasim A Pinjari' />
      <meta
        property='og:image:alt'
        content='Tic-Tac-Toe by Wasim A Pinjari site logo'
      />

      <meta
        name='twitter:image:alt'
        content='Tic-Tac-Toe by Wasim A Pinjari site logo'
      />

      <link
        rel='canonical'
        href='https://wasimapinjari.github.io/tic-tac-toe'
      />

      <link rel='profile' href='https://gmpg.org/xfn/11' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='./favicon/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='./favicon/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='./favicon/favicon-16x16.png'
      />
      <link rel='manifest' href='./favicon/site.webmanifest' />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      ></script>
    </head>
  );
}
