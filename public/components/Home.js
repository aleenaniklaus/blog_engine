const e = React.createElement;
// import AppNav from "./AppNav"

const AppNav = () => (
   <nav class="navbar navbar-dark bg-dark">
       <a class="navbar-brand" href="#">My Blog Space</a>
       <a role="button" class="btn btn-outline-info navbar-btn" href="/login">Login</a>
   </nav>
) 

function Home(){
    return (
        <div>
            <AppNav />
            <div class="card mt-4" Style="width: 100%;">
                <div class="card-body">Please login to see your posts.</div>
            </div>
        </div>
    )
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Home), domContainer);