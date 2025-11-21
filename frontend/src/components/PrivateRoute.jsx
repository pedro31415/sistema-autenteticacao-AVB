import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }){
    const { user, loading } = useContext(AuthContext);

    if(loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-gray-600">Carregando...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace/>
    }

    return children;
}