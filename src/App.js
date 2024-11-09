import React from 'react';
import "./css/default.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defaultAxiosSettings } from './config/globals.js';
import AppRoutes from './utilis/AppRoutes.jsx';

const queryClient = new QueryClient()
defaultAxiosSettings();

function App() {
    return (
        <QueryClientProvider client = {queryClient}> 
            <AppRoutes />
        </QueryClientProvider>
    );
}

export default App;
