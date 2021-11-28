import axios from 'axios';
import React, { useState,useCallback } from 'react';
import services from '../services/services';
import { AiOutlineLike, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import Comment from './Comment';
import NewComment from './NewComment';




const Post = ({ data, loggedUser, token, userFavs, setReload }) => {
    const { _id, title, description, image, active, user,
        likes, history, comments, createdAt, updatedAt, __v } = data;
    const [like, setLike] = useState(likes.some((x) => x.username === loggedUser.username));
    const [likesLength, setLikesLength] = useState(likes.length);
    const [fav, setFav] = useState(userFavs);
    const [viewComments, setViewComments] = useState(false);

    const [commentTxt, setCommentTxt] = useState("");
    const [editing, setEditing] = useState(false);

    

    const onChangeCommentPost = (e) => {
        setCommentTxt(e.target.value);
    }
    	
    const commentPost = async (e) => {
        try {
            e.preventDefault();

            const body = {
                description: commentTxt,
            };
            await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/comment/${_id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            setCommentTxt("");

            setReload(true);

        }
        catch (error) {
            console.log(error)
        }
    }

    const likePost = async () => {
        try {
            const response = await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/${_id}`, null,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (!like) {
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

    const favPost = async () => {
        try {
            const response = await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/fav/${_id}`, null,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            //console.log(response);
            if (!fav) setFav(!fav);
            else setFav(!fav);
        } catch (error) {
            console.log(error);
        }
    }

    const editMode = () => {
        setEditing(!editing);
    }

    const submitEdit = async (e) => {
        e.preventDefault();
        setEditing(!editing);
    }


    return (
        <div className="bg-white flex flex-col w-full md:rounded-lg md:shadow">
            <div className="w-full flex justify-between p-2 md:p-3 items-center">
                <div className="flex flex-col">
                    <h2 className="font-bold">{user.username}</h2>
                    <p className="text-xs text-gray-400">
                        {services.timeSince(createdAt)}
                    </p>
                </div>
                <button
                    className="hover:text-red-500 font-bold"
                    onClick={editMode} type="button"
                >
                    <HiOutlineDotsHorizontal size={22} color='#566573' />
                </button>
            </div>
            {!editing &&
                <p className="px-2 md:px-3 md:pb-3 text-sm font-bold">{title}</p>
            }
            

            
            {!editing &&
                <p className="px-2 pb-2 md:px-3 md:pb-3 text-sm">{description}</p>
            }
            
            {image && !editing &&
                <img
                    className="w-full"
                    src={image} alt={user.username}
                ></img>
            }

            {!editing &&
                <div className="w-full mt-2 md:mt-3 flex justify-center gap-3">
                    <button
                        className={`text-gray-600 bg-gray-200 w-1/5 p-2 rounded-full flex 
                            justify-center gap-1 items-center ${like && 'text-blue-500 font-bold'}`}
                        onClick={likePost} type="button"
                    >
                        <AiOutlineLike size={22} />
                        {likesLength != 0 ? likesLength : ''}
                    </button>
                    <button
                        className={`text-gray-600 bg-gray-200 w-1/5 p-2 rounded-full flex 
                        justify-center gap-1 items-center ${fav && 'text-red-500 font-bold'}`}
                        onClick={favPost} type="button"
                    >
                        {fav ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}

                    </button>
                    <div className="text-gray-600 bg-gray-200 w-1/5 p-2 rounded-full flex justify-center gap-1 items-center">
                        <FaRegCommentAlt size={19} />
                        {comments.length != 0 ? comments.length : ''}
                    </div>
                </div>
                
            }
            {!editing &&
                <div>
                    <NewComment onClick={commentPost} onChange={onChangeCommentPost} value={commentTxt} />
                </div>
            }
            {!editing &&
                <div className="w-full">
                {comments && comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                ))}
                </div>
            }

            {editing &&
                <form className="bg-white flex flex-col p-2 mb-2 items-center"
                    onSubmit={submitEdit}
                >
                    <input className="bg-gray-100 px-3 py-1 mb-2 w-4/5 text-sm rounded-full placeholder-gray-800"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Titulo del Post"
                        value={title}
                    />
                    <input className="bg-gray-100 px-3 py-1 mb-2 w-full text-xs rounded-full placeholder-gray-800"
                        type="text"
                        name="image"
                        id="image"
                        placeholder="URL de la imagen"
                        value={image}
                    />
                    <textarea className="bg-gray-100 px-2 py-1 mb-2 w-full text-xs rounded-xl placeholder-gray-800"
                        rows="3" cols="40"
                        name="description"
                        id="description"
                        placeholder="Descripcion del Post"
                        value={description}
                    />
                    <button className="bg-blue-500 p-1 rounded text-white font-bold text-sm w-1/3"
                        type="submit"
                    >
                        Actualizar
                    </button>
                </form>
            } 
        </div>
    )
}
export default Post;