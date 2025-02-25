import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";


export const Contacts = () => {

    const { store, dispatch } = useGlobalReducer();
    const { slug } = useParams();


    useEffect(() => {
        const loadContacts = async () => {
            try {

                const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`)

                const data = await response.json();
                
                dispatch({ type: "set_contacts", payload: data.contacts });
                

            } catch (error) {
                console.error("Error cargando contactos:", error);
            }
        }
        loadContacts();
    }, [slug]);

    const handleDelete = async (contactId) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contactId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al eliminar el contacto.");
            }

            dispatch({ type: "delete_contact", payload: contactId });
        } catch (error) {
            console.error("Error eliminando el contacto:", error.message);
        }
    };

    const filteredContacts = store.contacts || [];

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
                <h1 className="text-center fw-bold text-dark mb-4">
                    📜 Contactos de la Agenda: <span className="text-primary">{slug}</span>
                </h1>

                {filteredContacts.length > 0 ? (
                    <ul className="list-group mb-4">
                        {filteredContacts.map((contact) => (
                            <li
                                key={contact.id + 1}
                                className="list-group-item d-flex justify-content-between align-items-center rounded-3 mb-2"
                                style={{
                                    backgroundColor: "#fdfaf4",
                                    border: "1px solid #d2b48c",
                                    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
                                }}
                            >
                                <div>
                                    <h5 className="mb-1 text-dark fw-bold">{contact.name}</h5>
                                    <p className="mb-0 text-muted">
                                        📧 {contact.email} | 📞 {contact.phone} | 📍 {contact.address}
                                    </p>
                                </div>
                                <div>
                                    <Link
                                        to={`/agenda/${slug}/contacts/${contact.id}/edit`}
                                        className="btn btn-sm text-white rounded-pill me-2"
                                        style={{ backgroundColor: "#8b5a2b", border: "none" }}
                                    >
                                        ✏️ Editar
                                    </Link>
                                    <button
                                        className="btn btn-sm text-white rounded-pill"
                                        style={{ backgroundColor: "#b22222", border: "none" }}
                                        onClick={() => handleDelete(contact.id)}
                                    >
                                        ❌ Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center text-dark mb-4">
                        <p className="fw-bold">No hay contactos disponibles...</p>
                    </div>
                )}

                <div className="d-flex justify-content-center gap-3">
                    <Link
                        to={`/agenda/${slug}/create`}
                        className="btn text-white rounded-pill px-4 py-2"
                        style={{ backgroundColor: "#8b5a2b", border: "none" }}
                    >
                        ➕ Crear nuevo contacto
                    </Link>
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
};