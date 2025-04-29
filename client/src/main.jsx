import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AuthProvider from './context/AuthContext.jsx';
import { Provider } from 'react-redux';  
import store from './store/store.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
        <ToastContainer position="top-right" autoClose={1000} />
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
