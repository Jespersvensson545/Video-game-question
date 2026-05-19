import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>GameQuiz</h1>
            <ul>
                <li><Link to="/">Hem</Link></li>
                <li><Link to="/quiz">Quiz</Link></li>
                <li><Link to="/highscores">Highscores</Link></li>
            </ul>
        </nav>
    )
}


export default Navbar
