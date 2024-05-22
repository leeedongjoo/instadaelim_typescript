import { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackScreenList } from "../stacks/AuthStack";

const Container = styled(ImageBackground)`
  justify-content: center;
  align-items: center;
  background-color: #97987b;
  flex: 1;
`; //ImageBackground
const Title = styled(Text)`
  font-size: 15px;
  font-weight: 700;
  color: #ca2929;
  margin-bottom: 10px;
`;
const SignBox = styled(View)`
  background-color: white;
  width: 80%;
  height: 60%;
  padding: 20px;
  border-radius: 10px;
`;
const LogoImg = styled(Image)`
  width: 100%;
  height: 30%;
`; //Text Input (ID/PW)
const InputField = styled(View)`
  padding: 3px;
`;
const UserID = styled(TextInput)`
  background-color: #efeded;
  margin-bottom: 10px;
  font-size: 20px;
  padding: 5px 12px;
`; //vertical horizontal 이렇게 작성할 경우 앞이 상하 뒤가 좌우임
const UserPW = styled(UserID)``;
const UserName = styled(UserID)``;
//Fotter (Signin Btn, Create Account)
const Footer = styled(View)`
  margin-top: 15px;
`;
const SignupButton = styled(TouchableOpacity)`
  background-color: #385df2;
  padding: 10px;
  align-items: center;
`;
const SignupTitle = styled(Text)`
  color: white;
  font-size: 15px;
`;

const ErrorMessage = styled(Text)`
  color: red;
  font-size: 14px;
`;
const BGimgDir = require("../assets/instaDaelim_background.jpg");
const LogoImgDir = require("../assets/instaDaelim_title.png");
export default () => {
  // Email(ID), PW ==> state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //error message
  const [error, setError] = useState("");
  //loading state
  const [loading, setLoading] = useState(false);
  //use navigationHook
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackScreenList>>();
  //moving screen to signin page
  const goToSignin = () => {
    //using hook, move to signin
    navigation.navigate("SignIn");
  };
  // onChange Text(사용자 입력에 따라 변경된 Input Event를 받아온다)
  const onChangeText = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type: string
  ) => {
    // 1. 'e' 의 담겨 있는 사용자의 입력 텍스트를 가져온다.
    const inputText = e.nativeEvent.text;
    // 2. 입력 텍스트를 email, password state에 저장한다.

    switch (type) {
      case "email":
        setEmail(inputText);
        break;
      // 2-1. 입력 텍스트가 email이라면?
      case "password":
        setPassword(inputText);
        break;
      // 2-2. 입력 텍스트가 password라면?
      case "name":
        setName(inputText);
        break;
      // 2-3. 입력 텍스트가 name이라면?
    }
  };
  // Screen Design
  //Send Account Info to Server(Firebase)
  //서버와 통신하기 때문에 비동기(async)함수로선언
  const onSubmit = async () => {
    try {
      //invalid case check
      if (name === "" || email === "" || password === "") {
        setError("plz input user info");
        return;
      }
      setLoading(true);

      //error message reset
      setError("");
      //input code
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //Update User Profile with name
      await updateProfile(credential.user, { displayName: name });
      //loading off
      setLoading(false);
      //if account creation success, alert
      Alert.alert("Account Created!", "", [{ onPress: () => goToSignin() }]);
      goToSignin();
    } catch (error) {
      //loadinf off....
      setLoading(false);
      //if encounter error
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      //always
      setLoading(false);
    }

    //Account Info
    //1.Name
    //2.ID
    //3.PW
    console.log(`name:${name} ID:${email} PW:${password}`);
    //send to firebase (firebaseDB, userEmail?, userPW)

    //next code...
  };

  //텍스트 엔터하고 싶으면 밑처럼 {'\n'}하기
  //혹은 {`welcome \n your`}이렇게하기 따옴표아님
  return (
    <Container source={BGimgDir}>
      <SignBox>
        <LogoImg source={LogoImgDir} resizeMode="contain" />
        <Title>Welcome! Nice to meet you!{"\n"}Creat Your Account</Title>

        <InputField>
          <UserName
            placeholder="Name"
            value={name}
            onChange={(e) => onChangeText(e, "name")}
            returnKeyType="next"
          />
          <UserID
            placeholder="Email"
            value={email}
            onChange={(e) => onChangeText(e, "email")}
            keyboardType="email-address"
            returnKeyType="next"
          />
          <UserPW
            placeholder="Password"
            value={password}
            onChange={(e) => onChangeText(e, "password")}
            keyboardType="visible-password"
            returnKeyType="done"
          />
          <ErrorMessage> {error}</ErrorMessage>
        </InputField>
        <Footer>
          <SignupButton onPress={() => onSubmit()}>
            <SignupTitle>
              {loading === true ? "Loading..." : "Create Account"}
            </SignupTitle>
          </SignupButton>
        </Footer>
      </SignBox>
    </Container>
  );
};
