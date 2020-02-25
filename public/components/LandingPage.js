'use strict'

const AppNav = () => (
    <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">My Blog Space</a>
        <a role="button" class="btn btn-outline-info navbar-btn" href="/login">Login</a>
    </nav>
 ) 

class LandingPage extends React.Component{
    constructor(){
        super()
        this.state = {
            allBlogs: []
        }
    }

    componentDidMount() {
       
    }

    // getBlogs = async () => {
    //     const response = await fetch('/blogs');
    //     const data = await response.json();
    //     data.forEach(item => item.editMode = false);
    //     this.setState({ data })
    // }

    render(){
        return(
            <AppNav />
        )
    }
    
}

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(LandingPage), domContainer);