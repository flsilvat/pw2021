import { useState } from 'react';

import { useUserContext } from '../contexts/UserContext';

const Login = () => {
    const { login, token } = useUserContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
        console.log("--login page--");
        console.log(status);
        if (status === 200){                
            console.log("log ok");
            //navegar
            setError('');
            setUsername("");
            setPassword(""); 
        }
        else if (status === 401) setError('Clave Incorrecta. Intente de nuevo!');
        else if (status === 404) setError('El usuario no existe!');
        else if (status === 500) setError('Un error ha ocurrido en el servidor.');
    }

    return (
        <div className="flex justify-center items-center">
            <form  className="flex flex-col gap-2"
                onSubmit={onSubmitHandler}>
                <h2>Inicio de Sesion</h2>
                {error && <p>{ error }</p>}
                <label>Usuario</label>
                <input className=""
                    type="text"
                    value={username}
                    placeholder='Ingrese su usuario'
                    onChange={(e) => onChange(e, setUsername)}
                />
                <label>Password</label>
                <input className=""
                    type="password"
                    placeholder="Ingrese su password"
                    onChange={(e) => onChange(e, setPassword)}
                    value={password}
                />

                <button className="bg-blue-100"
                    type="submit">
                    Log In
                </button>
            </form>
        </div>
    )
}

export default Login;