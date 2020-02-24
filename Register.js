'use strict';
const e = React.createElement;

const AppNav = () => (
    <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">My Blog Space</a>
        <a role="button" className="btn btn-outline-info navbar-btn" href="/logout">Logout</a>
    </nav>
)

function Register(props) {
    return (
        <div>
            <AppNav />
            <form>
                <div class="card mt-4" Style="width: 100%;">
                    <label>{props.label}</label>
                    <input
                        required
                        name={props.name}
                        type={props.type}
                        value={props.value}
                    />
                </div>

                <button type="submit" 
                        class="btn btn-primary">
                            Register
                </button>
            </form>
        </div>
    )
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Register), domContainer);
