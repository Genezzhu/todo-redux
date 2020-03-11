export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_ALL = "TOGGLE_ALL";
export const UPDATE_SHOW_CLEAR = "UPDATE_SHOW_CLEAR";
export const UPDATE_REMAINING_ITEMS = "UPDATE_REMAINING_ITEMS";
export const CLEAR_COMPLETED = "CLEAR_COMPLETED";
export const UPDATE_FILTER = "UPDATE_FILTER";

export function addTodo ({todo}) {
    return {
        type: ADD_TODO,
        todo,
    };
}

export function updateTodo ({todo}) {
    return {
        type: UPDATE_TODO,
        todo,
    };
}

export function deleteTodo ({todoId}) {
    return {
        type: DELETE_TODO,
        todoId,
    };
}

export function toggleAll ({checked}) {
    return {
        type: TOGGLE_ALL,
        checked
    };
}

export function updateShowClear ({showClear}) {
    return {
        type: UPDATE_SHOW_CLEAR,
        showClear,
    };
}

export function updateRemainingItems ({remainingItems}) {
    return {
        type: UPDATE_REMAINING_ITEMS,
        remainingItems,
    };
}

export function clearCompleted () {
    return {
        type: CLEAR_COMPLETED,
    };
}

export function updateFilter ({filter}) {
    return {
        type: UPDATE_FILTER,
        filter,
    };
}