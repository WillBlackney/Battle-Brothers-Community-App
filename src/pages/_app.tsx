import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { theme } from "../chakra/theme";
import Layout from "../components/Layout";
import "../firebase/clientApp";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {

  
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <div
          style={{
            backgroundImage: `url("https://via.placeholder.com/500")`,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
