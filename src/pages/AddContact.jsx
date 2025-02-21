import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const AddContact = () => {

    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: "add_contact", payload: { ...form, id: Date.now() } });
        navigate("/");
    };

    return (
        <div className="container">
            <h1>Agregar Contacto</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Full Name" name="name" value={form.name} onChange={handleChange} required />
                <input type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} required />
                <input type="tel" placeholder="Phone number" name="phone" value={form.phone} onChange={handleChange} required />
                <input type="text" placeholder="Address" name="address" value={form.address} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
        </div>
    );
};