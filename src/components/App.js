import { AuthProvider } from '../context/AuthContext';
import Signup from './authentication/Signup';
import Login from './authentication/Login';
import Profile from './authentication/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Reset from './authentication/Reset';
import UpdateProfile from './authentication/UpdateProfile';
import Dashboard from './Dashboard';
import { Box } from '@chakra-ui/react';
import { Demo } from './drag-n-drop/file-drop';

function App() {
  return (
    <AuthProvider>
      <Box>
        <Router>
          <Switch>
            {/* User Auth */}
            <Route path="/signup">
              {' '}
              <Signup />{' '}
            </Route>
            <Route path="/login">
              {' '}
              <Login />{' '}
            </Route>
            <Route path="/reset-password">
              {' '}
              <Reset />{' '}
            </Route>
            {/* Profile */}
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            {/* Google Drive */}
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute
              exact
              path="/folder/:folderId"
              component={Dashboard}
            />
          </Switch>
        </Router>
      </Box>
      {/* <Demo /> */}
    </AuthProvider>
  );
}
export default App;
