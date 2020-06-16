import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import Taskboard from "./../Taskboard";
import theme from "./../../commons/Theme";
import { Provider } from "react-redux";
import configureStore from "../../redux/configureStore";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import GlobalLoading from './../../component/GlobalLoading/index'
import ModalTodo from "../../component/Modal";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <GlobalLoading/>
          <ModalTodo/>
          <Taskboard />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
