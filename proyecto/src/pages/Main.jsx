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
    const [ownerFilter, setOwnerFilter] = useState(false);

    const logoutHandler = () => {
        logout();
        console.log("cleared");
        nav('/login');
        console.log("logged out");
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
    const setOwnerHandler = () => {
        setOwnerFilter(!ownerFilter);
        setReload(true);
    }

    return (
        <div className="bg-gray-400 md:bg-gray-200">
            <div className="w-full md:w-3/4 lg:max-w-3xl flex flex-col m-auto">
                <div className="bg-white flex justify-between mb-2 md:my-3 md:rounded-lg md:shadow">
                    <h2 className="mt-2 ml-2">
                        Bienvenido <span className="text-blue-500 font-bold">{ user?.username }</span>
                    </h2>
                    <div className="flex items-center">
                    {user?.role === 'admin' && (
                        <button 
                            className={`text-xs font-bold bg-gray-200 rounded-full mr-1 px-2 
                            h-8 ${ownerFilter && 'font-bold bg-blue-500'}`}
                            onClick={setOwnerHandler}
                        >
                            My Posts
                        </button>
                    )}
                        <button
                            onClick={logoutHandler}
                            type="button"
                            className="bg-gray-200 rounded-full p-1 m-1 mr-2"
                            >
                            <BiLogOutCircle size={28} />
                        </button>
                    </div>
                </div>
                {user?.role === 'admin' && (
                    <NewPostForm setReload={setReload}/>
                )}

                <PostContainer 
                    filters={filters} 
                    reload={reload} 
                    setReload={setReload} 
                    ownerFilter={ownerFilter}
                />

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