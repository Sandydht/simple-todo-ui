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
import { hideSnackbar } from "./lib/redux/features/snackbarSlice";

const App = () => {
  const snackbarData = useAppSelector((state) => state.snackbar);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let snackbarTimeout = null;
    if (snackbarData.show) {
      snackbarTimeout = setTimeout(() => {
        dispatch(hideSnackbar())
      }, 3000)
    }

    return () => {
      if (snackbarTimeout) {
        clearTimeout(snackbarTimeout)
      }
    }
  }, [dispatch, snackbarData.show])

  return (
    <>
      {snackbarData.show && (
        <Snackbar
          type={snackbarData.type}
          message={snackbarData.message}
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
