import { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import services from '../services/services';

const NewPostForm = ({ setReload }) => {
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    const { token } = useUserContext();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        setError1(false);
        setError2(false);
        setError3(false);

        if (data.title === '' || data.description === '' || data.image === '') {
            setError1(true);
            return;
        }
        if (data.title.length < 8 || data.title.length > 32) {
            setError2(true);
            return;
        }
        if (data.description.length < 8) {
            setError3(true);
            return;
        }

        console.log(data);
        const response = await services.create(token, data);
        console.log(response);
        if (!response) return;
        document.getElementById("new-post").reset();
        setReload(true);
    }

    return (
        <form name="new-post" id="new-post" 
            className="bg-white flex flex-col p-2 mb-2 items-center 
            md:mb-4 md:rounded-lg md:shadow md:py-3 md:px-4"
            onSubmit={onSubmit}
        >
            <div className="text-red-600">
                {error1 && <p>Todos los campos son requeridos!</p>}
                {error2 && <p>Titulo debe ser entre 8 y 32 caracteres de largo.</p>}
                {error3 && <p>Descripcion debe ser minimo 8 caracteres de largo.</p>}
            </div>

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
                placeholder="URL de la imagen"
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