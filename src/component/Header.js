import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addTodo } from "../actions"

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue : '',
        };
    }

    valueHandler = (e) => {
        this.setState({
            inputValue : e.target.value,
        });
    };

    addTodo = (e) => {
        e.preventDefault();
        const {inputValue} = this.state;
        if (inputValue.trim() === '') {
        } else {
            let { todoList, addTodo } = this.props;
            let maxId = -1;
            todoList.forEach((todo) => {
                if (todo.id > maxId) {
                    maxId = todo.id
                }
            });
            maxId++;
            const todo = {
                id: maxId,
                isCompleted: false,
                content: inputValue,
            };
            addTodo({
                todo: todo,
            });
            this.setState({
                inputValue : '',
            })
        }
    };

    render() {
        const { inputValue } = this.state;
        return (
            <header className="header">
                <h1>Todo-List</h1>
                <form onSubmit={this.addTodo}>
                    <input className="new-todo"
                           placeholder="What needs to be done?"
                           autoFocus
                           value={inputValue}
                           onChange={this.valueHandler}
                           onBlur={this.addTodo}
                    />
                </form>
            </header>
        );
    }
}

function mapStateToProps (state) {
    const {todo} = state;
    return {
        todoList: todo.todoList,
    };
}

const mapDispatchToProps = {
    addTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);