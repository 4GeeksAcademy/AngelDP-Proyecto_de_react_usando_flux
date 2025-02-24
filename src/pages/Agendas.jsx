import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export const Agendas = () => {

    const { store, dispatch } = useGlobalReducer();
    const [selectedAgenda, setSelectedAgenda] = useState("");


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


    useEffect(() => {
        if (!selectedAgenda) return;
        const loadContacts = async () => {
            try {
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/${selectedAgenda}`);
                const data = await response.json();
                console.log("Datos recibidos de la API:", data);

                dispatch({ type: "set_contacts", payload: data.contacts });
            } catch (error) {
                console.error("Error cargando contactos:", error);
            }
        };
        loadContacts();
    }, [selectedAgenda]);


    const handleSelect = (slug) => {
        setSelectedAgenda(slug);
    };

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


    const filteredContacts = store.contacts || [];

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4">
                <div className="align-items-center p-3">
                    <h1 className="text-center mb-4">Agendas</h1>

                <div className="text-center text-muted">
                        <Link to="/create-agenda">
                            <button className="btn btn-primary">
                                Crear una nueva agenda
                            </button>
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
                                    <Link to={`edit/${agenda.id}`} className="btn btn-outline-warning btn-sm mx-1">
                                        Editar
                                    </Link>
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => handleSelect(agenda.slug)}
                                    >
                                        Seleccionar Agenda
                                    </button>
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
                    ""
                )}

                <h1 className="text-center mb-4">Lista de Contactos</h1>

                {filteredContacts.length > 0 ? (
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
                                <div>
                                    <Link to={`edit/${contact.id}`} className="btn btn-outline-warning btn-sm mx-1">
                                        Editar
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => dispatch({ type: "delete_contact", payload: contact.id })}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-muted">No hay contactos disponibles.</p>
                )}

                <div className="d-flex justify-content-end mt-4">
                    <Link to="/add">
                        <button className="btn btn-primary">Agregar Contacto</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};