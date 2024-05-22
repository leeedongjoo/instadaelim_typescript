//es6

import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Firebase from "firebase/auth"; // cheat sheet
import { auth } from "../firebaseConfig";

//function : function & arrow func
export default () => {
  //navigation Hook Ex)useXXX()
  const navigation = useNavigation();
  // move to Detail function
  // function Move(){}
  const signOut = async () => {
    await Firebase.signOut(auth);
  };

  //design screen
  return (
    <View style={styles.container}>
      <Text>Home Screen.</Text>
      <Button title="Sign out" onPress={signOut} />
      {/*Component Ex)Button
        Props Ex)title
      */}
    </View>
  );
};

//css style
const styles = StyleSheet.create({
  container: {
    // 왼/중/오 -> 가운데 정렬
    alignItems: "center",
    // 위/중/아래 -> 가운데 정렬
    justifyContent: "center",
    // 크기 : 화면 전체
    // width : '100%' ,
    // height : '100%' 이렇게 해도되고 밑에처럼 flex : 1 갈겨도됨
    flex: 1,
    backgroundColor: "white",
  },
});
