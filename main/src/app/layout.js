import { Inter } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
// import ThemeRegistry from './utils/ThemeRegistry'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NAVIFIT',
  description: 'Meal plans',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThemeRegistry options={{ key: 'mui-theme' }}> */}
        <Header />
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        <Footer />
        {/* </ThemeRegistry> */}
      </body>
    </html>
  )
}
