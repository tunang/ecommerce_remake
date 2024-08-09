import { useState } from "react";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import { registerApi } from "../../services/usersServices/UserService";
import { useNavigate } from "react-router-dom";

const Register = () => {

const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !firstname || !lastname || !confirmPassword) {
      toast.error("Missing something");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Wrong confirm password");
      return;
    }

    const res = await registerApi(firstname, lastname, email, password);
    const res2 = await createCa
     
    console.log(res);
    if (res.status === 200) {
      toast.success("Register successfull");
      navigate('/login')
    } else {
      toast.error("Register unsuccessful");

    }
  };

  return (
    <div className="w-[70%] md:w-[60%] lg:w-[30%] mx-auto mt-12 items-center">
      <div className=" text-center">
        <h1>Sign up</h1>
      </div>

      <div className="md:flex mt-6">
        <div className="basis-2/5">
          <h4 className="font-normal">First name</h4>
          <input
            className="w-full bg-quinary p-2 mt-[6px] rounded-md"
            type="text"
            placeholder="Tuan"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="basis-3/5 md:ml-3 mt-[6px] md:mt-0">
          <h4 className="font-normal">Last name</h4>
          <input
            className="w-full bg-quinary p-2 mt-[6px] rounded-md"
            type="text"
            placeholder="Nguyen"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-normal">Email</h4>
        <input
          className="w-full bg-quinary p-2 mt-[6px] rounded-md"
          type="text"
          placeholder="abc@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mt-[18px]">
        <h4 className="font-normal">Password</h4>
        <input
          className="w-full bg-quinary p-2 mt-[6px] rounded-md"
          type="text"
          placeholder="abc"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mt-[18px]">
        <h4 className="font-normal">Confirm your password</h4>
        <input
          className="w-full bg-quinary p-2 mt-[6px] rounded-md"
          type="text"
          placeholder="abc"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div>
        <button
          onClick={() => handleRegister()}
          className="w-full text-quinary bg-slate-700 hover:bg-tertiary p-2 mt-5 rounded-md cursor-pointer"
        >
          Sign up
        </button>
      </div>

      <div className="w-full text-right mt-4">
        <p className="mt-[2px]">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-quaternary hover:border-b-[1px] border-quaternary"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
