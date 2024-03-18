"use client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store";
import InitialLoad from "@/layouts/initialLoad";

export function Providers({ children }: { children: React.ReactNode }) {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InitialLoad>{children}</InitialLoad>
      </PersistGate>
    </Provider>
  );
}
