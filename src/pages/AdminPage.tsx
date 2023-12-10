import React, { useState, useEffect } from "react";
import { getCurrentTotalSupply, getLedger, getCurrentTotalClaimedDividend, hasUserClaimedDividend, setDividend, allocateShares } from "helpers/web3";
import { useAccount, useSignMessage, useNetwork, useContractWrite } from "wagmi";

export default function Example() {
  const [agreed, setAgreed] = useState(false);
  const [txns, setTxns] = useState([]);
  const [balance, setBalance] = useState([]);
  const { isConnected, address, status } = useAccount();
  const { chain } = useNetwork();
  const { signMessage, data, isSuccess } = useSignMessage();
  const [value, setValue]: any = useState();
  const [mintValue, setMintValue]: any = useState();
  const [mintAddress, setMintAddress]: any = useState();

  useEffect(() => {
    console.log("Fetching transactions on mount...", address, isConnected, chain?.id);
    let isMounted = true;

    const fetchData = async () => {
      if (isConnected) {
        try {
          const ledgerRes = await getLedger(String(address));
          console.log(ledgerRes, "ledgerRes");

          const currentTotalSupplyRes = await getCurrentTotalSupply();
          console.log(currentTotalSupplyRes, "currentTotalSupplyRes");

          const totalClaimedDividendRes = await getCurrentTotalClaimedDividend();
          console.log(totalClaimedDividendRes, "totalClaimedDividendRes");

          const hasUserClaimedDividendRes = await hasUserClaimedDividend(String(address));
          console.log(hasUserClaimedDividendRes, "hasUserClaimedDividendRes");

          // signMessage({ message: "aasasa" });
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      }
    };

    if (isConnected) {
      fetchData();
    }

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [isConnected, address, chain?.id]);

  const setDividendFunction = async (e: any) => {
    e.preventDefault();
    const divds = await setDividend(String(address), value);
    console.log(divds, "setDividend", value);
    if (divds.status) {
      setValue(null);
      alert("Dividend is set successfully");
    }
  };

  const allocateSharesFunction = async (e: any) => {
    e.preventDefault();
    console.log("allocateSharesFunction", mintValue, mintAddress);
    const shs = await allocateShares(String(address), mintValue, mintAddress);
    console.log(shs, "allocateSharesFunction", mintValue, mintAddress);
    if (shs) {
      setMintAddress(null);
      setMintValue(null);
      alert("Minted Shares successfully");
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-normal tracking-tight text-slate-900 sm:text-4xl">Admin</h2>
      </div>
      <div>
        <form className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="space-y-4">
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  onChange={(e: any) => setMintAddress(e.target.value)}
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                No of Shares
              </label>
              <div className="mt-2.5">
                <input
                  type="number"
                  onChange={(e: any) => setMintValue(e.target.value)}
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              onClick={allocateSharesFunction}
              type="submit"
              className="flex items-center justify-center w-full px-6 py-3 mb-3 text-lg hover:text-white text-black rounded-md sm:mb-0 bg-yellow-300 hover:bg-black">
              Allocate Shares
            </button>
          </div>
        </form>
        <form className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                Value
              </label>
              <div className="mt-2.5">
                <input
                  type="number"
                  onChange={(e: any) => setValue(e.target.value)}
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              onClick={setDividendFunction}
              className="flex items-center justify-center w-full px-6 py-3 mb-3 text-lg hover:text-white text-black rounded-md sm:mb-0 bg-yellow-300 hover:bg-black">
              Publish Dividend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
