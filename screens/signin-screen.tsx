import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
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
import { FirebaseError } from "firebase/app";
import {
  NativeStackNavigationProp,
  NativeStackNavigatorProps,
} from "@react-navigation/native-stack/lib/typescript/src/types";
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
//Fotter (Signin Btn, Create Account)
const Footer = styled(View)`
  margin-top: 15px;
`;
const SigninButton = styled(TouchableOpacity)`
  background-color: #385df2;
  padding: 10px;
  align-items: center;
`;
const SigninTitle = styled(Text)`
  color: white;
  font-size: 15px;
`;
const CreationGuide = styled(Text)`
  color: #acacac;
  text-align: center;
`;
const CreateAccount = styled(Text)`
  color: #4ba5ff;
  text-decoration: underline;
  text-align: center;
  padding-bottom: 10px;
`;
const ErrorMessage = styled(Text)`
  font-size: 10px;
  color: red;
`;

const BGimgDir = require("../assets/instaDaelim_background.jpg");
const LogoImgDir = require("../assets/instaDaelim_title.png");
export default () => {
  // Email(ID), PW ==> state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Error message
  const [error, setError] = useState("");
  //loading state
  const [loading, setLoading] = useState(false);
  //use navigation hook
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackScreenList>>();
  const goToSignup = () => {
    navigation.navigate("SignUp");
  };
  // onChange Text(사용자 입력에 따라 변경된 Input Event를 받아온다)
  const onChangeText = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type: string
  ) => {
    // 1. 'e' 의 담겨 있는 사용자의 입력 텍스트를 가져온다.
    const inputText = e.nativeEvent.text;
    // 2. 입력 텍스트를 email, password state에 저장한다.
    // 2-1. 입력 텍스트가 email이라면?
    switch (type) {
      case "email":
        setEmail(inputText);
        break;
      case "password":
        setPassword(inputText);
        break;
    }
    // 2-2. 입력 텍스트가 password라면?
  };
  //onSubmit account info for signin
  const onSubmit = async () => {
    //info : 1. auth, 2. email, 3. pw
    try {
      //invalid input check...
      if (email === "" || password === "") {
        setError("plz input user info");
        return;
        //loading on..
      }
      setLoading(true);
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
      //if signin success, alert!
      Alert.alert("Account Signin Success");
    } catch (error) {
      //if encounter error
      if (error instanceof FirebaseError) {
        //set error message
        setError(error.message);
      }
      setLoading(false);
    } finally {
      //loading off...
      setLoading(false);
    }
  };
  // Screen Design
  return (
    <Container source={BGimgDir}>
      <SignBox>
        <LogoImg source={LogoImgDir} resizeMode="contain" />
        <Title>Welcome my instadaelim app!!</Title>
        <InputField>
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
          <CreationGuide>Already have an account?</CreationGuide>
          <CreateAccount onPress={() => goToSignup()}>
            Create Account
          </CreateAccount>
          <SigninButton onPress={() => onSubmit()}>
            <SigninTitle>
              {loading === true ? "Loading..." : "Sign in"}
            </SigninTitle>
          </SigninButton>
        </Footer>
      </SignBox>
    </Container>
  );
};
