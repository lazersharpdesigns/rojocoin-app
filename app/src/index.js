import React from 'react';
import App from './App';
import * as ReactDom from 'react-dom/client';

const container = document.getElementById('root');

// Create a root.
const root = ReactDom.createRoot(container);

// Initial render
root.render(<App />);
