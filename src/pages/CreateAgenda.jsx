import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CreateAgenda = () => {
    const { store, dispatch } = useGlobalReducer();
    const [newAgenda, setNewAgenda] = useState({ slug: "" });
    const navigate = useNavigate(); // Para redirigir al usuario

    const handleCreate = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${newAgenda.slug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    slug: newAgenda.slug, 
                }),
            });

            if (!response.ok) {
                throw new Error("No se pudo crear la agenda.");
            }

            const data = await response.json();
            dispatch({ type: "set_agendas", payload: [...store.agendas, data] });

            navigate("/");

        } catch (error) {
            console.error("Error creando la agenda:", error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4">
                <h3 className="text-center">Crear Nueva Agenda</h3>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el nombre de la nueva agenda"
                        value={newAgenda.slug}
                        onChange={(e) => setNewAgenda(prev => ({ ...prev, slug: e.target.value }))}
                    />
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-primary" onClick={handleCreate}>
                        Crear Agenda
                    </button>
                </div>
            </div>
        </div>
    );
}
