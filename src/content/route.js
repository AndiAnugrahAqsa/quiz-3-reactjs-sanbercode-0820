import React from "react"
import logo from '../img/logo.png';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./home";
import About from "./about";
import Login from "./login";
import MovieListEditor from "./movieListEditor";


const Routes = () => {
    return (
        <>

            <Router>
                <div>
                    <header>
                        <img id="logo" src={logo} width="200px" />
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li id="movie-list" className="movie-editor">
                                    <Link to="/movieListEditor">Movie List Editor</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </ul>
                        </nav>

                    </header>
                    <Switch>

                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/movieListEditor">
                            <MovieListEditor />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>

                    </Switch>
                </div>
            </Router>

        </>
    )
}

export default Routes