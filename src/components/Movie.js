import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";
import "./Movie.css"


const MOVIE_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cbbc36d22c2bd0bc43bc8cf209727f80&page=1"
const IMG_API = "https://image.tmdb.org/t/p/w1280"
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=cbbc36d22c2bd0bc43bc8cf209727f80&query="


const Movie = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        axios.get(MOVIE_API)
            .then(res => {
                console.log(res.data)

                setMovies(res.data.results)

            }).catch(err => {

            console.log(err)
        })

    }, [])


    const moviesList = movies.map(({id, poster_path, title, vote_average}) => {

        return <div className={"col-xs-6, col-md-2"} key={id}>

            <img src={IMG_API + poster_path} alt="meal" className={"img-fluid"}/>

            <div className="movie-info">
                <p>{title}</p>
                <p>rating: {vote_average}</p>
            </div>
        </div>
    })

    const handleOnSubmit = (e) => {
        e.preventDefault()

        axios.get(SEARCH_API + searchTerm)
            .then(res => {
                console.log(res.data)

                setMovies(res.data.results)

            }).catch(err => {

            console.log(err)
        })

    }


    const handleOnChange = (e) => {
        setSearchTerm(e.target.value)
    }



    return (
        <div>

            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#"><h3 id={"heading"}>Frenetiks</h3></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>
                    <Form inline onSubmit={handleOnSubmit} className="d-flex"  >
                        <FormControl
                            type="search"
                            placeholder="Search..."
                            className="mr-sm-2"
                            value={searchTerm}
                            onChange={handleOnChange}
                        />
                        <Button variant="outline-info"  onClick={handleOnSubmit} >Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>

            <div className="container">
                <div className="row justify-content-center">
                    {moviesList}
                </div>
            </div>
        </div>
    );
};


export default Movie;
