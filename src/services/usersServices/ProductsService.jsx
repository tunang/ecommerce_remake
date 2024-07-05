import { productsInstance } from "../axios/CustomProductsAxios";
import { useEffect, useState } from "react";


const fetchProducts = (url) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    let getProduct = async() => {
        try{
            setLoading(true);
            const respond = await productsInstance.get(url);
            setProducts(respond.data);
            setLoading(false);
        }
        catch(err){
            setError(err.message);
        }
    }

    useEffect(() => {
        getProduct();
    }, [url]);

    return { products, loading, error };

}
 
export default fetchProducts;
