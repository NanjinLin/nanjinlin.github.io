import type { Metadata } from 'next';
import { profile, siteMetadata } from '@/content/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.origin),
  title: profile.name,
  description: siteMetadata.description,
  icons: { icon: '/favicon.svg' },
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: profile.name,
    description: siteMetadata.description,
    images: [
      {
        url: new URL(siteMetadata.socialImage, siteMetadata.origin).href,
        width: siteMetadata.socialImageWidth,
        height: siteMetadata.socialImageHeight,
        alt: `${profile.name} — ML Systems. Undergraduate at ${profile.university}.`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.name,
    description: siteMetadata.description,
    images: [new URL(siteMetadata.socialImage, siteMetadata.origin).href],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
