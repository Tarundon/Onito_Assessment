import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Form from './components/Form';
import UserDataTable from './components/Table';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Form/>,
  },
  {
    path: "/userData",
    element: <UserDataTable/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



