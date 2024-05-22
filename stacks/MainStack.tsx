import { createStackNavigator } from "@react-navigation/stack";
import home from "../screens/home";
import profile from "../screens/profile/profile-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from "./Tabs";
//const : 재할당 불가
//let : 재할당 가능
//var : 재할당 가능, 선언 순어에 상관없이
//이동할 스크린 StackNavigator : type 지정
type MainStackScreenList = {
  Tabs: undefined;
};

//stackNavigator 생성
const Stack = createStackNavigator<MainStackScreenList>();

export default () => {
  //Stack 안에서 이동할 스크린들 그룹화

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
