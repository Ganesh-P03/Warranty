import { useRef, useState, useEffect } from "react";
import {
  Contract,
  providers,
  utils,
  BigNumber,
  getAddress,
  transactionProvider,
  getLogs,
} from "ethers";
//import main from "../testing/scripts";
import Web3Modal from "web3modal";
import axios from "axios";
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from "../constants/index";
var Web3 = require("web3");
import styles from "./../styles/panel.module.css";
import { StyleSheetManager } from "styled-components";

const Approve = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [approveArray, setApproveArray] = useState();
  const [status, setStatus] = useState(false);
  const web3ModalRef = useRef();
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Polygon Mumbai");
      throw new Error("Change network to Polygon Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const onPageLoad = async () => {
    await connectWallet();
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "polygon_mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      onPageLoad();
    }
  }, []);

  const handleFetch = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      const approvals = await axios.get(
        `/api/ClaimWarranty/0x8eF9e153F9B254BAeDc4eD71e18E770eF2b07C64`
      );

      setApproveArray(approvals.data.txn);

      if (approvals.data.txn.length != 0) {
        setStatus(true);
      } else {
        setStatus(false);
      }

      console.log(approvals.data.txn.length);
    } catch (err) {
      console.log(err);
    }
  };

  //   const onApprove=async()=>{
  //     try {
  //       const signer = await getProviderOrSigner(true);
  //       const nftContract = new Contract(
  //         NFT_CONTRACT_ADDRESS,
  //         NFT_CONTRACT_ABI,
  //         signer
  //       );
  //      nftContract.aproove(msg.sender,_user,tokenId,_request)

  //     }

  //   }

  const each = (approval) => {
    return (
      <div
        style={{
          margin: "20px",
          border: "2px solid black",
          padding: "10px",
        }}
      >
        <h2>{approval.from}</h2>
        <h2>{approval.msg}</h2>
        <h2>{approval.tokenId}</h2>
        <h2>{approval._id}</h2>
        <button>{Approve}</button>
      </div>
    );
  };

  //   const renderBody = () => {
  //     return approveArray.map(each);
  //   };

  return (
    <div>
      <button onClick={handleFetch}>see</button>
      {status ? approveArray.map(each) : ""}
    </div>
  );
};

export default Approve;
