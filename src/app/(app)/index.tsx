import { Text, View } from "react-native";

import { useSession } from "@/hooks/ctx";
import { useEffect } from "react";

export default function Index() {
  const { signOut, session } = useSession() || {};

  console.log(session);

  useEffect(() => {
    console.log(123);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>首页</Text>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut?.();
        }}
      >
        退出
      </Text>
    </View>
  );
}
