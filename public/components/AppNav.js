import React from "react"

function AppNav() {
    return (
        <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand" href="#">My Blog Space</a>
            <a role="button" class="btn btn-outline-info navbar-btn" href="/logout">Logout</a>
        </nav>
    )
}
export default AppNav