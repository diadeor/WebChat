import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const url = "/api/auth/google";
  const googleLoginSuccess = async (response: any) => {
    const token = response.credential;

    const { data } = await axios.post(
      url,
      { token },
      {
        withCredentials: true,
        validateStatus: () => true,
      },
    );

    console.log(data);
  };

  const googleLoginError = () => {
    console.log("Google Login Error");
  };

  return (
    <div className=" w-full h-svh flex flex-row items-center justify-center">
      <div className="inner-container  font-poppins flex flex-col  gap-3 items-center justify-center bg-black/60 rounded-xl w-full h-100">
        <p className="font-bold text-white text-xl">Login to WebChat</p>
        <GoogleLogin
          theme="outline"
          size="large"
          shape="circle"
          type="standard"
          text="continue_with"
          onSuccess={googleLoginSuccess}
          onError={googleLoginError}
          useOneTap
        />
      </div>
    </div>
  );
};

export default Login;
