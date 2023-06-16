import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useRef,
  useCallback,
} from "react";

import Web3Modal from "web3modal";
import { getAtmTokensBalance, getEtherBalance } from "../utils/getAmounts";
import { Contract, providers, utils, BigNumber, ethers } from "ethers";

const Context = createContext();
export const StateContext = ({ children }) => {
  const zero = BigNumber.from(0);
  const [ATMBalance, setATMBalance] = useState(zero);
  const [ethBalance, setEthBalance] = useState(zero);
  const [addressWallet, setAddressWallet] = useState(undefined);
  const [openModal, setOpenModal] = useState(false);

  const web3ModalRef = useRef();
  const [walletConnected, setWalletConnected] = useState(false);
  const [modalInstallMetamask, setModalInstallMetamask] = useState(false);

  const getAmounts = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      setAddressWallet(address);
      const _atmBalance = await getAtmTokensBalance(provider, address);
      setATMBalance(_atmBalance || zero);
      const _ethBalance = await getEtherBalance(provider, address, false);
      setEthBalance(_ethBalance);
    } catch (error) {
      console.log(error + "getAmounts StateContext");
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 11155111) {
      setOpenModal(true);
      setATMBalance(zero);
      return;
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const handleCheckNetWork = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    try {
      if (network.chainId !== 11155111) {
        await window.ethereum
          .request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xaa36a7",
                rpcUrls: [
                  "https://eth-sepolia.g.alchemy.com/v2/603jgdJcahWdavoFWd9CHBECb7kNgylS",
                ],
                nativeCurrency: { name: "ETH", decimals: 18, symbol: "ETH" },
                chainName: "Sepolia Test Netwok",
                blockExplorerUrls: ["https://sepolia.etherscan.io/"],
              },
            ],
          })
          .then(() => setOpenModal(false))
          .then(() => getAmounts())
          .then(() => connectWallet());
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkInstallMetaMask = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        setModalInstallMetamask(true);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      handleCheckNetWork();
      getAmounts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "sepolia",
        providerOptions: {},
        disableInjectedProvider: false,
        cacheProvider: true,
      });

      connectWallet();
      getAmounts();
      checkInstallMetaMask();
    }
  }, [walletConnected]);

  // Change Account
  const handleAccountsChanged = useCallback(() => {
    getAmounts();
    handleCheckNetWork();
  }, []);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [handleAccountsChanged]);

  // Change Network
  const handleChangeChainChanged = useCallback(() => {
    getAmounts();
    setOpenModal(false);
  }, []);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", handleChangeChainChanged);
    }
    return () => {
      window.ethereum?.removeListener("chainChanged", handleChangeChainChanged);
    };
  }, [handleChangeChainChanged]);

  return (
    <Context.Provider
      value={{
        ATMBalance,
        walletConnected,
        connectWallet,
        openModal,
        setOpenModal,
        handleCheckNetWork,
        addressWallet,
        ethBalance,
        getProviderOrSigner,
        setModalInstallMetamask,
        modalInstallMetamask,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);
