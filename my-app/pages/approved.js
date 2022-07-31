import axios from "axios";
import { useRef, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import styles from "./../styles/approved.module.css";
const Approved = () => {
  const [claimed, setClaimed] = useState([]);
  const [tokenId, setTokenId] = useState(null);
  const [status, setStatus] = useState(false);

  const each = (claim) => {
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          marginTop: "30px",
          marginLeft: "150px",
          marginRight: "150px",
          color: "black",
          padding: "10px",
          display: "inline - block",
          marginBottom: "30px",
        }}
      >
        <h2>Repair Details: {claim.msg}</h2>
        <h2>UserId : {claim.from}</h2>
        <h2>RepairId: {claim.repairId}</h2>
      </div>
    );
  };

  const handleSubmit = async () => {
    const cur_claimed = await axios.get(
      `/api/ClaimWarranty/Approved/${tokenId}`
    );
    setClaimed(cur_claimed.data.txn);
    if (claimed.length != 0) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };
  return (
    <div className={styles.center}>
      <NavBar />
      <h1>Approved claims</h1>

      <input
        type="text"
        onChange={(e) => {
          setTokenId(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Submit</button>

      {status ? claimed.map(each) : <h1>No claims found 🙂</h1>}
    </div>
  );
};

export default Approved;
