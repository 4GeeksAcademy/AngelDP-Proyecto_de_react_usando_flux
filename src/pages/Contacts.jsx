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
            <div className="card shadow-sm p-4">
                <h1 className="text-center mb-4">Contactos de la Agenda: {slug}</h1>

                {filteredContacts.length > 0 ? (
                    <div>
                        <ul className="list-group">
                            {filteredContacts.map((contact) => (
                                <li
                                    key={contact.id}
                                    className="list-group-item d-flex justify-content-between align-items-center p-3"
                                >
                                    <div>
                                        <h5 className="mb-1">{contact.name}</h5>
                                        <p className="mb-0 text-muted">
                                            📧 {contact.email} | 📞 {contact.phone} | 📍 {contact.address}
                                        </p>
                                    </div>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleDelete(contact.id)}
                                    >
                                        Eliminar
                                    </button>
                                    <Link to={`/agenda/${slug}/contacts/${contact.id}/edit`} className="btn btn-outline-info btn-sm mx-1">
                                        Editar
                                    </Link>
                                </li> 
                            ))}
                        </ul>
                        <Link to={"/"} className="mt-4 btn btn-outline-primary btn-sm mx-1">
                            Volver a las agendas.
                        </Link>
                    </div>
                ) : (
                    <div className="text-center mb-4">
                        <p>No hay contactos disponibles..</p>
                        <Link to={"/"} className="btn btn-outline-primary btn-sm mx-1">
                            Volver a las agendas.
                        </Link>
                        <Link to={`/agenda/${slug}/create`} className="btn btn-outline-primary btn-sm mx-1">
                            Crear nuevo contacto
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};