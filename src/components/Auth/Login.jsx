import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { fetchUser } from "../../redux/Reducer/userReducer";
import { fetchCart } from "../../redux/Reducer/cartReducer";
import { fetchFavoriteList } from "../../redux/Reducer/favoriteReducer";

import { FaEye, FaEyeSlash } from "react-icons/fa";




const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isShowingPassword, setIsShowingPassword] = useState(false);
    const [email, setEmail] = useState('nguyentuan22072004@gmail.com');
    const [password, setPassword] = useState('tuan');
    const isLoading = useSelector(state => state.user.isLoading);
    const account = useSelector(state => state.user.account);



    const handleLogin = async() => {
        if(!email || !password) {
            toast.error("Missing email or password");
            return;
        }
        dispatch(fetchUser({email, password}));
        
    }

    useEffect(() => {
        let token = localStorage.getItem('RefreshToken');
        if(token){
            navigate('/');
        }
       },[])


    useEffect(() => {
        if(account && account.auth === true){
            dispatch(fetchCart());
            dispatch(fetchFavoriteList())
            navigate("/");
        }
    },[account])

    return ( <div className="w-[70%] md:w-[50%] lg:w-[25%] mx-auto mt-28 items-center">
        <div className=" text-center">
            <h1 >Sign in</h1>
        </div>

        <div className="mt-6">
            <h4 className="font-normal">Email</h4>
            <input
                className="w-full bg-quinary p-2 mt-[6px] rounded-md" 
                type="text"
                placeholder="abc@gmail.com" 
                value={email}
                onChange={(e) => (setEmail(e.target.value))}

            />
        </div>

        <div className="relative mt-[18px]">
            <h4 className="font-normal">Password</h4>
            <div className="relative">
                <input
                    className="w-full bg-quinary p-2 mt-[6px] rounded-md" 
                    type={isShowingPassword ? 'text' : 'password'}
                    placeholder="abc@gmail.com" 
                    value={password}
                    onChange={(e) => (setPassword(e.target.value))}
                />
               {isShowingPassword ? <FaEye onClick={() => setIsShowingPassword(!isShowingPassword)} className="absolute right-2 top-1/3 w-5 h-5 ml-4" /> : <FaEyeSlash onClick={() => setIsShowingPassword(!isShowingPassword)} className="absolute right-2 top-1/3 w-5 h-5 ml-4" />} 
            </div>
        </div>

        <div>
        <button 
                className="w-full text-quinary bg-slate-700 hover:bg-tertiary p-2 mt-5 rounded-md cursor-pointer"
                onClick={() => handleLogin()}
            >Login</button>
        </div>


        <div className="w-full text-right mt-4">
                <p className=""><Link className="hover:border-b-[1px] border-tertiary">Forgot password?</Link></p>
                <p className="mt-[2px]">No account? <Link to={'/register'} className="text-quaternary hover:border-b-[1px] border-quaternary">Create here</Link></p>
        </div>

        <div>
            <p>Email: nguyentuan22072004@gmail.com</p>
            <p>Password: tuan</p>
        </div>
        
    </div> );
}
 
export default Login;