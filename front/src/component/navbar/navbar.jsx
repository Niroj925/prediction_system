// components/Navbar.js

import Link from 'next/link';
import styles from "./nav.module.css"

const Navbar = () => {
  return (
    <div>
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">
            Home
            {/* <a>Home</a> */}
          </Link>
        </li>
        <li>
          <Link href="/about">
            CheckNow
          </Link>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default Navbar;
