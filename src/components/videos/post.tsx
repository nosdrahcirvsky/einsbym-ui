import { api } from '@/constants/constants';
import { FIND_POST_BY_ID } from '@/graphql/queries/post';
import { PostType } from '@/types/types';
import getElapsedTime from '@/utils/elapsed-time';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Comments from './comments';

export default function Post(props: { postId: string }) {
    // States
    const [post, setPost] = useState<PostType>();

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
                <div className="relative w-full text-sm rounded-lg shadow-lg text-white bg-black p-3">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-base font-semibold leading-none text-white">
                            <a href={`profile/${post.user.username}`}>
                                <img
                                    className="w-10 h-10 rounded-full object-cover"
                                    src={api.storageUrl + post.user.profilePicture}
                                    alt={post.user.firstName}
                                />
                            </a>
                            <div className="flex flex-col">
                                <span>
                                    {post.user.firstName} {post.user.lastName}
                                </span>
                                <span className="hover:underline text-sm font-normal text-gray-400">@{post.user.username}</span>
                            </div>
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
                    <p className="mb-4">{post.postText}</p>
                    <ul className="flex text-gray-400">
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
                    <span className="absolute bottom-3 right-3 text-gray-400">{getElapsedTime(post.createdAt)}</span>
                </div>

                <Comments postId={post.id} />
            </div>
        );
    }
}
