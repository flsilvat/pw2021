import { useEffect, useState } from 'react';
import services from '../services/services';
import { useUserContext } from '../contexts/UserContext';
import Post from './Post';

const PostContainer = () => {
    const [rawData, setRawData] = useState({});
    const { token } = useUserContext();

    useEffect(() => {
        const getAll = async () => {
            const raw = await services.getAll(token);
            setRawData(raw);
        }
        getAll();
    }, []);


    return (
        <div className="bg-gray-400 flex flex-col justify-center 
            bg-opacity-70 items-center gap-2">
            {
                rawData.data && rawData.data.map( (post) => 
                    <Post key={post._id} data={post} />
                )
            }
        </div>
    )
}

export default PostContainer;