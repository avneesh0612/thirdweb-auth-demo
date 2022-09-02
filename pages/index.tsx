import {
  ConnectWallet,
  useAddress,
  useLogin,
  useUser,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const login = useLogin();
  const user = useUser();

  const handleClick = async () => {
    try {
      const response = await fetch("/api/validate", {
        method: "POST",
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  if (user.user) {
    return (
      <div className={styles.container}>
        <p>You are signed in as {user.user.address}</p>
        <button className={styles.btn} onClick={handleClick}>
          Validate user
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {address ? (
        <button className={styles.btn} onClick={() => login()}>
          Sign in with Ethereum
        </button>
      ) : (
        <ConnectWallet />
      )}
    </div>
  );
};

export default Home;
