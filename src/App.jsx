import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import styled from "styled-components";
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MovieInfo from "./pages/MovieInfo";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import {useEffect, useState} from "react";
import {useLocalStorage} from "react-use";
import jwtDecode from "jwt-decode";
import CinemaRooms from "./pages/CinemaRooms";
import Seances from "./pages/Seances";
import Tickets from "./pages/Tickets";

const Wrapper = styled.div`
  overflow-x: hidden;
`

const App = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [user,] = useLocalStorage("user")

    useEffect(() => {
        if (user) {
            setIsAdmin(jwtDecode(user?.token).ADMIN)
        }
    }, [user])

    return (
        <Wrapper>
            <Router>
                <Navbar/>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/movies/:movieId" element={<MovieInfo/>}/>
                    <Route path="/cinema-rooms" element={<CinemaRooms/>}/>
                    <Route path="/seances" element={<Seances/>}/>
                    <Route path="/tickets" element={<Tickets/>}/>
                    {isAdmin
                        ? <Route path="/user/profile/:userId" element={<AdminPanel/>}/>
                        : <Route path="/user/profile/:userId" element={<Profile/>}/>}
                    <Route exact path="*" element={<NotFound/>}/>
                </Routes>
                <Footer/>
            </Router>
        </Wrapper>
    )
}

export default App
