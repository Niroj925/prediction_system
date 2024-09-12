"use client";

import React, { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {useSelector,useDispatch} from 'react-redux';
import { setIsLogged } from "@/app/redux/slicers/userSlice";

const links = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "CheckNow",
    path: "/check",
  },
];

const Links = () => {
  const router = useRouter();
  const dispatch=useDispatch();
const isLogged=useSelector((state)=>state.stroke.isLogged);

const handleLogout=()=>{
  dispatch(setIsLogged(false)); 
  router.push('/');
}

const handleLogin=()=>{
  router.push('/doctor/login');
}
  return (
    <div className={styles.container}>
      {/* <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
      </div> */}
      <div className={styles.links}>
      {
        isLogged?(
          <>
            {/* {links.map((link) => (
            <NavLink item={link} key={link.title} />
             ))} */}
          <button className={styles.logout} onClick={()=>handleLogout()} >Logout</button>
        
        </>
        ):(
          <>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
          <button className={styles.logout} onClick={()=>handleLogin()} >Login</button>
        
          </>
        )
      }
    </div>
    </div>
  );
};

export default Links;
