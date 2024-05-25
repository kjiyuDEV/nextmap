import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    return <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} />;
};

export default Toast;
