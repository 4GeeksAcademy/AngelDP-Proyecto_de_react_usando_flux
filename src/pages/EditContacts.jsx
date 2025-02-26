import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const EditContact = () => {

	const { store, dispatch } = useGlobalReducer();
	const { id, slug } = useParams();
	const navigate = useNavigate();

	const contact = store.contacts.find(contact => contact.id === parseInt(id));
	const [form, setForm] = useState(contact || { name: "", email: "", phone: "", address: "" })


	useEffect(() => {
		if (contact && contact.id) {
			setForm(contact);
		}
	}, [contact]);

	const handleEdit = async () => {

		try {
			const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form)
			})

			if (!response.ok) {
				throw new Error("No pudimos editar el contacto");
			}


			dispatch({ type: "edit_contact", payload: form });

			navigate(`/agenda/${slug}`);
		} catch (error) {
			console.log(error)
		}

	}

	const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		handleEdit()
	}

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
				<h1 className="text-center fw-bold text-dark mb-4">🖋️ Editar Contacto</h1>

				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="name" className="form-label text-dark">Nombre</label>
						<input
							type="text"
							id="name"
							name="name"
							className="form-control"
							value={form.name}
							onChange={handleChange}
							required
							style={{
								backgroundColor: "#fdfaf4",
								border: "1px solid #d2b48c",
								boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
							}}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="email" className="form-label text-dark">Correo Electrónico</label>
						<input
							type="email"
							id="email"
							name="email"
							className="form-control"
							value={form.email}
							onChange={handleChange}
							required
							style={{
								backgroundColor: "#fdfaf4",
								border: "1px solid #d2b48c",
								boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
							}}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="phone" className="form-label text-dark">Teléfono</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							className="form-control"
							value={form.phone}
							onChange={handleChange}
							required
							style={{
								backgroundColor: "#fdfaf4",
								border: "1px solid #d2b48c",
								boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
							}}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="address" className="form-label text-dark">Dirección</label>
						<input
							type="text"
							id="address"
							name="address"
							className="form-control"
							value={form.address}
							onChange={handleChange}
							required
							style={{
								backgroundColor: "#fdfaf4",
								border: "1px solid #d2b48c",
								boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
							}}
						/>
					</div>

					<div className="d-flex justify-content-between mt-4">
						<button
							type="submit"
							className="btn text-white rounded-pill px-4 py-2"
							style={{ backgroundColor: "#8b5a2b", border: "none" }}
						>
							📝 Guardar
						</button>
						<Link
							to={"/"}
							className="btn text-white rounded-pill px-4 py-2"
							style={{ backgroundColor: "#6a4f4b", border: "none" }}
						>
							❌ Cancelar
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};