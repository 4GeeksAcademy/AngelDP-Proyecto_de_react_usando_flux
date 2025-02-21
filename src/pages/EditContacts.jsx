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
        <div className="container">
            <h1>Editar Contacto</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
                <input type="text" name="address" value={form.address} onChange={handleChange} required />
                <button type="submit" className="btn btn-success">Guardar</button>
            </form>
        </div>
    );
};