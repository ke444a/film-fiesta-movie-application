import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Movie from "./pages/Movie";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
    return (
        <div className="wrapper">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/movie/:movieId" element={<Movie />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;