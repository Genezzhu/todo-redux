import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import store from "./store/store";
import Todo from "./component/Todo";

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
          <Todo />
      </Provider>
    </React.Fragment>
  );
}

export default App;
