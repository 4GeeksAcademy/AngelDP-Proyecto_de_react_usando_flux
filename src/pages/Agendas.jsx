import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

export const Agendas = () => {

    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const loadAgendas = async () => {
            try {
                const response = await fetch("https://playground.4geeks.com/contact/agendas");
                const data = await response.json();
                dispatch({ type: "set_agendas", payload: data.agendas });
            } catch (error) {
                console.error("Error cargando agendas:", error);
            }
        };
        loadAgendas();
    }, []);

    const handleDelete = async (slug) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al eliminar la agenda.");
            }

            dispatch({ type: "delete_agenda", payload: slug });
        } catch (error) {
            console.error("Error eliminando la agenda:", error.message);
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
                <div className="text-center mb-4">
                    <h1 className="fw-bold text-dark">📜 Agendas</h1>
                    <p className="text-muted">Administra tus agendas como un verdadero escriba</p>
                    <Link to="/create-agenda">
                        <button
                            className="btn btn-dark btn-lg rounded-pill px-4 mt-3"
                            style={{
                                backgroundColor: "#8b5a2b",
                                border: "none",
                            }}
                        >
                            + Crear nueva agenda
                        </button>
                    </Link>
                </div>

                {store.agendas.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {store.agendas.map((agenda) => (
                            <li
                                key={agenda.id}
                                className="list-group-item d-flex justify-content-between align-items-center py-4"
                                style={{
                                    backgroundColor: "#f4e6d7",
                                    borderBottom: "1px solid #d2b48c",
                                }}
                            >
                                <div>
                                    <h5 className="mb-0 text-dark fw-semibold">{agenda.slug}</h5>
                                </div>
                                <div>
                                    <Link
                                        to={`/agenda/${agenda.slug}`}
                                        className="btn btn-outline-dark btn-sm rounded-pill me-2"
                                        style={{ borderColor: "#8b5a2b", color: "#8b5a2b" }}
                                    >
                                        Ver contactos
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger btn-sm rounded-pill"
                                        onClick={() => handleDelete(agenda.slug)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-dark mt-4 fs-5">
                        No hay agendas disponibles.
                    </p>
                )}
            </div>
        </div>
    );
};