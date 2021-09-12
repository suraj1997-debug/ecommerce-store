import {authConstants,cartConstants,userConstants} from './constants';
import axios from '../../components/helpers/axios';

export const loginUser = (email,password) =>{
    return async dispatch =>{
        // console.log(email,password);
        dispatch({
            type:authConstants.LOGIN_REQUEST
        })

        const res = await axios.post('/user/login',{
            email:email,
            password:password
        })
        console.log(res);
        if(res.status === 200){
            const token = res.data.token;
             const user = res.data.user;
            localStorage.setItem('token',token);
            localStorage.setItem('user',JSON.stringify(user));
            dispatch({
                type:authConstants.LOGIN_SUCCESS,
                payload:{
                    token,user
                }
            })
        }
        else{
            const err = res.data.error;
            dispatch({
                type:authConstants.LOGIN_FAILURE,
                payload:{
                    err
                }
            })
        }
    }
}


export const isUserLoggedIn=()=>{
    return async dispatch =>{
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type:authConstants.LOGIN_SUCCESS,
                payload:{
                    token,user
                }
            })
        }else{
            dispatch({
                type:authConstants.LOGIN_FAILURE,
                payload:{
                    error:'User Needs to login'
                }
            })
        }
    }
}

export const forgetPassword = (email) =>{
    return async dispatch =>{

        dispatch({
            type:authConstants.FORGETPASS_REQUEST
        })

        const res = await axios.post('/user/forget',{
            email:email
        });

        if(res.status === 201){
            
            const message = res.data.message;
            localStorage.setItem('resetToken',JSON.stringify(res.data.resetToken));
            dispatch({
                type:authConstants.FORGETPASS_SUCCESS,
                payload:{
                    message:message
                }
            })
        }
        else{
            if(res.status === 400){
                const error = res.data.error;
            dispatch({
                type:authConstants.FORGETPASS_FAILURE,
                error:error
            })
        }
        }
    }
}

export const resetPassword = (newPassword,ConfirmPassword) =>{
    return async dispatch =>{
        dispatch({
            type:authConstants.RESET_PASSWORD_REQUEST
        })
  
      let resetToken = JSON.parse(localStorage.getItem('resetToken'));
        const res = await axios.post(`/user/reset/${resetToken}`,{
            newPassword:newPassword,
            ConfirmPassword:ConfirmPassword
        });

        if(res.status === 201){
            localStorage.clear();
            const message = res.data.message;
           
            dispatch({
                type:authConstants.RESET_PASSWORD_SUCCESS,
                payload:{
                    message:message
                }
            })
        }
        else{
            if(res.status === 400){
                localStorage.clear();
                dispatch({
                    type:authConstants.RESET_PASSWORD_SUCCESS,
                    payload:{
                        message:'Problem in API'
                    }
                })
            }
            else{
                if(res.status === 404){
                    const error = res.data.error;
                    dispatch({
                        type:authConstants.RESET_PASSWORD_FAILURE,
                        payload:{
                            error:error
                        }
                    })
                }
            }
        }
      
    }
}

export const signupUser = (firstName,lastName,phone,email,address) =>{
    return async dispatch =>{
        // console.log(firstName,lastName,phone,email,password,address);
        dispatch({
            type:userConstants.SIGNUP_REQUEST
        })

        const res = await axios.post('/signup',{
            firstName:firstName,
            lastName:lastName,
            phone:phone,
            email:email,
            address:address
        })
        console.log(res);
        if(res.status === 201){
            const {
                firstName,
                lastName,
                phone,
                email,
                address
               } = res.data;

               let  userData = {
                firstName:firstName,
                lastName:lastName,
                phone:phone,
                email:email,
                address:address
               }
            dispatch({
                type:userConstants.SIGNUP_SUCCESS,
                payload:{
                    userData
                }
            })
        }
        else{
            const err = res.data.error;
            dispatch({
                type:userConstants.SIGNUP_FAILURE,
                payload:{
                    err
                }
            })
        }
    }
}

export const logoutUser = ()=>{
    return async dispatch =>{
        dispatch({ type: authConstants.LOGOUT_REQUEST });
        localStorage.clear();
        dispatch({ type: authConstants.LOGOUT_SUCCESS });
        dispatch({ type: cartConstants.RESET_CART }); 
}
}
        