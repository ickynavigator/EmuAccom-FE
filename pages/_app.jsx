import Layout from "../components/Layout";
import MetaHeader from "../components/MetaHeader";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <MetaHeader />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
