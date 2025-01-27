import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/home";
import Detail from "./screens/profile/profile-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import home from "./screens/home";
import detail from "./screens/profile/profile-screen";
import signinScreen from "./screens/signin-screen";
import signupScreen from "./screens/signup-screen";
import { auth } from "./firebaseConfig";
import React, { useEffect, useState } from "react";
import AuthStack from "./stacks/AuthStack";
import MainStack from "./stacks/MainStack";
import * as Firebase from "firebase/auth";
import Loading_screen from "./screens/loading-screen";
import LoadingScreen from "./screens/loading-screen";

const Stack = createStackNavigator();

//var variable;
//ㄴ let a; 재할당O
//ㄴ const b; 재할당X 한번정하면 안바뀜

export default function App() {
  //user 정보
  const [user, setUser] = useState<Firebase.User | null>();
  //loading state
  const [loading, setLoading] = useState(true);
  //  App.tsx가 실행될 때 with useEffect 훅 사용
  useEffect(() => {
    //  User가 로그인 되었는지 안되었는지, 항시 체크
    console.log("1. 로그인 되었는지 확인 중이에요...!");
    auth.onAuthStateChanged((userState) => {
      //  로그인 여부에 따라 그룹을 각각 보여줌
      //a.로그인되어잇음
      if (userState) {
        console.log("2-a. 로그인이 되었어요!");
        setUser(userState);
      }
      //b.로그인안되있음
      else {
        console.log("2-b. 로그인이 안되어었어요! or 로그아웃");

        setUser(null);
      }
      //로그인 여부 파악 끝나면 로딩 off
      setLoading(false);
    });
  }, []);
  //MainStack : 로그인 YES > 이동할 스크린 모음
  //AuthStack : 로그인 NO > 이동할 스크린 모음
  const LoadingProcess = <LoadingScreen />;
  const AuthProcess = auth.currentUser ? <MainStack /> : <AuthStack />;
  return (
    <NavigationContainer>
      {loading ? LoadingProcess : AuthProcess}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
