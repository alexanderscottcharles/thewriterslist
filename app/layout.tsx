import './globals.css';
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],

  variable: '--font-playfair',
 
})

export const metadata = {
  title: 'The Writers List',
  description: 'The Only Website by Writers, for Writers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
