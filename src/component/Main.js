import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateTodo, deleteTodo, toggleAll, updateShowClear, updateRemainingItems } from '../actions';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editingId : -1,
            toggleAll : false,
        };
    }

    convertClassName = (obj) => {
        let classNameStr = '';
        for (let key in obj) {
            if (obj[key]) {
                classNameStr += key + ' ';
            }
        }
        return classNameStr;
    };

    //Ticked
    checkBoxHandler = (e, todo) => {
        const { updateTodo } = this.props;
        todo.isCompleted = e.target.checked;
        updateTodo({
            todo: todo,
        });
        this.calculateRemainingItems();
    };

    //删除TODO Ticked
    deleteTodo = (todoId) => {
        const { deleteTodo } = this.props;
        //删除元素
        deleteTodo({
            todoId: todoId,
        });
        //更新驶入
        this.calculateRemainingItems();
    };

    //Ticked
    startEditing (todo) {
        this.setState({
            editingId: todo.id,
        }, () => {
            //让编辑框获取焦点
            this[`todo_${todo.id}`].focus();
        });
    }

    //Ticked
    endEditing = (e, todo) => {
        e.preventDefault();
        this.setState({
            editingId : -1,
        })
    };

    //Ticked
    valueHandler = (e, todo) => {
        const { updateTodo } = this.props;
        todo.content = e.target.value;
        updateTodo({
            todo: todo,
        });
        this.setState({
            isEditing: true,
        });
    };

    changeToggleAll = (e) => {
        const { checked } = e.target;
        const { toggleAll } = this.props;

        //遍历数组，把全部CheckBox改为统一
        toggleAll({
            checked: checked,
        });

        //视图更新
        this.setState({
            toggleAll: checked,
        });
        this.calculateRemainingItems();
    };

    calculateRemainingItems = () => {
        let num = 0;
        let isToggleAll = true;
        let showClear = false;
        const { todoList, updateShowClear, updateRemainingItems } = this.props;
        todoList.forEach( todo => {
            if (!todo.isCompleted) {
                num++;
                //根据当前状态来决定toggleAll的状态
                //逻辑：当找到一个false的isCompleted， 那么ToggleAll就是false
                isToggleAll = false;
            } else {
                showClear = true;
            }
        });
        this.setState({
            toggleAll: isToggleAll,
        });
        updateShowClear({
            showClear: showClear,
        });
        updateRemainingItems({
            remainingItems: num,
        });
    };



    renderTodoList () {
        const { editingId } = this.state;
        const { todoList, filter } = this.props;
        return todoList.map((todo => {
            // 如果是Active 过滤掉数组中 isCompleted:true
            // 如果是Completed 过滤掉数组中 isCompleted:false
            if (filter === 'Active' && todo.isCompleted) return null;
            if (filter === 'Completed' && !todo.isCompleted) return null;
            return (
                <li key={todo.id}
                    className={this.convertClassName({
                        completed: todo.isCompleted,
                        editing: editingId === todo.id,
                    })}>
                    <div className="view">
                        <input className="toggle"
                               type="checkbox"
                               checked={todo.isCompleted}
                               onChange={e=>this.checkBoxHandler(e, todo)}/>
                        <label onDoubleClick={e=>this.startEditing(todo)}>{todo.content}</label>
                        <button className="destroy" onClick={e => this.deleteTodo(todo.id)}/>
                    </div>
                    <form onSubmit={e => this.endEditing(e,todo)}>
                        <input className="edit"
                               value={todo.content}
                               ref={input => this[`todo_${todo.id}`] = input}
                               onBlur={e => this.endEditing(e,todo)}
                               onChange={e => this.valueHandler(e, todo)}/>
                    </form>
                </li>
            );
        }));
    }

    componentDidMount() {
        this.calculateRemainingItems();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.todoList.length !== this.props.todoList.length) {
            this.calculateRemainingItems();
        }
    }

    render() {
        return (
            <React.Fragment>
                <input id="toggle-all"
                       className="toggle-all"
                       type="checkbox"
                       onChange={e => this.changeToggleAll(e)}
                       checked={this.state.toggleAll}
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list">
                    {/* These are here just to show the structure of the list items */}
                    {/* List items should get the class `editing` when editing and `completed` when marked as completed */}

                    {this.renderTodoList()}


                </ul>
            </React.Fragment>
        );
    }
}

function mapStateToProps (state) {
    const {todo} = state;
    //console.log('_______________________',todo);
    return {
        todoList: todo.todoList,
        filter: todo.filter,
    };
}

const mapDispatchToProps = {
    updateTodo,
    deleteTodo,
    toggleAll,
    updateShowClear,
    updateRemainingItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);