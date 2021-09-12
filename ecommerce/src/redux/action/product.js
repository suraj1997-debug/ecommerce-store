import axios from '../../components/helpers/axios';
import { productConstants } from '../action/constants';

export const getProduct = (page) => {

    return async dispatch => {
        dispatch({
            type: productConstants.PRODUCT_REQUEST
        })

        const res = await axios.post('/user/products',
        {
            page:page
        });

        if (res.status === 200) {
            const result = res.data.results;
             const products = res.data.results.products;
            dispatch({
                type: productConstants.PRODUCT_SUCCESS,
                payload: {
                    products:products,
                    result:result
                }
            })
        }
        else {
            const message = res.data.message;
            const error = res.data.error;
            dispatch({
                type: productConstants.PRODUCT_FAILURE,
                payload: {
                    error, message
                }
            })
        }
    }
}

export const searchProduct = (search,page) =>{
    return async dispatch =>{
        
        dispatch({
            type:productConstants.SEARCH_PRODUCT_REQUEST
        })

        const res = await axios.post(`/product/search?search=${search}&page=${page}`);

        if(res.status === 200){
            const Searchedresult = res.data.results;
            const SearchedProducts = res.data.results.data;
           dispatch({
               type: productConstants.SEARCH_PRODUCT_SUCCESS,
               payload: {
                Searchedresult:Searchedresult,
                SearchedProducts:SearchedProducts
               }
           })
        }
        else{
            if(res.status === 400){
                const error = res.data.error;
                const message = res.data.message;
                dispatch({
                    type:productConstants.SEARCH_PRODUCT_FAILURE,
                    paylaod:{
                        error,message
                    }
                })
            }
        }
    }
}

export const getProductDetail = (name,id) =>{
    return async dispatch =>{
        dispatch({
            type:productConstants.PRODUCT_DETAIL_REQUEST
        })

        const res = await axios.get(`/user/product/${name}/${id}`);

        if(res.status === 200){
            const product = res.data.product
            dispatch({
                type:productConstants.PRODUCT_DETAIL_SUCCESS,
                payload:{
                    product
                }
            })
        }
        else{
            if(res.status === 400){
                const error = res.data.error;
                const message = res.data.message;
                dispatch({
                    type:productConstants.PRODUCT_DETAIL_FAILURE,
                    payload:{
                        error,message
                    }
                })
            }
        }
    }
}