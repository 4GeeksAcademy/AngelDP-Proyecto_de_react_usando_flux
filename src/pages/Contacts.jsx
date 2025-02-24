import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Contacts = () => {

    const { store, dispatch } = useGlobalReducer();


    if (!store.contacts || store.contacts.length === 0) {
        return (
            <div className="container mt-5">
                <div className="card shadow-sm p-4 text-center">
                    <h1 className="mb-4">Lista de Contactos</h1>
                    <p className="text-muted">No hay contactos disponibles.</p>
                    <div className="d-flex justify-content-center mt-4">
                        <Link to="/add">
                            <button className="btn btn-primary">Agregar Contacto</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4">
                <h1 className="text-center mb-4">Lista de Contactos</h1>
                {store.contacts?.length > 0 ? (
                    <ul className="list-group">
                        {store.contacts.map((contact) => (
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