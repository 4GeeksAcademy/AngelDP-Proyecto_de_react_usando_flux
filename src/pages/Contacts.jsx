import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Contacts = () => {

    const { store, dispatch } = useGlobalReducer();


    if (!store.contacts || store.contacts.length === 0) {
        return (
            <div className="container">
                <h1>Lista de contactos</h1>
                <p>No hay contactos disponibles.</p>
                <Link to="/add">
                    <button className="btn btn-primary mt-3">Add contact</button>
                </Link>
            </div>
        );
    }


    return (
        <div className="container">
            <h1>Lista de contactos</h1>
            <ul>
                {store.contacts?.map((contact) => (
                    <li key={contact.id} className="list-group-item d-flex justify-content-between">
                        <div>
                            <strong>{contact.name}</strong> - {contact.email} - {contact.phone} - {contact.address}
                        </div>
                        <div>
                            <Link to={`edit/${contact.id}`} className="btn btn-warning mx-2">Edit</Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => dispatch({ type: "delete_contact", payload: contact.id })}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <Link to="/add">
                <button className="btn btn-primary mt-3">Add contact</button>
            </Link>
        </div>
    );
};