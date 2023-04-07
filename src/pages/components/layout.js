import Navbar from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <main className='flex flex-col h-screen'>
      <Navbar />
      <main className='flex flex-col grow px-20'>{children}</main>
      <Footer />
    </main>
  )
}