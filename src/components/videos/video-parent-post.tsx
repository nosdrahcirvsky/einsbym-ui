import { api } from '@/constants/constants';
import { FIND_POST_BY_ID } from '@/graphql/queries/post';
import { Post } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

export default function VideoParentPost(props: { postId: string }) {
    // States
    const [post, setPost] = useState<Post>();

    // Queries
    const { data } = useQuery(FIND_POST_BY_ID, {
        variables: {
            postId: props.postId,
        },
    });

    useEffect(() => {
        if (data) {
            setPost(data.findPostById);
        }
    }, [data]);

    if (post) {
        return (
            <div className="w-2/6 h-screen pt-20 px-5">
                <div className="inline-block w-full text-sm rounded-lg shadow-sm text-gray-400 bg-black">
                    <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-base font-semibold leading-none text-white">
                                <a href={`profile/${post.user.username}`}>
                                    <img
                                        className="w-10 h-10 rounded-full object-cover"
                                        src={api.storageUrl + post.user.profilePicture}
                                        alt={post.user.firstName}
                                    />
                                </a>
                                <span>
                                    {post.user.firstName} {post.user.lastName}
                                </span>
                                <span className="hover:underline text-sm font-normal">{post.user.username}</span>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="text-white bg-[#040d12] hover:bg-[#cc00ff] hover:text-[#040d12] focus:ring-2 focus:ring-[#cc00ff] font-medium rounded-lg text-xs px-3 py-1.5 focus:outline-none"
                                >
                                    Follow
                                </button>
                            </div>
                        </div>
                        <p className="mb-4 text-sm">{post.postText}</p>
                        <ul className="flex text-sm">
                            <li className="me-2">
                                <a href="#" className="hover:underline">
                                    <span className="font-semibold text-white mr-1">{post.totalLikes}</span>
                                    <span>likes</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    <span className="font-semibold text-white mr-1">{post.totalComments}</span>
                                    <span>comments</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}