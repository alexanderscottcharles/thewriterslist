import './globals.css';
import { Playfair_Display } from 'next/font/google'
import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/next"

const playfair = Playfair_Display({
  subsets: ['latin'],

  variable: '--font-playfair',
 
})

export const metadata: Metadata = {
  title: 'The Writers List',
  description: 'The Only Website by Writers, for Writers',
  metadataBase: new URL("https://thewriterslist.com"),
    openGraph: {
    title: 'The Writers List',
    description: 'A peer network and submission platform for writers.',
    url: 'https://thewriterslist.com',
    siteName: 'The Writers List',
    images: [
      {
        url: 'https://thewriterslist.com/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'The Writers List Preview',
      },
    ],
    type: 'website',
  }
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
