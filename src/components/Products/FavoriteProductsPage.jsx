import ProductBox from "./ProductBox";
import {productsInstance} from "../../services/axios/CustomProductsAxios";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchProducts from "../../services/usersServices/ProductsService";
import { axiosInstance } from "../../services/axios/CustomAxiosWithHeader";
import CircleLoading from "../Loading/CircleLoading";
import { fetchFavoriteList } from "../../redux/Reducer/favoriteReducer";
import { updateFavoriteList } from "../../services/usersServices/FavoriteService";
import { useNavigate } from "react-router-dom";

const FavoriteProductsPage = ({ url}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const userState = useSelector((state) => state.user);
  const favoriteProductsState = useSelector((state) => state.favoriteProducts)

  let [productIndex, setProductIndex] = useState("");

  // const fetchProducts = async () => {
  //   setLoading(true);
  //   const datas = await axiosInstance.get(`${url}`)
  //   console.log(datas.data.favProductsList.products);
  //   setLoading(false);
  //   setProductsList(datas.data.favProductsList.products);
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, [favoriteProductsState.products]);


  useEffect(() => {
    if(userState.account.auth){
      updateFavoriteList(favoriteProductsState.products);
    }
  }, [favoriteProductsState.products]);


  useEffect(() => {
    if(userState.account.auth){
      dispatch(fetchFavoriteList());
    }
  }, []);

  return (
    <>
      {loading && <CircleLoading />}
    <div className="grid grid-cols-12 gap-5">
      {favoriteProductsState.products &&
        favoriteProductsState.products.map((product, index) => {
          return <ProductBox product={product} index={index} productIndex={productIndex} setProductIndex={setProductIndex}/>;
        })}
    </div>
    </>
  );
};

export default FavoriteProductsPage;