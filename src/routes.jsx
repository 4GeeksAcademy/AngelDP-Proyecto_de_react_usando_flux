// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";


import { Agendas } from "./pages/Agendas";
import { EditContact } from "./pages/EditContacts";
import { AddContact } from "./pages/AddContact";
import { CreateAgenda } from "./pages/CreateAgenda";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <>
      <Route path="/" element={<Agendas />} />
      <Route path="/edit/:id" element={<EditContact />} />
      <Route path="/add" element={<AddContact />} />
      <Route path="/create-agenda" element={<CreateAgenda />} />
    </>
  )
);