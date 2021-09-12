import { productConstants } from '../action/constants';

const initialState = {
    loading: false,
    error: null,
    result: {},
    products: [],
    SearchedProducts:[],
    Searchedresult:{},
    product:{},
    message: null,
    search:false,
    productlink:false
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.PRODUCT_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                result: action.payload.result,
                loading: false
            }
            break;
        case productConstants.PRODUCT_FAILURE:
            state = {
                ...state,
                message: action.payload.message,
                error: action.payload.error,
                loading: false
            }
            break;
        case productConstants.SEARCH_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.SEARCH_PRODUCT_SUCCESS:
            state = {
                ...state,
                Searchedresult:action.payload.Searchedresult,
                SearchedProducts: action.payload.SearchedProducts,
                loading: false,
                search:true
            }
            break;
        case productConstants.SEARCH_PRODUCT_FAILURE:
            state = {
                ...state,
                message: action.payload.message,
                error: action.payload.error,
                loading: false,
                search:false
            }
            break; 
        case productConstants.PRODUCT_DETAIL_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.PRODUCT_DETAIL_SUCCESS:
            state = {
                ...state,
                product: action.payload.product,
                loading: false,
                productlink:true
            }
            break;
        case productConstants.PRODUCT_DETAIL_FAILURE:
            state = {
                ...state,
                message: action.payload.message,
                error: action.payload.error,
                loading: false,
                productlink:false
            }
    }
    return state;
}

export default productReducer;