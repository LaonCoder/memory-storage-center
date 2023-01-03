import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Detail from './routes/Detail';
import Navigation from './components/Navigation';

function App() {
    return ( 
        <BrowserRouter>
             <Navigation />
            <Routes>
                <Route path="/" exact={true} element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/movie/:id" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;