import Link from "next/link";
import styles from "./index.module.css";

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <h1>Number Crunch</h1>
      <Link href="/">Home</Link>
      <Link href="calculator">Calculator</Link>
      <Link href="about">About Me</Link>
    </header>
  );
};

export default Navbar;
