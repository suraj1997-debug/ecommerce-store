import {authConstants} from './constants';
import axios from '../../components/helpers/axios';

export const loginUser = (email,password) =>{
    return async dispatch =>{
        // console.log(email,password);
        dispatch({
            type:authConstants.LOGIN_REQUEST
        })

        const res = await axios.post('/admin/login',{
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
            
            const resetToken = res.data.resetToken;
            dispatch({
                type:authConstants.FORGETPASS_SUCCESS,
                payload:{
                        resetToken:resetToken
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

export const resetPassword = (resetToken,newPassword,ConfirmPassword) =>{
    return async dispatch =>{
        dispatch({
            type:authConstants.RESETPASS_REQUEST
        })
  
        console.log(resetToken);
        const res = await axios.post(`/user/reset/${resetToken}`,{
            newPassword:newPassword,
            ConfirmPassword:ConfirmPassword
        });

        if(res.status === 201){
            const message = res.data.message;
            const resetToken = res.data.resetToken;
            dispatch({
                type:authConstants.RESETPASS_SUCCESS,
                payload:{
                    message:message,
                    resetToken:resetToken
                }
            })
        }
        else{
            if(res.status === 400){
                const error = res.data.error;
                const resetToken = res.data.resetToken ?  res.data.resetToken : '';
                dispatch({
                    type:authConstants.RESETPASS_FAILURE,
                    payload:{
                        error:error,
                        resetToken:resetToken
                    }
                })
            }
        }
    }
}

// export const logoutUser = ()=>{
//     return async dispatch =>{
//         dispatch({
//             type:authConstant.LOGOUT_REQUEST
//         })
       
//             const res= await axios.post('/admin/signout');
//         if(res.status === 200){
//             localStorage.clear();
//             dispatch({
//                 type:authConstant.LOGOUT_SUCCESS
//             })
//         }
//         else{
//             dispatch({
//                 type:authConstant.LOGOUT_FAILURE,
//                 payload:{error:res.data.error}
               
//             })
//         }
        
        

//     }
// }