import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    api.get("/user/profile")
      .then((res) => setServerData(res.data))
      .catch(() => setServerData(null));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Perfil</h1>

        <div className="bg-white p-6 rounded shadow">
          <p><strong>ID:</strong> {serverData?._id || user?.id || "—"}</p>
          <p className="mt-2"><strong>Nome:</strong> {serverData?.name || user?.name}</p>
          <p className="mt-2"><strong>Email:</strong> {serverData?.email || user?.email}</p>
        </div>
      </div>
    </div>
  );
}
