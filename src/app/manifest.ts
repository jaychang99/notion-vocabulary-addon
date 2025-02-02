import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Notion Vocabulary Addon',
    short_name: 'NVA',
    description: 'addon for notion to help you learn vocabulary',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/notion-vocabulary-addon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/notion-vocabulary-addon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
