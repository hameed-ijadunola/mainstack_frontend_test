import { Redirect, Route, Switch } from 'react-router-dom';

import 'assets/scss/theme.scss';

import MainLayout from 'layouts/dashboard/MainLayout';
import Dashboard from 'pages/dashboard/Dashboard';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props}></Component>
      </Layout>
    )}
  ></Route>
);

function AllRoutes() {
  return (
    <Switch>
      <AppRoute exact path="/" layout={MainLayout} component={Dashboard} />

      <Redirect to="/" />
    </Switch>
  );
}

export default AllRoutes;
