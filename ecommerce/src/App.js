import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CartContainer from './components/CartContainer';
import ProductDetail from './components/ProductDetail';
import SearchedProductContainer from './components/SearchProduct';
import AboutContainer from './container/AboutContainer';
import CheckoutContainer from './container/CheckoutContainer';
import ContactContainer from './container/ContactContainer';
import HomeContainer from './container/HomeContainer';
import ResetContainer from './container/ResetContainer';
import {isUserLoggedIn, updateCart } from './redux/store';

function App() {

  const dispatch = useDispatch();
  
  const auth = useSelector(state=>state.auth);
 
  useEffect(()=>{
    if(!auth.authenticate){
     dispatch(isUserLoggedIn());
    }
    dispatch(updateCart())
    },[auth.authenticate]);

  

  return (
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route path= "/search" component={SearchedProductContainer} />
      <Route path="/cart" component={CartContainer} />
      <Route path="/AboutUs" component={AboutContainer} />
      <Route path="/ContactUs" component={ContactContainer} />
      <Route path="/Checkout" component={CheckoutContainer} />
      <Route exact path="/reset" component={ResetContainer} />
      <Route path ="/:productName/:id" component={ProductDetail} />
    </Switch>
  );
}

export default App;
