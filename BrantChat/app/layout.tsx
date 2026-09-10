import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BrantChat - Ask About Brant',
  description: 'AI-powered assistant to learn about Brant Johnson',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'BrantChat - Ask About Brant',
    description: 'AI-powered assistant to learn about Brant Johnson',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent zoom on input focus
              document.addEventListener('DOMContentLoaded', function() {
                const inputs = document.querySelectorAll('input, textarea, select');
                const viewport = document.querySelector('meta[name="viewport"]');
                
                inputs.forEach(function(input) {
                  input.addEventListener('focus', function() {
                    if (viewport) {
                      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                    }
                  });
                  
                  input.addEventListener('blur', function() {
                    if (viewport) {
                      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                    }
                  });
                });
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
