import {cartConstants} from '../action/constants';
import axios from '../../components/helpers/axios';
import store from '../store/store';


 const getCartItems = () =>{
    return async dispatch =>{
        try{
        dispatch({
            type:cartConstants.ADD_TO_CART_REQUEST
        })

        const res = await axios.get('/user/cart/getCartItems');

        if(res.status === 200){
            const cartItems = res.data.cartItems;
            if (cartItems) {
            dispatch({
                type:cartConstants.ADD_TO_CART_SUCCESS,
                payload:{ cartItems }
            })
        }
        }
    }
    catch(error){
        console.log(error);
    }
}
}

export const addToCart = (product, newQty = 1) => {
    return async (dispatch) => {
      const {
        cart: { cartItems },
        auth,
      } = store.getState();

      const qty = cartItems[product._id]
        ? parseInt(cartItems[product._id].qty + newQty)
        : 1;
      cartItems[product._id] = {
        ...product,
        qty,
      };
  
      if (auth.authenticate) {
        dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
        const payload = {
          // cartItems: Object.keys(cartItems).map((key, index) => {
          //     return {
          //         quantity: cartItems[key].qty,
          //         product: cartItems[key]._id
          //     }
          // })
          cartItems: [
            {
              product: product._id,
              quantity: qty,
            },
          ],
        };
        // console.log(payload);
        const res = await axios.post(`/user/cart/add-to-cart`, payload);
        // console.log(res);
        if (res.status === 201) {
          dispatch(getCartItems());
        }
      } else {
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
  
      console.log("addToCart::", cartItems);
  
      dispatch({
        type: cartConstants.ADD_TO_CART_SUCCESS,
        payload: { cartItems },
      });
    };
  };
  
  
export const updateCart = () => {
  return async (dispatch) => {
    const { auth } = store.getState();
    let cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;



    if (auth.authenticate) {
      localStorage.removeItem("cart");
      //dispatch(getCartItems());
      if (cartItems) {
        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              product: cartItems[key]._id,
              quantity: cartItems[key].qty,
            };
          }),
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await axios.post(`/user/cart/add-to-cart`, payload);
          if (res.status === 201) {
            dispatch(getCartItems());
          }
        }
      } else {
        dispatch(getCartItems());
      }
    } else {
      if (cartItems) {
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
      }
    }
  };
};

export const removeCartItems = (payload) =>{
  return async dispatch =>{
    try {
      dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
      const res = await axios.post(`/user/cart/removeCartItems`, { payload });
      if (res.status === 202) {
        dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: cartConstants.REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { getCartItems };