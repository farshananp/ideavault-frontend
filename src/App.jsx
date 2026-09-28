import React from 'react';

import {
    Routes,
    Route
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Dashboard from './pages/Dashboard';
import Ideas from './pages/Ideas';
import AddIdea from './pages/AddIdea';
import EditIdea from './pages/EditIdea';
import IdeaDetails from './pages/IdeaDetails';
import Important from './pages/Important';
import Pnf from './pages/Pnf';


function App() {

    return (

        <>

            <Header />

            <main>

                <Routes>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/ideas"
                        element={<Ideas />}
                    />

                    <Route
                        path="/add"
                        element={<AddIdea />}
                    />

                    <Route
                        path="/idea/:id"
                        element={<IdeaDetails />}
                    />

                    <Route
                        path="/edit/:id"
                        element={<EditIdea />}
                    />
<Route
    path="/important"
    element={<Important />}
/>

                    <Route
                        path="*"
                        element={<Pnf />}
                    />

                </Routes>

            </main>

            <Footer />

        </>

    );

}

export default App;