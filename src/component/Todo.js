import React, {Component} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

class Todo extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="todoapp" >
                    <Header />
                    {/* This section should be hidden by default and shown when there are todos */}
                    <section className="main" >
                        <Main />
                    </section>
                    {/* This footer should hidden by default and shown when there are todos */}
                    <footer className="footer">
                        <Footer />
                    </footer>
                </section>
                <footer className="info">
                    <p>Double-click to edit a todo</p>
                    {/* Remove the below line ↓ */}
                    {/* Change this out with your name and url ↓ */}
                    <p>Created by <a href="/#">Gene Zhu</a></p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </footer>
            </React.Fragment>
        );
    }
}

export default Todo;