import Head from 'next/head'
import { sanityClient, urlFor } from '../../sanity';
import { Post } from "../../typing"
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineClock } from 'react-icons/hi';




interface Props {
  posts: Post[]
}


export default function Home({ posts }: Props) {

  return (
    <>
      <Head>
      <title>Smidigt</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Park Lee is a digital artist who specializes in generative art. This type of art involves creating algorithms and using software programs to generate unique and unpredictable art pieces."
        />
      </Head>
      
      <main className='flex-col gap-10 pt-10 grow flex'>
        <div className='text-xl font-bold'>Alla auktioner just nu: <span className='text-blueTwo-500 text-2xl'>{posts.length}</span></div>
        <div className='flex flex-col md:grid xl:grid-cols-5 md:grid-cols-3 justify-center gap-5'>
        {posts.map((post) => {
          return (
            <div key={post._id} className='md:min-w-80 border border-gray-300 relative'>
              <div className='font-bold text-white text-xl bg-blueOne-500 px-4 py-1 absolute z-10 right-[-10px] top-[-10px] shadow-md'>475 000 kr</div>
              <div className='w-5 h-5 absolute bg-blueOne-700 right-[-5.8px] top-[16px] rotate-45' />
              <div className='relative className="object-cover overflow-hidden'>
                <Link  href={`/auktion/produkt/${post.slug.current}`}>
                  <Image src={urlFor(post.huvudbild).url()!} width={600} height={600} className='hover:scale-110 duration-300 transitionl' alt={post.title} priority />
                </Link>
              </div>

                <div className='flex flex-col'>
                <div className='py-4'>
                  <Link className='font-semibold font-Lato text-md px-5' href={`/auktion/produkt/${post.slug.current}`}>{post.title.slice(0, 30)} {post.title.length > 30 && `...`}</Link>
                  <p className='font-Lato text-sm px-5'>{post.plats[0].title}</p>
                </div>
                <div className=' bg-ligtBlue-500 text-blueTwo-500 font-Lato font-semibold py-3 flex justify-center items-center gap-1'>
                 <HiOutlineClock className='text-[20px]' /> 1 dag 23 timmar
                </div>
                </div>
            </div>
          )
        })
        }
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    title,
    huvudbild,
    slug,
    _id,
    plats[] -> {
      title
    },
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};