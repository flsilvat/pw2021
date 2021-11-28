import { useState, useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import PostContainer from '../components/PostContainer';
import { BiLogOutCircle } from 'react-icons/bi'
import NewPostForm from '../components/NewPostForm';
import PageButton from '../components/PageButton';


const Main = () => {
    const { logout, token, user } = useUserContext();
    const nav = useNavigate();
    const [filters, setFilters] = useState({ limit: 15, page: 0 });
    const [reload,setReload] = useState(true);

    const logoutHandler = () => {
        logout();
        nav('/');
    }

    useEffect(() => {
        if (token == null) nav('/login');
    },[]);

    const previousPageHandler = () => {
        const {page} = filters;
        if(page>0){
            setReload(true);
            setFilters({ limit: 15, page: page - 1 });
        }

    }
    const nextPageHandler = () => {
        const {page} = filters;
        setReload(true);
        setFilters({ limit: 15, page: page + 1 });
    }

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
                    <NewPostForm />
                )}

                <PostContainer filters={filters} reload={reload} setReload={setReload} />

                <div className="flex justify-center py-3 gap-10">
                    {filters.page!==0 &&
                        <PageButton text="Anterior" onClick= {previousPageHandler}/>
                    }
                    <PageButton text="Siguiente" onClick = {nextPageHandler}/>
                </div>

            </div>
        </div>
    );
};

export default Main;