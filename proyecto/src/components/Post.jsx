import React from 'react';
import services from '../services/services';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

const Post = ( {data} ) => {
    const { _id, title, description, image, active, user, 
        likes, history, comments, createdAt, updatedAt, __v} = data;

    return (
        <div className="bg-white flex flex-col w-full md:rounded-lg md:shadow">
            <div className="w-full flex justify-between p-2 md:p-3 items-center">
                <div className="flex flex-col">
                    <h2 className="font-bold">{ user.username }</h2>
                    <p className="text-xs text-gray-400">
                        { services.timeSince(createdAt) }
                    </p>
                </div>
                <HiOutlineDotsHorizontal size={22} color='#566573'/>
            </div>
            <p className="px-2 pb-2 md:px-3 md:pb-3 text-sm">{description}</p>
            {image && 
                <img 
                    className="w-full"
                    src={image} alt={user.username}
                ></img>
            }
            <div className="w-full my-1 md:my-3 flex justify-center gap-3">
                <div className="text-gray-600 bg-gray-200 w-1/3 p-2 rounded-full flex justify-center gap-1 items-center">
                    <AiOutlineLike size={22} color='#566573' />
                    {likes.length!=0 ? likes.length : ''}
                </div>
                <div className="text-gray-600 bg-gray-200 w-1/3 p-2 rounded-full flex justify-center gap-1 items-center">
                    <FaRegCommentAlt size={19} color='#566573' />
                    {comments.length!=0 ? comments.length : ''}
                </div>
            </div>
        </div>
    )
}

export default Post;