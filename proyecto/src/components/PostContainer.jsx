import { useEffect, useState } from 'react';
import services from '../services/services';
import { useUserContext } from '../contexts/UserContext';
import Post from './Post';

const PostContainer = ( {filters} ) => {
    const [rawData, setRawData] = useState({});
    const { token, user } = useUserContext();
    const [userFavs, setUserFavs] = useState({});

    useEffect(() => {
        const getAll = async () => {
            const raw = await services.getAll(token, filters);
            setRawData(raw);

            const rawFavs = await services.getFavs(token); 
            setUserFavs(rawFavs);
            //console.log(userFavs);
        }
        getAll();
    }, [filters]);


    return (
        <div className="flex flex-col justify-center 
            items-center gap-2 md:gap-4">
            {
                rawData.data && rawData.data.map( (post) => 
                    <Post loggedUser={user} key={post._id} data={post} token={token} userFavs={userFavs}/>
                )
            }
        </div>
    )
}

export default PostContainer;