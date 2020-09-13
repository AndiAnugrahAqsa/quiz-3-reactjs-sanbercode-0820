import React from "react"


const Login = () => {

    const validation = (event) => {
        event.preventDefault()
        var username = event.target.username.value
        var password = event.target.password.value
        if (username === "admin" && password === "admin") {
            var element = document.getElementById("movie-list")
            element.classList.remove("movie-editor")
        }
        else {
            alert("Maaf username dan password tidak valid")
        }
    }

    return (
        <section>
            <form style={{ textAlign: "center" }} onSubmit={validation}>
                <strong>Username: </strong>
                <input name="username" type="text" /><br />
                <strong>Password: </strong>
                <input name="password" type="password" /><br />
                <button>Login</button><br />
            </form>
        </section>
    )
}

export default Login