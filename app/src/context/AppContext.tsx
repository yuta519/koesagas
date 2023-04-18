import React, { createContext } from 'react'
import { PodcastServices } from "@/services/PodcastServices";

export const AppContext = createContext({} as {
  podcastServices: PodcastServices
});

export default function AppContextProvider(
  { children } : { children: React.ReactNode }
) {
  const podcastServices = new PodcastServices();

  return (
    <AppContext.Provider value={{ podcastServices }}>
      {children}
    </AppContext.Provider>
  )
}
