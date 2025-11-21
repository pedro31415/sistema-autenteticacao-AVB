import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar({ children }) {
    const { user, logout } = useContext(AuthContext);

    return (
        <>
            <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
                <div>
                    <Link to="/" className="font-bold">MeuApp</Link>
                </div>

                <div className="flex items-center space-x-4">
                    {!user ? (
                        <>
                            <Link to="/login" className="text-sm">Login</Link>
                            <Link to="/register" className="text-sm bg-blue-600 px-3 py-1 rounded">Cadastrar</Link>
                        </>
                    ) : (
                        <>
                            <span className="text-sm">Ola, {user.name}</span>
                            <Link to="/profile" className="text-sm">Perfil</Link>
                            <button
                                onClick={logout}
                                className="text-sm bg-red-600 px-3 py-1 rounded"
                            >
                                Sair 
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {children}
        </>
    );
}