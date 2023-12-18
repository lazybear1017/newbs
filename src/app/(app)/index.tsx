import { Text, View } from "react-native";
import {
  useSelector,
  useDispatch,
  Provider,
  TypedUseSelectorHook,
} from "react-redux";
import { useSession } from "@/hooks/ctx";
import { useEffect } from "react";
import type { RootState } from "@/store";
import { goobalSlice } from "@/reducer/goobal";
import { Button } from "react-native-paper";

export default function Index() {
  const { signOut, session } = useSession() || {};

  console.log(session);

  useEffect(() => {
    console.log(123);
  }, []);

  const counter = useSelector((state: RootState) => state.goobal.value);
  const dispatch = useDispatch();

  const handlePress = () => {
    // Action
    const action = goobalSlice.actions.increment(10);
    // dispatch
    dispatch(action);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>首页</Text>
      <Text>{counter}</Text>
      <Button mode="contained" onPress={handlePress}>
        redux测试按钮
      </Button>
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
