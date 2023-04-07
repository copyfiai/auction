import { sanityClient, urlFor } from "../../../../sanity";
import { Post } from "../../../../typing";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import PortableText from 'react-portable-text';
import { FaMapMarkerAlt } from 'react-icons/fa';


interface Props {
    post: Post
}

function Post({post}: Props) {

    console.log(post)

  return (
    <>
    <Head>
    <title>{post.kategorier[0].title} | {post.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={post.description}/>
      <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
    </Head>
    <main className="mb-48 m-auto md:max-w-[1250px] pt-10 flex flex-col md:flex-row gap-10">
        <div className="flex flex-col space-y-4 w-full order-2 md:order-1">
        <h1 className="md:text-3xl text-blueOne-500">{post.title}</h1>
        <div className="flex md:space-x-32 space-x-10">
            <ul>
                <li>Märke & Modell: <span className="font-semibold">{post.marke}</span></li>
                <li>Säljare: <span className="font-semibold">{post.author.name}</span></li>
                
            </ul>
            <ul>
                <li>Objekt-id: <span className="font-bold text-blueTwo-500">{post._id.slice(0, 5)}</span></li>
                <li className="flex items-center gap-1"><FaMapMarkerAlt className="text-blueTwo-500" /> <span className="font-semibold">{post.plats[0].title}</span></li>
            </ul>
        </div>
        <div>
            <Image width={750} height={750} className="w-full" src={urlFor(post.huvudbild).url()!} alt={post.title} /> 
        </div>  
        <article className="md:max-w-3xl flex flex-col gap-5 col-span-1">
                <h3 className="text-3xl font-semibold text-blueTwo-500">Beskrivning</h3>
                <PortableText 
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                        content={post.beskrivning}
                        className="flex flex-col gap-2"
                        serializers={
                            {
                                div : (props: any) => <div className="flex">{props.children}</div>,
                                figure : (props: any) => <figure className="flex space-y-10 mb-20">{props.children}</figure>,
                                h1: (props: any) => <h1 className="text-2xl">{props.children}</h1>,
                                h2: (props: any) => <h2 className="text-xl">{props.children}</h2>,
                                h3: (props: any) => <h3 className="text-lg">{props.children}</h3>,
                                p: (props: any) => <p className="text-lg flex font-Lato">{props.children}</p>,
                                li: (props: any) => <li className="text-sm">{props.children}</li>,
                                blockquote: (props: any) => <blockquote className="text-sm">{props.children}</blockquote>,
                                code: (props: any) => <code className="text-sm">{props.children}</code>,
                                link: ({ href, children }: any) => (
                                    <a className="underline text-blue-500" href={href} target="_blank">
                                        {children}
                                    </a>
                                ),
                                

                            }
                        }
                    /> 
                
            </article>
        </div>
        <div className="md:w-[550px] flex flex-col space-y-5 font-Lato order-1 md:order-2">
            <div className=" bg-ligtBlue-500 px-5 rounded-sm h-20 flex justify-between items-center">
                <div className="font-bold">Ledande bud:</div>
                <div className="text-2xl text-blueTwo-500 font-bold">1134 000 kr</div>
            </div>
            <div className=" bg-blueThree-500 text-white px-5 rounded-sm h-20 flex justify-between items-center">
                <div className="font-bold">Avslutas om:</div>
                <div className="text-right">
                    <div className="text-lg  text-white font-bold">1 dag 18 tim</div>
                    <div className="text-sm  text-white">4 april 10:34</div>
                </div>
            </div> 
            <table className="table-fixed border border-gray-400">
                <thead className="h-10">
                    <tr className="border border-gray-400">
                        <th className="font-bold">Bud <span className="font-normal">(3)</span></th>
                        <th className="font-bold">Tid</th>
                        <th className="font-bold">Budgivare</th>
                    </tr>
                </thead>
                <tbody className="text-center h-40 ">
                    <tr className="bg-gray-200">
                        <td>1113 000 kr</td>
                        <td>2 apr 12:11</td>
                        <td>9</td>
                    </tr>
                    <tr className="">
                        <td>1112 000 kr</td>
                        <td>1 apr 11:11</td>
                        <td>4</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td>1022 020 kr</td>
                        <td>1 jan 15:18</td>
                        <td>9</td>
                    </tr>
                </tbody>
                <tfoot className="h-20 w-full text-center">
                    <tr> 
                        <td><span className="font-bold">A</span> = Autobud</td>
                        <td><button className="border-blueTwo-500 border hover:ease-in-out duration-300 text-blueThree-500 px-5 py-2 rounded-full text-sm font-bold hover:bg-blueThree-500 hover:text-white ">Visa budhistorik</button></td>

                    </tr>
                </tfoot>
            </table>
            <div className="rounded-sm h-12 flex justify-between items-center bg-gray-200">
                <div className="font-bold text-sm">25% <span className="font-normal">moms tillkommer</span></div>
            </div>
            <div className="flex justify-between gap-2">
                <button className="bg-ligtBlue-500 w-full h-12 rounded-sm font-bold text-blueTwo-500">Skapa Konto</button>
                <button className="w-full h-12 font-bold bg-blueTwo-500 text-white rounded-sm">Logga in</button>
            </div>
        </div>         
    </main>
    </>
  )
}

export default Post;

export const getStaticPaths = async () => {
    const query = `*[_type == "post"] {
        _id,
        slug {
          current
        },
      
      }`;
    
    const posts = await sanityClient.fetch(query);
    
    const paths = posts.map((post: Post) => ({
        params: { slug: post.slug.current },
    }));
    
    return {
        paths,
        fallback: 'blocking',
    };
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        _createdAt,
        title,
        kategorier[] -> {
            title,
            slug,
        },
        marke,
        plats[] -> {
            title,
            slug,
        },
        beskrivning,
        author -> {
            name,
            image
        },
        huvudbild,
        slug,
    }`;

    const post = await sanityClient.fetch(query, { 
        slug: params?.slug,

    });

    if(!post) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            post,
        },
    };

}