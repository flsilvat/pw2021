import { useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post/Post';

const Main = () => {
    const { logout, token } = useUserContext();
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
                    className="bg-gray-200"
                >
                    Log Off
                </button>
            </div>
            <div>
                <Post />
            </div>
        </div>
    );
};

export default Main;