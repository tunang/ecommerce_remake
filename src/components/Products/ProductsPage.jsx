import ProductBox from "./ProductBox";
import {productsInstance} from "../../services/axios/CustomProductsAxios";
import axios from "axios";
import { useState, useEffect } from "react";
import fetchProducts from "../../services/usersServices/ProductsService";

const ProductsPage = ({ url, categories }) => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);


  let [productIndex, setProductIndex] = useState("");

  // categories.map((category, index) => {
  //     const respond = fetchProducts(`${url}${category}`)

  //     setProductsList([...respond]);
  // })

  const fetchProducts = async () => {
    setLoading(true);
    const datas = await axios.all(
      categories.map(async (category) => {
        const data = await productsInstance.get(`${url}${category}`);
        return data.data.products;
      })
    );
    setLoading(false);
    setProductsList(datas.flat());
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-5">
      {loading && <div>Loading...</div>}
      {productsList &&
        productsList.map((product, index) => {
          return <ProductBox product={product} index={index} productIndex={productIndex} setProductIndex={setProductIndex}/>;
        })}
    </div>
  );
};

export default ProductsPage;
