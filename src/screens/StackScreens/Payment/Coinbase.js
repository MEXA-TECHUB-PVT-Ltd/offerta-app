import React, { useMemo, useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { generateOnRampURL } from "@coinbase/cbpay-js";
import "react-native-url-polyfill/auto";

const Coinbase = () => {
  const [currentAmount, setCurrentAmount] = useState(1);
  const [destinationAddress, setDestinationAddress] = useState([
    { address: "0xabcdef", blockchains: ["solana"] },
    { address: "0x123456", assets: ["ETH", "USDC"] },
  ]);
  //   const coinbaseURL = useMemo(() => {
  //     const options = {
  //       appId: "1dbd2a0b94", // "your_app_id",
  //       destinationWallets: [
  //         {
  //           address: destinationAddress,
  //           blockchains: ["solana", "ethereum"],
  //         },
  //       ],
  //       handlingRequestedUrls: true,
  //       presetCryptoAmount: currentAmount,
  //     };
  //     let res = generateOnRampURL(options);
  //     console.log("Res : ", res);
  //     return res;
  //   }, [currentAmount, destinationAddress]);
  //   const onMessage = useCallback((event) => {
  //     // Check for Success and Error Messages here
  //     console.log("onMessage", event.nativeEvent.data);
  //     try {
  //       const { data } = JSON.parse(event.nativeEvent.data);
  //       if (data.eventName === "request_open_url") {
  //         viewUrlInSecondWebview(data.url);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }, []);
  const onUrlChange = async (webviewstate) => {
    console.log("webviewstate : ", webviewstate);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <WebView
        source={{
          //   uri: coinbaseURL,
          uri: "https://commerce.coinbase.com/charges/7A7W3FP7",
        }}
        onNavigationStateChange={onUrlChange}
        // onMessage={onMessage}
      />
    </View>
  );
};

export default Coinbase;
