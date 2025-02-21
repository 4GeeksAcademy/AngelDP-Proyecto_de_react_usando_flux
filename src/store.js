export const initialStore = () => {
  return {
    contacts: [
      {
        id: 1, name: "Angel Ponte", address: "Madrid", phone: "610-98-84-96", email: "angeld0606@gmail.com"
      },
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {

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
  }
}
