import axios from 'axios';
import React, { useState } from 'react';
import services from '../services/services';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

const Post = ( {data, loggedUser, token} ) => {
    const { _id, title, description, image, active, user, 
        likes, history, comments, createdAt, updatedAt, __v} = data;
    const [like, setLike] = useState(likes.some((x) => x.username === loggedUser.username));
    const [likesLength, setLikesLength] = useState(likes.length);

    const likePost = async () => {
        try{
            const response = await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/${_id}`, null,
                { headers: { Authorization: `Bearer ${token}`}}
            )
            if (!like){
                setLikesLength(likesLength + 1);
                setLike(!like);
            }
            else {
                setLikesLength(likesLength - 1);
                setLike(!like);
            }

        } catch (error) {
            console.log(error);
        }
    }

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
            <p className="px-2 md:px-3 md:pb-3 text-sm font-bold">{title}</p>
            <p className="px-2 pb-2 md:px-3 md:pb-3 text-sm">{description}</p>
            {image && 
                <img 
                    className="w-full"
                    src={image} alt={user.username}
                ></img>
            }
            <div className="w-full my-1 md:my-3 flex justify-center gap-3">
                <button 
                    className={`text-gray-600 bg-gray-200 w-1/3 p-2 rounded-full flex 
                        justify-center gap-1 items-center ${like && 'text-blue-500 font-bold'}`}
                    onClick={likePost} type="button"
                >
                    <AiOutlineLike size={22} />
                    {likesLength!=0 ? likesLength : ''}
                </button>
                <div className="text-gray-600 bg-gray-200 w-1/3 p-2 rounded-full flex justify-center gap-1 items-center">
                    <FaRegCommentAlt size={19} />
                    {comments.length!=0 ? comments.length : ''}
                </div>
            </div>
        </div>
    )
}

export default Post;