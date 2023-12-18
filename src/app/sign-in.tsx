import { router } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { useSession } from "@/hooks/ctx";
import LoginLayout from "@/components/LoginLayout";
import React, { useState, useCallback } from "react";
import { Button, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import _ from "lodash";
import { useRequest } from "ahooks";
import { fetchLogin } from "@/services";
import { handleFetchRes } from "@/utils/request";

type IProps = {
  setActKey: (key: "login" | "register") => void;
};

const Login: React.FC<IProps> = ({ setActKey }) => {
  const { signIn } = useSession() || {};

  const [username, setAccount] = useState("");
  const [password, setPwd] = useState("");

  const { data, loading, run } = useRequest(fetchLogin, {
    manual: true,
    onSuccess: (res) => {
      console.log(res.data.access_token);
      handleFetchRes(res, "登录", () => {
        signIn?.(res.data.access_token);
        router.replace("/");
      });
    },
  });

  const handleLogin = useCallback(() => {
    if (_.isEmpty(username)) {
      Toast.show({
        type: "info",
        text1: "请输入账号",
        position: "bottom",
      });
      return;
    }
    if (_.isEmpty(password)) {
      Toast.show({
        type: "info",
        text1: "请输入密码",
        position: "bottom",
      });
      return;
    }
    const params = { username, password, type: 3 };
    run(params);
  }, [username, password]);

  return (
    <View style={styles.content}>
      <TextInput
        mode="outlined"
        label="用户名"
        style={{ marginBottom: 12 }}
        left={<TextInput.Icon icon="account" />}
        value={username}
        onChangeText={(text) => setAccount(text)}
      />
      <TextInput
        mode="outlined"
        label="密码"
        style={{ marginBottom: 12 }}
        secureTextEntry
        left={<TextInput.Icon icon="shield-lock" />}
        value={password}
        onChangeText={(text) => setPwd(text)}
      />
      <View style={styles.extra}>
        <Text>还没有账号？</Text>
        <Button onPress={() => setActKey("register")}>立即注册</Button>
      </View>
      <Button mode="contained" loading={loading} onPress={handleLogin}>
        登录
      </Button>
    </View>
  );
};

const Register: React.FC<IProps> = ({ setActKey }) => {
  const [username, setAccount] = useState("");
  const [password, setPwd] = useState("");

  return (
    <View style={styles.content}>
      <TextInput
        mode="outlined"
        label="用户名"
        style={{ marginBottom: 12 }}
        left={<TextInput.Icon icon="account" />}
        value={username}
        onChangeText={(text) => setAccount(text)}
      />
      <TextInput
        mode="outlined"
        label="密码"
        style={{ marginBottom: 12 }}
        secureTextEntry
        left={<TextInput.Icon icon="shield-lock" />}
        value={password}
        onChangeText={(text) => setPwd(text)}
      />
      <View style={styles.extra}>
        <Text>已有账号？</Text>
        <Button onPress={() => setActKey("login")}>去登录</Button>
      </View>
      <Button mode="contained">注册</Button>
    </View>
  );
};

export default function SignIn() {
  const [actKey, setActKey] = useState<"login" | "register">("login");

  return (
    <LoginLayout>
      {actKey === "login" ? (
        <Login setActKey={setActKey} />
      ) : (
        <Register setActKey={setActKey} />
      )}
    </LoginLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    width: 320,
  },
  extra: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: -12,
    marginBottom: 12,
  },
});
