import { Poppins } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { AppStoreProvider } from '../store';
import defaultTheme, { ThemeProvider } from '../theme';
import Header from '../components/Header'
import Footer from '../components/Footer'
import './globals.css'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

// const THEME_COLOR = (defaultTheme.palette?.primary)?.main || '#FFFFFF';

export const metadata = {
  title: 'NAVIFIT',
  description: 'Meal plans',
  manifest: '/site.webmanifest',
  // themeColor: THEME_COLOR,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppStoreProvider>
          <ThemeProvider>
            <Header />
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
            {/* <Footer /> */}
          </ThemeProvider>
        </AppStoreProvider>
      </body>
    </html>
  )
}
