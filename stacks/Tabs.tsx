import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import home from "../screens/home";
import { Ionicons } from "@expo/vector-icons";
import Profile from "../screens/profile";

//Tab 에서 이동 가능한 화면 리스트
type TabStackList = {
  Main: undefined;
  Profile: undefined;
};

const Stack = createBottomTabNavigator<TabStackList>();

export default () => {
  //페이지 이름에 따라 아이콘 이름 반환  keyof 를 사용하고 tabstacklist에서 페이지 이름을 가져온다는 뜻
  const getIconName = (pageName: keyof TabStackList) => {
    switch (pageName) {
      //a.Main
      case "Main":
        return "apps-sharp";
      //b.Profile
      case "Profile":
        return "person";
      //etc..
      default:
        return "alert-circle";
    }
  };
  return (
    <Stack.Navigator
      screenOptions={(routewow) => ({
        //하단 탭 아이콘 변경
        tabBarIcon: ({ focused }) => {
          const pageName = routewow.route.name;
          const iconName = getIconName(pageName);
          return (
            <Ionicons
              name={iconName}
              size={20}
              color={focused ? "#2360cf" : "darkgery"}
            />
          );
        },
        tabBarActiveTintColor: "#2360cf",
        tabBarInactiveTintColor: "darkgrey",
      })}
    >
      <Stack.Screen name="Main" component={home} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
