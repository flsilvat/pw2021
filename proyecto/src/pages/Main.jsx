import { useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import PostContainer from '../components/PostContainer';
import { BiLogOutCircle } from 'react-icons/bi'


const Main = () => {
    const { logout, token, user } = useUserContext();
    const nav = useNavigate();

    const logoutHandler = () => {
        logout();
        nav('/');
    }

    useEffect(() => {
        if (token == null) nav('/login');
    });

    return (
        <div className="bg-gray-400 md:bg-gray-200">
            <div className="w-full md:w-3/4 flex flex-col m-auto">
                <div className="bg-white flex justify-between mb-2 md:mb-4">
                    <h2 className="mt-2 ml-2">
                        Bienvenido <span className="text-blue-500 font-bold">{ user?.username }</span>
                    </h2>
                    <button
                        onClick={logoutHandler}
                        type="button"
                        className="bg-gray-200 rounded-full p-1 m-1 mr-2"
                        >
                        <BiLogOutCircle size={28} />
                    </button>
                </div>
                {user?.role === 'admin' && (
                    <h2>newPost</h2>
                )}

                <PostContainer />

            </div>
        </div>
    );
};

export default Main;