import {
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    TOGGLE_ALL,
    UPDATE_SHOW_CLEAR,
    UPDATE_REMAINING_ITEMS,
    CLEAR_COMPLETED,
    UPDATE_FILTER,
} from "../actions";

const initialState = {
    todoList : [
        {id: 1, isCompleted: true, content: '吃饭'},
        {id: 2, isCompleted: false, content: '睡觉'},
        {id: 3, isCompleted: true, content: '打豆豆'},
    ],
    filter : 'All',
    remainingItems : 0,
    showClearButton : false,
};

export const todo = (state = initialState, action) => {
    //console.log(action);
    switch (action.type) {
        case ADD_TODO :
            return {
                ...state,
                todoList: [...state.todoList, action.todo]
            };
        case UPDATE_TODO :
            return {
                ...state,
                todoList: state.todoList.map((t) => {
                    if (t.id !== action.todo.id) {
                        return t;
                    }
                    return {
                        ...t,
                        ...action.todo,
                    }
                }),
            };
        case DELETE_TODO :
            return {
                ...state,
                todoList: state.todoList.filter(t => t.id !== action.todoId),
            };
        case TOGGLE_ALL :
            return {
                ...state,
                todoList: state.todoList.map(t => {
                    t.isCompleted = action.checked;
                    return t;
                })
            };
        case UPDATE_SHOW_CLEAR :
            return {
                ...state,
                showClearButton: action.showClear,
            };
        case UPDATE_REMAINING_ITEMS :
            return {
                ...state,
                remainingItems: action.remainingItems,
            };
        case CLEAR_COMPLETED :
            return {
                ...state,
                todoList: state.todoList.filter(t => t.isCompleted === false),
            };
        case UPDATE_FILTER :
            return {
                ...state,
                filter: action.filter,
            };
        default :
            return state;
    }
};

export default todo;