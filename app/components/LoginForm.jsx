"use client";


import { useState , useContext} from "react";
import { UserContext } from '../UserContext';

import { useRouter } from "next/navigation";



const LoginForm = () => {
  const { setUsername } = useContext(UserContext);
  const [inputValue, setInputValue] = useState('');
  
  const router = useRouter(); // Obtener el enrutador
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false); // Nuevo estado
  const [userAuth , setUserAuth] = useState("") ;

  


  const handleSend = async (e) => {
    e.preventDefault();
    //useContext
    setUsername(inputValue);
    setInputValue('');
   //useContext
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      console.log(response);

      if (response.ok) {
        setSuccessMsg(`You are amazing ${username}`);
        setUserAuth(`${username}`)
       // router.push(`/profile?username=${username}`); 
       router.push(`/profile`);
       

      } else {
        setErrMsg(`User ${username} not found  `); // Cambia el mensaje de error
        setSuccessMsg("");
        setShowSuccessMsg(false);
      }

    } catch (error) {
      console.log(error);
      setErrMsg(error.message);
      setSuccessMsg("");
    }
  };



  return (
    <div className="grid grid-cols-1  mdl:grid-cols-2 pt-20 justify-center items-center mt-10 w-full px-2">
      <div className=" items-center justify-center w-full">
        <h2 className="gap-4 flex font-titleFont text-2xl md:text-3xl lg:text-5xl font-semibold md:font-bold  justify-center items-center text-center ">
          Let´s go to the moon!
        </h2>
      
      </div>
      <div className=" w[98%] md:w-full  gap-4  rounded-lg items-center justify-center px-5 lg:px-20 py-4">
        <form
          onSubmit={handleSend}
          className="w-full flex flex-col gap-3 lgl:gap-6 py-2 lgl:py-5 dark:bg-gray-950 bg-white p-3 rounded-md shadow-todoShodow pt-8 md:pt-0 shadow-shadowOne   "
        >
          <h3 className=" text-2xl pb-4 text-center font-titleFont font-semibold text-yellow-400">
            Test Login User
          </h3>
          {errMsg && (
            <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce">
              {errMsg}
            </p>
          )}
          {successMsg && (
            <p className="py-3 bg-gray-300 shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce">
              {successMsg}
            </p>
          )}

          <div className="flex flex-row  gap-1   justify-center items-center  ">
            <div className="w-full flex flex-col gap-1">
              <label
                className="text-sm  tracking-wide"
                htmlFor="username"
              >
                Nombre*
              </label>
              <input
                name="username"
                className={`${
                  errMsg === "Username is required!" && "outline-moradito"
                } dark:bg-gray-800 rounded-md flex w-full md:w-full text-gray-500 py-2 px-3 contactInput`}
                type="text"
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

            <div className="w-full  flex flex-col gap-1">
            <label
              className="text-sm  tracking-wide"
              htmlFor="password"
            >
              Contraseña*
            </label>
            <input
              name="password"
              className={`${
                errMsg === "Username is required!" && "outline-moradito"
              } dark:bg-gray-800 rounded-md flex w-full md:w-full text-gray-500 py-2 px-3 contactInput`}
              type="password"
              required
            />
          </div> 


            </div>
           
          </div>


     


       
         
          <div className="w-full">
            <button
              onSubmit={handleSend}
              className="w-full h-12 bg-[#141518] rounded-lg text-base text-gray-400 tracking-wider uppercase hover:text-white duration-300 hover:border-[1px] hover:border-moradito border-transparent"
            >
              Enter
            </button>
  
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;