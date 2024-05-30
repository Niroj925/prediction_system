"use client";

import Link from "next/link";
import styles from "./navLink.module.css";

const NavLink = ({ item }) => {
  return (
    <Link
      href={item.path}
      className={styles.container} 
      // onClick={handleLink}
    >
      <p className={styles.title}>{item.title}</p>
    </Link>
  );
};

export default NavLink;
