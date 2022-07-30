import React, { useState } from "react";
import Link from "next/link";
import styles from "./../styles/admin.module.css";

const Admin = () => {
  const [data, setData] = useState("");
  React.useEffect(() => {
    // window is accessible here.
    if (window.ethereum) {
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => renderBody(res[0]));
    } else {
      alert("install metamask extension!!");
    }
    const renderBody = (account) => {
      setData(account);
    };
  }, []);

  const Emoji = (props) => (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {props.symbol}
    </span>
  );

  return (
    <div>
      <div className={styles.top} style={{ paddingTop: "30px" }}>
        <h1
          className={styles.topListItem}
          style={{ fontFamily: "helvatica sans-serif" }}
        >
          Welcome
        </h1>
        <h2 style={{ textAlign: "center", fontFamily: "helvatica sans-serif" }}>
          {data} <Emoji symbol="" />
        </h2>
      </div>
      <div className={styles.body}>
        <Link href="/newUpload">
          <button
            type="button"
            className={styles.gloww}
            style={{ margin: "20px", fontSize: "16px" }}
          >
            {" "}
            New Product
          </button>
        </Link>
        <Link href="/oldUpload">
          <button
            type="button"
            className={styles.gloww}
            style={{ margin: "20px", fontSize: "16px" }}
          >
            Old Product{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
