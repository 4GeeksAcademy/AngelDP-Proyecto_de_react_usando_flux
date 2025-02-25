import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const CreateAgenda = () => {
    const { store, dispatch } = useGlobalReducer();
    const [newAgenda, setNewAgenda] = useState({ slug: "" });
    const navigate = useNavigate(); 

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
            <div
                className="card shadow-lg rounded-4 p-5 border-0"
                style={{
                    backgroundColor: "#f4e6d7",
                    border: "1px solid #d2b48c",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                }}
            >
                <h2 className="text-center fw-bold text-dark mb-4">📜 Crear Nueva Agenda</h2>

                <div className="form-group mb-4">
                    <label htmlFor="agendaName" className="form-label text-dark fw-semibold">
                        Nombre de la Agenda
                    </label>
                    <input
                        type="text"
                        id="agendaName"
                        className="form-control rounded-pill border-0 shadow-sm p-3"
                        style={{
                            backgroundColor: "#fdfaf4",
                            border: "1px solid #d2b48c",
                        }}
                        placeholder="Escribe el nombre de tu agenda..."
                        value={newAgenda.slug}
                        onChange={(e) => setNewAgenda((prev) => ({ ...prev, slug: e.target.value }))}
                    />
                </div>

                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-dark rounded-pill px-5 py-2"
                        style={{
                            backgroundColor: "#8b5a2b",
                            border: "none",
                        }}
                        onClick={handleCreate}
                    >
                        Crear Agenda
                    </button>

                    <Link
                        to={"/"}
                        className="btn text-white rounded-pill px-4 py-2"
                        style={{ backgroundColor: "#6a4f4b", border: "none" }}
                    >
                        ⬅️ Volver a las agendas
                    </Link>

                </div>
            </div>
        </div>
    );
}
