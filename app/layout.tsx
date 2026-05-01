import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cadescovetraffic.com'),
  title: {
    default: 'Cades Cove Traffic — Live Conditions, Wait Times & Best Times to Visit',
    template: '%s — CadesCoveTraffic.com',
  },
  description:
    "Plan your Cades Cove visit around the traffic. Real conditions, smart timing tips, and crowd predictions for the most popular drive in the Smokies.",
  openGraph: {
    type: 'website',
    siteName: 'CadesCoveTraffic.com',
    url: 'https://cadescovetraffic.com',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
