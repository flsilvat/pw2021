import React from 'react';

const Comment = ({ comment }) => {
    const { user, description } = comment;

    return (
        <div className="m-2 px-3 py-1 bg-gray-200 rounded-2xl">
            <p className="text-xs font-bold">{user.username}</p>
            <p className="text-sm">{description}</p>
        </div>
    );
};

export default Comment;