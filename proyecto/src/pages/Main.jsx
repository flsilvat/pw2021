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
        <div className="flex flex-col gap-2">
            <div className="w-screen flex flex-col items-end relative">
                <button
                    onClick={logoutHandler}
                    type="button"
                    className="bg-gray-200 rounded-full p-1 mt-1 mr-2"
                >
                    <BiLogOutCircle size={28} />
                </button>
            </div>
            <div>
                <PostContainer />
            </div>
        </div>
    );
};

export default Main;