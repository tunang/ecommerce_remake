import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const Infomation = () => {
  const userState = useSelector((state) => state.user);

    return ( <div className="mt-8 col-span-12 lg:col-span-6">
        <h4 className="font-normal">Email: {userState.account.email}</h4>
    </div> );
}
 
export default Infomation;