import ProductBox from "./ProductBox";
import {productsInstance} from "../../services/axios/CustomProductsAxios";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactLoading from 'react-loading';
import fetchProducts from "../../services/usersServices/ProductsService";
import { circIn } from "framer-motion";
import CircleLoading from "../Loading/CircleLoading";
import Pagination from "../Pagination/Pagination";

const ProductsPage = ({ url, categories, sortOption }) => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);

  let [productIndex, setProductIndex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(8); 
  
  const indexOfLastPost = currentPage * productPerPage;
    const indexOfFirstPost = indexOfLastPost - productPerPage;
    const currentLists =  productsList.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    }

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

  //Sort function
  useEffect(() => {
    console.log(sortOption);
    if (!productsList.length || sortOption === "none") return;
    const sortedProducts = [...productsList]; // Create a copy to avoid mutating original state
    sortedProducts.sort((a, b) => {
      if (sortOption === "lowToHigh") {
        return a.price - b.price; // Sort by price in ascending order
      } else if (sortOption === "highToLow") {
        return b.price - a.price; // Sort by price in descending order
      }
      return 0; // No change if sortOption is invalid
    });
    setProductsList(sortedProducts);
  }, [sortOption]); // Update only when products or sortOption changes

  useEffect(() => {
    fetchProducts();     
  }, []);

  return (
    <>
      {loading && <CircleLoading /> }
      <div className="grid grid-cols-12 gap-5">
        {productsList &&
          currentLists.map((product, index) => {
            return <ProductBox product={product} index={index} productIndex={productIndex} setProductIndex={setProductIndex}/>;
          })}
          <Pagination 
          productPerPage = {productPerPage}
          totalProduct = {productsList.length}
          paginate = {paginate}
        />
      </div>
    </>
  );
};

export default ProductsPage;
