import { Montserrat } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
// import ThemeRegistry from './utils/ThemeRegistry'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './globals.css'

const montserrat = Montserrat({ 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'NAVIFIT',
  description: 'Meal plans',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={montserrat.className}>
        {/* <ThemeRegistry options={{ key: 'mui-theme' }}> */}
        <Header />
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        <Footer />
        {/* </ThemeRegistry> */}
      </body>
    </html>
  )
}
