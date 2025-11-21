import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(null);
    try {
      await register({ name, email, password });
      navigate("/profile");
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (data.errors) {
          setErrors(data.errors.map((x) => x.message).join("; "));
        } else if (data.message) {
          setErrors(data.message);
        } else {
          setErrors("Erro ao registrar");
        }
      } else {
        setErrors("Erro ao registrar");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 font-bold text-center">Criar Conta</h2>

        {errors && <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{errors}</div>}

        <input
          type="text"
          placeholder="Nome"
          className="w-full p-2 mb-3 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {submitting ? "Criando..." : "Criar Conta"}
        </button>

        <p className="text-sm mt-3 text-center">
          Já tem conta? <Link to="/login" className="text-blue-600">Fazer login</Link>
        </p>
      </form>
    </div>
  );
}
