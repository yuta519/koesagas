import "@/styles/globals.css";
import type { AppProps } from "next/app";

// import { AppContext } from "@/context/AppContext";
// import AppContextProvider from "@/context/AppContext";
import { PodcastServices } from "@/services/PodcastServices";

export const podcastServices = new PodcastServices();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <AppContext.Provider value={ {podcastServices} }> */}
      {/* <AppContextProvider> */}
      <Component {...pageProps} />
      {/* </AppContextProvider> */}
      {/* </AppContext.Provider> */}
    </>
  );
}
