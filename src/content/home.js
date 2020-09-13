import React from "react"
import axios from "axios"





class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            film: []
        }
    }

    componentDidMount = () => {

        axios.get(`http://backendexample.sanbercloud.com/api/movies`)
            .then(res => {
                const film = res.data
                this.state.film = film
                this.setState({ film: res.data })

            })
    }

    render() {

        return (
            <>
                <section>
                    <h1>Daftar Film Film Terbaik</h1>
                    {this.state.film.map((item) => {
                        return (
                            <div>
                                <h3>{item.title}</h3>
                                <div style={{ display: "flex" }}>
                                    <img src={item.image_url} width="500" height="250" />
                                    <div className="properti-film">
                                        <h3>Rating {item.rating}</h3>
                                        <h3>Durasi: {item.duration}</h3>
                                        <h3>Genre: {item.genre}</h3>
                                    </div>
                                </div>
                                <p><span>Deskripsi</span> : {item.description}</p>
                                <hr />
                            </div>
                        )
                    })}

                </section>
                <footer>
                    <h5>copyright &copy; 2020 by Sanbercode</h5>
                </footer>
            </>
        )
    }
}



export default Home