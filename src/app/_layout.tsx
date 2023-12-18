import { Slot } from "expo-router";
import Toast from "react-native-toast-message";
import { SessionProvider } from "@/hooks/ctx";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
      <Toast />
    </SessionProvider>
  );
}
