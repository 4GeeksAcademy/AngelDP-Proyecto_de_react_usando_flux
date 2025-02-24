import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";

export const CreateContact = () => {

    const { store, dispatch } = useGlobalReducer();
    const [newContact, setNewContact] = useState({ name: "", email: "", address: "", phone: "", id: "" });
    const navigate = useNavigate();
    const { slug } = useParams();

    const handleCreate = async (event) => {
        event.preventDefault();  // Evita que el formulario haga el submit por defecto.

        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newContact.name,
                    email: newContact.email,
                    phone: newContact.phone,
                    address: newContact.address,
                }),
            });

            console.log('Response Status:', response.status);
            const responseBody = await response.text();
            console.log('Response Body:', responseBody);

            if (!response.ok) {
                throw new Error("No se pudo crear el contacto.");
            }

            const data = JSON.parse(responseBody);
            console.log('Response Data:', data);

            dispatch({ type: "add_contact", payload: [...store.contacts, data] });

            // Navegar a la página de contactos
            navigate(`/agenda/${slug}`);

        } catch (error) {
            console.error("Error creando el contacto:", error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4">
                <h3 className="text-center">Crear Nuevo Contacto</h3>
                <form onSubmit={handleCreate}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre del contacto"
                            value={newContact.name}
                            onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="form-group mt-2">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo electrónico"
                            value={newContact.email}
                            onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="form-group mt-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Número de teléfono"
                            value={newContact.phone}
                            onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="form-group mt-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Dirección"
                            value={newContact.address}
                            onChange={(e) => setNewContact(prev => ({ ...prev, address: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-primary">
                            Crear Contacto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
