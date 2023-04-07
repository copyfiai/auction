import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typing";
import PortableText from "react-portable-text";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";

interface Props {
    post: Post
}

function Post({post}: Props) {

    console.log(post)

  return (
    <>
    <Head>
    <title>PARK LEE | {post.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={post.description}
      />
    </Head>
    <main className="lg:grid md:w-3/6 w-5/6 m-auto grid-cols-2 gap-10 mb-48 items-center">
        <div className="order-2">
            <Image width={500} height={500} src={urlFor(post.huvudbild).url()!} alt={post.imgdescription} />
            <p className="text-sm text-center font-bold md:mb-0 mb-10">{post.imgdescription}</p>
        </div>  
        <div>
            <article className="max-w-3xl flex flex-col gap-5 order-1">
                <h1 className="text-4xl">{post.title}</h1>
                <h2 className="text-bold text-lg">{post.description}</h2>
                <PortableText 
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                        content={post.body}
                        className="flex flex-col gap-2"
                        serializers={
                            {
                                alt: (props: any) => <p className="text-sm">{props.children}</p>,
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
                                    <a href={href} target="_blank">
                                        {children}
                                    </a>
                                ),
                                image: (props: any) => (
                                    <div className="py-5 w-[500px]">
                                        <a href={props.imgurl}target="_blank"><Image width={500} height={500} src={urlFor(props.asset._ref).url()!} alt={props.alt} /></a>
                                        {props.alt && <p className="text-sm text-center uppercase font-normal mt-2">{props.alt}</p>}
                                    </div>
                                )
                                

                            }
                        }
                    />
                
            </article>        
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
        author -> {
            name,
            image
        },
        description,
        mainImage,
        imgdescription,
        slug,
        body,
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