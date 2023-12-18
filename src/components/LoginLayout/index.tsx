import React from "react";
import { StyleSheet, Text, ImageBackground } from "react-native";

type IProps = {
  children: React.ReactNode;
};

const LoginLayout: React.FC<IProps> = ({ children }) => {
  return (
    <ImageBackground
      source={require("@/assets/images/loginbg.png")}
      style={styles.bgimg}
    >
      <Text style={styles.title}>毕业设计管理</Text>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgimg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#663399",
    color: "#663399",
  },
});

export default LoginLayout;
