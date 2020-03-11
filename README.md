Redux

context of table
全局store，
Component，
action，
连接action和Component
reducer(改变全局state),
触发render

第一步：
在index.js外面创建全局store， 并且把下面的组件用context的方式传下去
·import { Provider } from 'react-redux';·
·import { createStore } from 'redux';·

//rootReducer是来定位存放reducer里面index.js的位置
·import rootReducer from './reducers';·

//初始化store
```jsx
let initialStore = {};
```

//定义store
```jsx
const store = createStore(rootReducer, initialStore);
```

```jsx
ReactDOM.render(<Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
```

第二步：
在component里面

//引用
```jsx
import { connect } from "react-redux";
import { changeUserName, toggleStatus } from "./actions";
```

//把全局state转化成Props
``` jsx
function mapStateToProps (state) {
    const {todo} = state;
    return {
        todoList: todo.todoList,
        filter: todo.filter,
    };
}
```

···
把action转化成props
```jsx
const mapDispatchToProps = {
    updateTodo,
    deleteTodo,
    toggleAll,
    updateShowClear,
    updateRemainingItems,
};
```

```jsx
export default connect(mapStateToProps, mapDispatchToProps)(Main);
```

第三步
在action里面

index.js

export * from './你创建的对象的action

todo.js

//定义常量， 可以再reducer里面引用， 不会因为typo而出错， 记得要export常量
```jsx
export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
```
```jsx
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
```

第四步

在reducer里
index.js
//引用
```jsx
import { combineReducers } from "redux";
import todo from "./todo";

export default combineReducers({
    todo,
    //把所有要用的reducer扔到combineReducers里面来
});
```

todo.js
//引用常量 - 在action里面定义的！
```jsx
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

//初始化state

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
```
```jsx
export const todo = (state = initialState, action) => {
    //console.log(action);
    switch (action.type) {
        case ADD_TODO :
            return {
            	//数组里添加对象
                ...state,
                todoList: [...state.todoList, action.todo]
            };
        case UPDATE_TODO :
            return {
            	//数组里的对象做修改， 一定要做深拷贝，才能出发render，不然state在内存里的地址没变是不起作用的
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
            	//数组里的删除，个人觉得用filter比较方便
            	//参考网址： https://cn.redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html
                ...state,
                todoList: state.todoList.filter(t => t.id !== action.todoId),
            };
        case TOGGLE_ALL :
            return {
            	//更新数组中所有对象的某一个值！
            	//用map最方便，因为map会返回一个全新的数组
            	//更新时用箭头函数也得返回一个相对应的对象
            	//正确的使用层级嵌套更新，每一层嵌套都很烦，所以建议state保持扁平化状态
                ...state,
                todoList: state.todoList.map(t => {
                    t.isCompleted = action.checked;
                    return t;
                })
            };
        case UPDATE_SHOW_CLEAR :
            return {
            	//对state里面的单个属性update
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
```
最后一步， 返回component

导入action
```jsx
import { updateTodo, deleteTodo, toggleAll, updateShowClear, updateRemainingItems } from '../actions';
```

把action放到mapDispatchToProps
```jsx
const mapDispatchToProps = {
    updateTodo,
    deleteTodo,
    toggleAll,
    updateShowClear,
    updateRemainingItems,
};
```
把需要用的state放到props里面
```jsx
function mapStateToProps (state) {
    const {todo} = state;
    //console.log('_______________________',todo);
    return {
        todoList: todo.todoList,
        filter: todo.filter,
    };
}
```

在需要用的地方解构
```jsx
const { todoList, filter } = this.props;
```

在事件函数里面调用action
```jsx
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
```
最后调试！
调试中可以在不同的地方打印state，action，

eg
在component中的mapStateToProps里面打印state

在action里面打印从component传入的值或对象

在reducer中打印action

整一套验证下来基本能解决传值的问题。

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
