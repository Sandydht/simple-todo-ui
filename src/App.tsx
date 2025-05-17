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

const App = () => {
  const snackbar = useAppSelector(snackbarData);
  const dispatch = useAppDispatch();

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

  return (
    <>
      {snackbar.show && (
        <Snackbar
          type={snackbar.type}
          message={snackbar.message}
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
