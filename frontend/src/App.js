import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './container/Dashboard';
import ProductContainer from './container/ProductContainer';
import ForgetPassContainer from './container/forgetPassword';
import PrivateRoute from './container/HOC/index';
import LoginContainer from './container/Login';
import ResetPasswordContainer from './container/ResetPassword';
import { isUserLoggedIn } from './redux/store';

function App() {

  const dispatch = useDispatch();

  const auth = useSelector(state=>state.auth);

  useEffect(()=>{
    if(!auth.authenticate){
     dispatch(isUserLoggedIn());
    }
    },[auth.authenticate]);

  return (
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/Product" component={ProductContainer} />
      <Route path="/forget" component={ForgetPassContainer} />
      <Route  path="/login" component={LoginContainer}/>
      <Route path="/reset" component={ResetPasswordContainer} />
    </Switch>
  );
}

export default App;
