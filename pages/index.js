import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useContext } from "react";
import BusinessContext from "../store/business-context";

export default function Home() {
  const busiCtx = useContext(BusinessContext);
  return (
    <div className={styles.container}>
      <Head>
        <title>{busiCtx.name}</title>
        <meta name="description" content="Rent all you want just pay first" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
