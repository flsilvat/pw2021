import React, { useState } from "react";


const NewComment = ({ onClick,onChange,value }) => {
    return (
        <form className="flex justify-between items-center p-4 m-2 bg-gray-200 rounded-2xl" onSubmit={onClick} >
            <input className="flex-1 rounded-l-md" type="text"
                value={value}
                onChange={onChange}
                type="text"
            />
            <button className="w-3/12 bg-blue-500 text-red-50 font-bold rounded-r-md" type="submit"  >Enviar</button>
        </form>
    );
};

export default NewComment;
