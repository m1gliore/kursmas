import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import styled from "styled-components";
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MovieInfo from "./pages/MovieInfo";
import Profile from "./pages/Profile";

const Wrapper = styled.div`
  overflow-x: hidden;
`

const App = () => {
    return (
        <Wrapper>
            <Router>
                <Navbar/>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/movies/:movieId" element={<MovieInfo/>}/>
                    <Route path="/profile/:userId" element={<Profile/>}/>
                </Routes>
                <Footer/>
            </Router>
        </Wrapper>
    )
}

export default App
