import { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useUserContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const nav = useNavigate();

    const onChange = (e, saveState) => {
        saveState(e.target.value);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!username || !password){
            setError('Ingrese su Usuario y Password');
            return;
        }
        
        const status = await login(username, password);
        if (status === 200){                
            console.log("log ok");
            nav('/'); // redirecciona a Main componentPage
            setError('');
            setUsername("");
            setPassword(""); 
        }
        else if (status === 401) setError('Clave Incorrecta. Intente de nuevo!');
        else if (status === 404) setError('El usuario no existe!');
        else if (status === 500) setError('Un error ha ocurrido en el servidor.');
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
            <form  className="flex flex-col gap-2 bg-white p-4 rounded-lg w-80 shadow-md"
                onSubmit={onSubmitHandler}>

                <h2 className="font-bold text-blue-500 text-2xl">Inicio de Sesion</h2>
                {error && <p>{ error }</p>}

                <label>Usuario</label>
                <input className="bg-gray-100 p-2 rounded-lg border border-gray-400 
                    focus:outline-none focus:ring-4 focus:border-blue-600"
                    type="text"
                    value={username}
                    placeholder='Ingrese su usuario'
                    onChange={(e) => onChange(e, setUsername)}
                />

                <label>Password</label>
                <input className="bg-gray-100 p-2 rounded-lg border border-gray-400
                    focus:outline-none focus:ring-4 focus:border-blue-600"
                    type="password"
                    placeholder="Ingrese su password"
                    onChange={(e) => onChange(e, setPassword)}
                    value={password}
                />

                <button className="bg-blue-500 p-2 mt-4 rounded-lg text-white font-bold text-lg
                    transition duration-100 hover:bg-blue-700"
                    type="submit">
                    Log In
                </button>
            </form>
            <p className="justify-self-start mt-6 text-xs text-gray-600">Programacion Web © 2021 </p>
        </div>
    )
}

export default Login;