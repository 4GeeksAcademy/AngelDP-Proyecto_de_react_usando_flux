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
            <div className="card shadow-sm p-4">
                <div className="align-items-center p-3">
                    <h1 className="text-center mb-4">Agendas</h1>
                    <div className="text-center text-muted">
                        <Link to="/create-agenda">
                            <button className="btn btn-primary">Crear una nueva agenda</button>
                        </Link>
                    </div>
                </div>

                {store.agendas.length > 0 ? (
                    <ul className="list-group">
                        {store.agendas.map((agenda) => (
                            <li
                                key={agenda.id}
                                className="list-group-item d-flex justify-content-between align-items-center p-3"
                            >
                                <div>
                                    <h5 className="mb-1">{agenda.slug}</h5>
                                </div>
                                <div>
                                    <Link to={`/agenda/${agenda.slug}`} className="btn btn-outline-primary btn-sm mx-1">
                                        Ver Contactos
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleDelete(agenda.slug)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-muted">No hay agendas disponibles.</p>
                )}
            </div>
        </div>
    );
};