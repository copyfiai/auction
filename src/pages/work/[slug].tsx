import { sanityClient, urlFor } from "../../../sanity";
import { Post } from "../../../typing";
import PortableText from "react-portable-text";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

interface Props {
    post: Post
}

function Post({post}: Props) {


  return (
    <>
    <Head>
    <title>PARK LEE | Work</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={post.description}/>
      <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
    </Head>
    <main className="mb-48 m-auto md:w-3/6 w-5/6 flex flex-col gap-5">
        <div>
            <Image width={750} height={750} className="w-full object-cover h-32" src={urlFor(post.mainImage).url()!} alt={post.description} /> 
        </div>  
        <article className="max-w-3xl flex flex-col gap-5">
                <h1 className="md:text-5xl text-2xl">{post.title}</h1>
                {/* <h2 className="text-bold text-lg">{post.description}</h2> */}
                <PortableText 
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                        content={post.body}
                        className="flex flex-col gap-2"
                        serializers={
                            {
                                div : (props: any) => <div className="flex">{props.children}</div>,
                                figure : (props: any) => <figure className="flex space-y-10 mb-20">{props.children}</figure>,
                                h1: (props: any) => <h1 className="text-2xl">{props.children}</h1>,
                                h2: (props: any) => <h2 className="text-xl">{props.children}</h2>,
                                h3: (props: any) => <h3 className="text-lg">{props.children}</h3>,
                                p: (props: any) => <p className="text-sm flex">{props.children}</p>,
                                li: (props: any) => <li className="text-sm">{props.children}</li>,
                                blockquote: (props: any) => <blockquote className="text-sm">{props.children}</blockquote>,
                                code: (props: any) => <code className="text-sm">{props.children}</code>,
                                link: ({ href, children }: any) => (
                                    <a className="underline text-blue-500" href={href} target="_blank">
                                        {children}
                                    </a>
                                ),
                                image: (props: any) => (
                                    <div className="py-5 max-w-[650px]">
                                        <a href={props.imgurl}target="_blank"><Image width={650} height={650} src={urlFor(props.asset._ref).url()!} alt={props.alt} /></a>
                                        {props.alt && <p className="text-sm text-center sub">{props.alt}</p>}
                                    </div>
                                )
                                

                            }
                        }
                    />
                
            </article>        
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
        author -> {
            name,
            image
        },
        description,
        imgdescription,
        mainImage,
        slug,
        body
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