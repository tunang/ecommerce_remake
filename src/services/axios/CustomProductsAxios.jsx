import axios from 'axios';

export const productsInstance = axios.create({
    baseURL: 'https://dummyjson.com/products',
});

// export const detailProductsInstance = axios.create({
//     baseURL: 'https://dummyjson.com/products/',
// });



// export default {productsInstance, detailProductsInstance};