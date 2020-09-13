import React, { useState, useEffect } from "react"
import axios from "axios"


const MovieListEditor = () => {

    const [film, setFilm] = useState(null)
    const [input, setInput] = useState({ title: "", description: "", year: 2020, duration: 120, genre: "", rating: 0, url: "", id: null })

    useEffect(() => {
        axios
            .get(`http://backendexample.sanbercloud.com/api/movies`)
            .then(res => {
                setFilm(res.data)
            })
    }, [film])

    const editInput = (event) => {
        var name = event.target.name
        var value = event.target.value
        switch (name) {
            case "title": {
                setInput({ ...input, title: value })
                break;
            }
            case "description": {
                setInput({ ...input, description: value })
                break;
            }
            case "year": {
                setInput({ ...input, year: value })
                break;
            }
            case "duration": {
                setInput({ ...input, duration: value })
                break;
            }
            case "genre": {
                setInput({ ...input, genre: value })
                break;
            }
            case "rating": {
                setInput({ ...input, rating: value })
                break;
            }
            case "url": {
                setInput({ ...input, url: value })
                break;
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (input.id === null) {
            axios.
                post(`http://backendexample.sanbercloud.com/api/movies`, {
                    title: input.title,
                    description: input.description,
                    year: input.year,
                    duration: input.duration,
                    genre: input.genre,
                    rating: input.rating,
                    image_url: input.url
                })
                .then(res => {
                    var data = res.data
                    setFilm([...film, {
                        id: data.id,
                        title: data.title,
                        description: data.description,
                        year: data.year,
                        duration: data.duration,
                        genre: data.genre,
                        rating: data.rating,
                        image_url: data.url
                    }])
                    setInput({ ...input, title: "", description: "", year: 2020, duration: 120, genre: "", rating: 0, url: "" })
                })
        }
        else {
            axios.put(`http://backendexample.sanbercloud.com/api/movies/${input.id}`)
                .then(res => {
                    var newFilm = film.map(x => {
                        if (x.id === input.id) {
                            x.title = input.title
                            x.description = input.description
                            x.year = input.year
                            x.duration = input.duration
                            x.genre = input.genre
                            x.rating = input.rating
                            x.image_url = input.url
                        }
                        return x
                    })
                    setFilm(newFilm)
                    setInput({ ...input, title: "", description: "", year: 2020, duration: 120, genre: "", rating: 0, url: "" })
                })
        }
    }

    const editFilm = (event) => {
        var idFilm = parseInt(event.target.value)
        var dataFilm = film.find(x => x.id === idFilm)
        setInput({ id: idFilm, title: dataFilm.title, description: dataFilm.description, year: dataFilm.year, duration: dataFilm.duration, genre: dataFilm.genre, rating: dataFilm.rating, url: dataFilm.image_url })
    }

    const deleteFilm = (event) => {

        var idFilm = parseInt(event.target.value)
        axios.delete(`http://backendexample.sanbercloud.com/api/movies/${idFilm}`)
            .then(res => {
                var newFilm = film.filter(x => x.id !== idFilm)
                setFilm(newFilm)
            })
    }

    const searching = (event) => {
        event.preventDefault()
        // Declare variables
        var input, filter, td, tr, p, i, txtValue;
        input = document.getElementById('myInput');
        filter = input.value.toUpperCase();
        td = document.querySelectorAll(".myTD");
        tr = document.querySelectorAll(".tr-list");

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < td.length; i++) {
            p = td[i].getElementsByTagName("p")[0];
            txtValue = p.textContent || p.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }


    return (
        <section>
            <div style={{ paddingRight: 150, paddingLeft: 150 }}>
                <form style={{ textAlign: "center" }} onSubmit={searching}>
                    <input id="myInput" type="text" />
                    <button>search</button>
                </form><br />
                <table>
                    <tr style={{ borderBottom: 1 }}>
                        <th>No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Year</th>
                        <th>Duration</th>
                        <th>Genre</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>

                    {film !== null && film.map((item, index) => {
                        return (
                            <>
                                <tr className="tr-list">
                                    <td>{index + 1}</td>
                                    <td className="myTD" style={{ width: 50 }}><p>{item.title}</p></td>
                                    <td style={{ width: 80 }}>{item.description.substr(0, 20) + " ..."}</td>
                                    <td>{item.year}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.rating}</td>
                                    <td>
                                        <button onClick={editFilm} value={item.id}>Edit</button><br />
                                        <button onClick={deleteFilm} value={item.id}>Delete</button>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </table>

                <h1>Movie Form</h1>
                <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                    <table>
                        <tr>
                            <td>
                                <strong>Title:</strong>
                            </td>
                            <td className="form-input">
                                <input type="text" name="title" value={input.title} onChange={editInput} required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Description:</strong>
                            </td>
                            <td className="form-input">
                                <textarea cols="20" rows="2" name="description" value={input.description} onChange={editInput} required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Year:</strong>
                            </td>
                            <td className="form-input">
                                <input type="number" style={{ width: 75 }} name="year" value={input.year} onChange={editInput} min="1980" max="2020" require />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Duration:</strong>
                            </td>
                            <td className="form-input">
                                <input type="number" name="duration" value={input.duration} onChange={editInput} required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Genre:</strong>
                            </td>
                            <td className="form-input">
                                <input type="text" name="genre" value={input.genre} onChange={editInput} required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Rating:</strong>
                            </td>
                            <td className="form-input">
                                <input type="number" name="rating" style={{ width: 60 }} value={input.rating} onChange={editInput} min="0" max="10" required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Image Url:</strong>
                            </td>
                            <td className="form-input">
                                <textarea cols="50" rows="3" name="url" value={input.url} onChange={editInput} required />
                            </td>
                        </tr>
                    </table>
                    <button>submit</button>
                </form>
            </div>
        </section>
    )
}


export default MovieListEditor