import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const EditContact = () => {

    const { store, dispatch } = useGlobalReducer();
    const { id } = useParams();
    const navigate = useNavigate();

    const contact = store.contacts.find(contact => contact.id === parseInt(id));
    const [form, setForm] = useState(contact || { name: "", email: "", phone: "", address: "" })


    useEffect(() => {
        if (contact) {
            setForm(contact);
        }
    }, [contact]);


    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: "edit_contact", payload: form });
        navigate("/");
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4">
                <h1 className="text-center mb-4">Editar Contacto</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input 
                            type="text" 
                            id="name"
                            name="name" 
                            className="form-control" 
                            value={form.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email" 
                            className="form-control" 
                            value={form.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Teléfono</label>
                        <input 
                            type="tel" 
                            id="phone"
                            name="phone" 
                            className="form-control" 
                            value={form.phone} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Dirección</label>
                        <input 
                            type="text" 
                            id="address"
                            name="address" 
                            className="form-control" 
                            value={form.address} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-success">Guardar</button>
                        <Link to={"/"} className="btn btn-secondary">Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};