import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    setSubmitting(true);
    try {
      await login({ email, password });
      navigate("/profile");
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (data.errors) {
          setErrors(data.errors.map((x) => x.message).join("; "));
        } else if (data.message) {
          setErrors(data.message);
        } else {
          setErrors("Erro ao fazer login");
        }
      } else {
        setErrors("Erro ao fazer login");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>

        {errors && <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{errors}</div>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {submitting ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-sm mt-3 text-center">
          Não tem conta? <Link to="/register" className="text-blue-600">Criar conta</Link>
        </p>
      </form>
    </div>
  );
}
