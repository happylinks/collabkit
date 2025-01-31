import './globals.css';

export const metadata = {
  title: 'Shape',
  description: 'Get answers from an AI data scientist',
};

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs/app-beta';
import { Inter } from 'next/font/google';
import { dark } from '@clerk/themes';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorAlphaShade: '#2D302F',
          colorBackground: '#2D302F',
          fontFamily: 'General Sans, Inter, sans-serif',
          colorPrimary: '#43ACC6',
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
