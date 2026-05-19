import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Quiz from "./pages/Quiz"
import Highscores from "./pages/Highscores"
import "./styles/main.scss"

function app() {
    return(
        <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/highscores" element={<Highscores />} />
             </Routes>

        </BrowserRouter>
    )

}

export default App 
