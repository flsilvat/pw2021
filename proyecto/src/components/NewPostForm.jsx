import { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import services from '../services/services';

const NewPostForm = () => {
    const [error, setError] = useState(false);
    const { token } = useUserContext();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (data.title === '' || data.description === '' || data.image === '') setError(true);

        if (!error){
            console.log(data);
            const response = await services.post(token, data);
            console.log(response);
            if(response) setError(false);
        }
    }

    return (
        <form className="bg-white flex flex-col p-2 mb-2 items-center"
            onSubmit={onSubmit}
        >
            {error && <p>Todos los campos son requeridos!</p>}
            <input className="bg-gray-100 px-3 py-1 mb-2 w-4/5 text-sm rounded-full placeholder-gray-800"
                type="text"
                name="title"
                id="title"
                placeholder="Titulo del Post"
            />
            <input className="bg-gray-100 px-3 py-1 mb-2 w-full text-xs rounded-full placeholder-gray-800"
                type="text"
                name="image"
                id="image"
                placeholder="Ingrese el URL de la imagen"
            />
            <textarea className="bg-gray-100 px-2 py-1 mb-2 w-full text-xs rounded-xl placeholder-gray-800"
                rows="3" cols="40"
                name="description"
                id="description"
                placeholder="Descripcion del Post"
            />
            <button className="bg-blue-500 p-1 rounded text-white font-bold text-sm w-1/3"
                type="submit"
            >
                Publicar
            </button>
        </form>
    );
};

export default NewPostForm;