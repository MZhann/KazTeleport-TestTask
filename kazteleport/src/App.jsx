import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Favorites from "./pages/favorites/Favorites";
import PhotoPage from "./pages/photo-page/Photo";
import Navbar from "./components/header/Navbar";
import Search from "./components/search-section/Search";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/photo" element={<PhotoPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
