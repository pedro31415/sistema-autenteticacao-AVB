import {  createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(false);
            return;
        }

        api.get("/user/profile")
            .then((res) => {
                setUser(res.data);
            })
            .catch(() => {
                localStorage.removeItem("token");
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    const login = async ({ email, password}) => {
        const res = await api.post("/auth/login", { email, password });
        const token = res.data.token;
        localStorage.setItem("token", token);
        const profileRes = await api.get("/user/profile");
        setUser(profileRes.data);
        return res;
    };

    const register = async ({ name, email, password }) => {
        const res = await api.post("/auth/register", { name, email, password });
        const token = res.data.token;
        localStorage.setItem("token", token);
        const profileRes = await api.get("/user/profile");
        setUser(profileRes.data);
        return res;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login")
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}