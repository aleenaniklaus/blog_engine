const e = React.createElement;

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