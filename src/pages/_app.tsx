import Navbar from "../components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Quicksand } from "next/font/google";

const fireCode = Quicksand({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={fireCode.className}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
}
