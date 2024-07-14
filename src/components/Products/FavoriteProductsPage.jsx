import ProductBox from "./ProductBox";
import {productsInstance} from "../../services/axios/CustomProductsAxios";
import axios from "axios";
import { useState, useEffect } from "react";
import fetchProducts from "../../services/usersServices/ProductsService";
import { axiosInstance } from "../../services/axios/CustomAxiosWithHeader";
import CircleLoading from "../Loading/CircleLoading";

const FavoriteProductsPage = ({ url}) => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);


  let [productIndex, setProductIndex] = useState("");

  // categories.map((category, index) => {
  //     const respond = fetchProducts(`${url}${category}`)

  //     setProductsList([...respond]);
  // })

  const fetchProducts = async () => {
    setLoading(true);
    // const datas = await axios.all(
    //   categories.map(async (category) => {
    //     const data = await productsInstance.get(`${url}${category}`);
    //     return data.data.products;
    //   })
    // );

    const datas = await axiosInstance.get(`${url}`)
    console.log(datas.data.favProductsList.products);
    setLoading(false);
    setProductsList(datas.data.favProductsList.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {loading && <CircleLoading />}
    <div className="grid grid-cols-12 gap-5">
      {productsList &&
        productsList.map((product, index) => {
          return <ProductBox product={product} index={index} productIndex={productIndex} setProductIndex={setProductIndex}/>;
        })}
    </div>
    </>
  );
};

export default FavoriteProductsPage;