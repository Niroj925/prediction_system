"use client";

import React, { useState } from "react";
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import { login } from "@/app/redux/slicers/adminSlice";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/component/api/api";
import { setIsLogged } from "@/app/redux/slicers/userSlice";

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [clicked, setClicked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleClick = async (event) => {
    setIsButtonDisabled(true);
    setClicked(true);
    const data = {
      email: email,
      password: password,
    };

    try {
      const res = await api.post("/auth/login", data);

      if (res.status === 200) {
        console.log(res.data);
          localStorage.setItem('access_token',res.data.access_token);
        dispatch(setIsLogged(true));
        router.push(`/doctor/profile?id=${res.data.userId}`);

      } else {
        router.push("/doctor/login");
      }
    } catch (err) {
      toast.error("Invalid Credentials ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    } finally {
      setClicked(false);
      setIsButtonDisabled(false);
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleForgotClick = () => {
    router.push("/doctor/forgotpass");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.login}>LogIn</h2>
        <form action="" className={styles.form}>
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChangeEmail}
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangePassword}
          />

          <p className={styles.forgot} onClick={() => handleForgotClick()}>
            Forgot Password?
          </p>
          <button
            type="button"
            className={clicked ? styles.clicked : styles.unclick}
            onClick={() => handleClick()}
            disabled={isButtonDisabled}
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
