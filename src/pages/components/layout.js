import Navbar from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <main className='flex flex-col h-screen'>
      <Navbar />
      <main className='flex flex-col grow md:px-20 md:w-full w-5/6 m-auto'>{children}</main>
      <Footer />
    </main>
  )
}