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
        <div className="flex flex-col justify-center 
            items-center gap-2 md:gap-4">
            {
                rawData.data && rawData.data.map( (post) => 
                    <Post key={post._id} data={post} />
                )
            }
        </div>
    )
}

export default PostContainer;