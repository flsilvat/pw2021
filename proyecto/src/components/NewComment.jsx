import axios from "axios";
import React, { useState } from "react";

const URL = "https://posts-pw2021.herokuapp.com/api/v1";

const NewComment = ({ post, afterAdding }) => {
    const [commentTxt, setCommentTxt] = useState("");

    function onChange(e) {
        setCommentTxt(e.taret.value);
    }

    async function onSubmit(e) {
        e.preventDefault();

        const body = {
            description: commentTxt,
        };

        await axios.patch(`${URL}/auth/signin`, body, {
            headers: {
                Autorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        setCommentTxt("");

        afterAdding(body);
    }



    return (
        <form className="" onSubmit={onSubmit}>
            <input type="text"
                value={commentTxt}
                onChange={onChange}
                type="text"

            />
        </form>
    );
};

export default NewComment;
