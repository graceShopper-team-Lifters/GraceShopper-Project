import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '../app/store';
import App from '../app/App';
import { BrowserRouter as Router } from 'react-router-dom';

export default function Attitude() {
    return (
        <h1>Attitude</h1>
    );
}
