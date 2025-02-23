const getContacts = async () => {

    const response = await fetch("https://playground.4geeks.com/contact/agendas");
    if (!response.ok) {
        throw new Error("Error al obtener los contactos");
    }
    
    return await response.json();
    
};

export default getContacts;