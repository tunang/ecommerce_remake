import Banner from "./Banner/Banner";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchCart } from "../../redux/Reducer/cartReducer";
import Category from "./Category/Category";
import Jewelry from "./Jewalry/Jewelry";
import NewCollection from "./NewCollection/NewCollection";

const Home = () => {
    const dispatch = useDispatch();


  const userState = useSelector((state) => state.user);
  const cartState = useSelector((state) => state.cart);

    return ( <div>
        <Banner />

        <NewCollection />

        <Jewelry />

        <Category />

        


    </div> );
}
 
export default Home;