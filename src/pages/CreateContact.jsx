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
        event.preventDefault();

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

            
            const data = await response.text();
            

            if (!response.ok) {
                throw new Error("No se pudo crear el contacto.");
            }


            dispatch({ type: "add_contact", payload: [...store.contacts, data] });

            
            navigate(`/agenda/${slug}`);

        } catch (error) {
            console.error("Error creando el contacto:", error.message);
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
                <h3 className="text-center fw-bold text-dark mb-4">📇 Crear Nuevo Contacto</h3>

                <form onSubmit={handleCreate}>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre del contacto"
                            value={newContact.name}
                            onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                            required
                            style={{
                                backgroundColor: "#fdfaf4",
                                border: "1px solid #d2b48c",
                                boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
                            }}
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
                            style={{
                                backgroundColor: "#fdfaf4",
                                border: "1px solid #d2b48c",
                                boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
                            }}
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
                            style={{
                                backgroundColor: "#fdfaf4",
                                border: "1px solid #d2b48c",
                                boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
                            }}
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
                            style={{
                                backgroundColor: "#fdfaf4",
                                border: "1px solid #d2b48c",
                                boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
                            }}
                        />
                    </div>

                    <div className="d-flex justify-content-center mt-4">
                        <button
                            type="submit"
                            className="btn text-white rounded-pill px-4 py-2"
                            style={{
                                backgroundColor: "#8b5a2b",
                                border: "none",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            }}
                        >
                            📞 Crear Contacto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
