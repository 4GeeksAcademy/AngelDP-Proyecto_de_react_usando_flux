import { Link } from "react-router-dom";
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
        <div className="container mt-5">
            <div className="card shadow-sm p-4">
                <h1 className="text-center mb-4">Agregar Contacto</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre Completo</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Full Name"
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
                            placeholder="Email"
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
                            placeholder="Phone number"
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
                            placeholder="Address"
                            value={form.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <button type="submit" className="btn btn-primary">Agregar</button>
                        <Link to={"/"} className="btn btn-secondary">Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};