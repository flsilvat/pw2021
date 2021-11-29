import React, { useState } from 'react';
import services from '../services/services';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineEdit, AiOutlineLike, AiFillLike, AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import Comment from './Comment';
import NewComment from './NewComment';
import PostEdit from './PostEdit';

const Post = ({ data, loggedUser, token, userFavs, setReload }) => {
    const { _id, title, description, image, active, user,
        likes, history, comments, createdAt, updatedAt, __v } = data;
    const owner = user.username === loggedUser.username;
    const [like, setLike] = useState(likes.some((x) => x.username === loggedUser.username));
    const [likesLength, setLikesLength] = useState(likes.length);
    const [fav, setFav] = useState(userFavs);
    const [viewComments, setViewComments] = useState(false);
    const [commentTxt, setCommentTxt] = useState("");
    const [editing, setEditing] = useState(false);
    const [confirmActivate, setConfirmActivate] = useState(false);

    const onChangeCommentPost = (e) => {
        setCommentTxt(e.target.value);
    }

    const commentPost = async (e) => {
        e.preventDefault();
        if (!commentTxt) return;
        const body = {
            description: commentTxt,
        };
        const response = services.commentPost(token, _id, body);
        setCommentTxt("");
        if (!response) return;
        setReload(true);
        setViewComments(true);
    }

    const likePost = async () => {
        const response = services.likePost(token, _id);
        if (!response) return;
        if (!like) {
            setLikesLength(likesLength + 1);
        }
        else {
            setLikesLength(likesLength - 1);
        }
        setLike(!like);
    }

    const favPost = async () => {
        const response = services.favPost(token, _id);
        if (!response) return;
        setFav(!fav);
    }

    const editMode = () => {
        if (!owner) return;
        setEditing(!editing);
        
    }

    
    const toggleActive = () => {
        if (!confirmActivate) {
            setConfirmActivate(true);
            const waitConfirmation = async () => {
                const timeout = (time) => {
                    return new Promise((resolve) => setTimeout(resolve, time));
                };
            
                await timeout(5000);
                setConfirmActivate(false);
            }
            waitConfirmation();
            return;
        }
        setConfirmActivate(false);
        const response = services.toggleActive(token, _id);
        if (!response) return;
        setReload(true);
    }

    const showComments = () => {
        setViewComments(!viewComments);
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
                {owner && !editing &&
                    <div className="flex row gap-3 items-center">
                        {confirmActivate ? <p className="text-red-600 ">¿Esta seguro?</p> : ''}
                        <button
                            className={`${confirmActivate ? "text-white bg-red-600" : "text-gray-600 bg-gray-200"} p-2 rounded-full flex justify-center gap-1 items-center`}
                            onClick={toggleActive} type="button"
                        >
                            {active ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                        </button>
                        <button
                            className="text-gray-600 bg-gray-200 p-2 rounded-full flex justify-center gap-1 items-center"
                            onClick={editMode} type="button"
                        >
                            <AiOutlineEdit size={24} color='#566573' />
                        </button>
                    </div>
                }

            </div>
            {!editing &&
                <p className="px-2 md:px-3 md:pb-3 text-sm font-bold">{title} {active ? '' : <span className="text-red-600">(Desactivada)</span>}</p>
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
                        {like ? <AiFillLike size={24} /> : <AiOutlineLike size={24} />}
                        {likesLength != 0 ? likesLength : ''}
                    </button>
                    <button
                        className={`text-gray-600 bg-gray-200 w-1/5 p-2 rounded-full flex 
                        justify-center gap-1 items-center ${fav && 'text-red-500 font-bold'}`}
                        onClick={favPost} type="button"
                    >
                        {fav ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}

                    </button>
                    <button
                        className={`text-gray-600 bg-gray-200 w-1/5 p-2 rounded-full flex 
                        justify-center gap-1 items-center ${viewComments && 'text-green-500 font-bold'}`}
                        onClick={showComments} type="button"
                    >
                        <AiOutlineComment size={24} />
                        {comments.length != 0 ? comments.length : ''}
                    </button>
                </div>
            }
            {!editing &&
                <div>
                    <NewComment onClick={commentPost} onChange={onChangeCommentPost} value={commentTxt} />
                </div>
            }
            {!editing && viewComments &&
                <div className="w-full">
                    {comments && comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} />
                    ))}
                </div>
            }

            {editing && owner &&
                <PostEdit title={title} image={image} description={description} token={token} _id={_id} editMode={editMode} setReload={setReload} />
            }
        </div>
    )
}

export default Post;