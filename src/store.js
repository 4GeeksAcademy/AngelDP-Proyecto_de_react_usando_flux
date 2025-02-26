export const initialStore = () => {
	return {
		agendas: [],
		contacts: []
	}
}

export default function storeReducer(store, action = {}) {
	switch (action.type) {

		//Funciones para trabajar con las agendas.

		case 'set_agendas':
			return {
				...store, agendas: action.payload
			};

		case 'delete_agenda':
			return {
				...store,
				agendas: store.agendas.filter((agenda) => agenda.slug !== action.payload)
			};


		// Funciones para trabajar con los contactos.

		case 'set_contacts':
			return {
				...store, contacts: action.payload
			};

		case 'add_contact':

			return {
				...store, contacts: [...store.contacts, action.payload]
			};

		case 'edit_contact':

			return {
				...store,
				contacts: store.contacts.map(contact =>
					contact.id === action.payload.id ? action.payload : contact
				)
			};

		case 'delete_contact':

			return {
				...store,
				contacts: store.contacts.filter(contact => contact.id !== action.payload)
			};

		default:
			throw Error('Unknown action.');
	};
};
