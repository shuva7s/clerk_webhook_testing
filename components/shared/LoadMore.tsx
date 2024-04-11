// "use client"

// import { getPosts } from '@/lib/actions/post.actions';
// import { useEffect, useState } from 'react';
// import { useInView } from 'react-intersection-observer';
// import PostCard from './PostCard';

// interface Post {
//     _id: string;
//     authorName: string;
//     authorImage: string;
//     title: string;
//     content: string;
//     imageUrl: string;
//     likes: string[];
// }

// let page = 0;

// const LoadMore = () => {
//     const { ref, inView } = useInView();
//     const [data, setData] = useState<Post[]>([]);

//     useEffect(() => {
//         if (inView) {
//             const delay = 500;
//             const timeoutId = setTimeout(() => {
//                 getPosts(page).then((res) => {
//                     setData([...data, ...res]);
//                     page++;
//                 });
//             }, delay);

//             // Clear the timeout if the component is unmounted or inView becomes false
//             return () => clearTimeout(timeoutId);
//         }
//     }, [inView, data]);

//     return (
//         <>
//             <section className="columns-1 space-y-6 md:columns-2 gap-6 lg:columns-3">
//                 {data.length > 0 ? (
//                     data.map((post) => (
//                         <PostCard post={post} key={post._id} />
//                     ))
//                 ) : (
//                     <p>
//                         No Posts to Show
//                     </p>
//                 )}
//             </section >
//             <div ref={ref}>
//                 LoadMore
//             </div>
//         </>
//     )
// }

// export default LoadMore;


