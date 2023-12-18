import { Slot } from "expo-router";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { store } from "@/store";
import { SessionProvider } from "@/hooks/ctx";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Provider store={store}>
        <Slot />
        <Toast />
      </Provider>
    </SessionProvider>
  );
}
