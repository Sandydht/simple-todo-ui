import { Redirect, Route, type RouteProps } from "react-router-dom";
import { getDataFromLocalStorage } from "../lib/crypto-js";

interface PrivateRouteProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const accessToken = getDataFromLocalStorage('access_token');

  return (
    <Route
      {...rest}
      render={(props) => {
        return accessToken ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/login"} />
        );
      }}
    />
  )
}

export default PrivateRoute
