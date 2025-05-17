import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAppDispatch, useAppSelector } from "./hooks";
import Snackbar from "./components/Snackbar";
import { useEffect } from "react";
import { hideSnackbar, snackbarData } from "./lib/redux/features/snackbarSlice";
import PrivateRoute from "./components/PrivateRoute";
import { selectConfirmationModalBox } from "./lib/redux/features/modalBoxSlice";
import ConfirmationModalBox from "./components/ConfirmationModalBox";

const App = () => {
  const snackbar = useAppSelector(snackbarData);
  const dispatch = useAppDispatch();
  const confirmationModalBox = useAppSelector(selectConfirmationModalBox);

  useEffect(() => {
    let snackbarTimeout = null;
    if (snackbar.show) {
      snackbarTimeout = setTimeout(() => {
        dispatch(hideSnackbar())
      }, 3000)
    }

    return () => {
      if (snackbarTimeout) {
        clearTimeout(snackbarTimeout)
      }
    }
  }, [dispatch, snackbar.show])

  useEffect(() => {
    if (confirmationModalBox.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [confirmationModalBox.show])

  return (
    <>
      {snackbar.show && (
        <Snackbar
          type={snackbar.type}
          message={snackbar.message}
        />
      )}

      {confirmationModalBox.show && (
        <ConfirmationModalBox
          title={confirmationModalBox.title}
          description={confirmationModalBox.description}
          onCancel={confirmationModalBox.onCancel}
          onConfirm={confirmationModalBox.onConfirm}
          isLoading={confirmationModalBox.isLoading}
        />
      )}

      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute
            path={"/"}
            component={Home}
          />
        </Switch>
      </Router>
    </>
  )
}

export default App
