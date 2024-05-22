//es6

import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import ProfileInfo from "../../components/ProfileInfo";
import { User } from "firebase/auth";
import { MyUser } from "./profile-container";

const Scroll = styled(ScrollView)`
  flex: 1;
  background-color: white;
`;
const Header = styled(View)`
  height: 300px;
  justify-content: flex-end;
  bottom: -20px;
  z-index: 99;
  padding: 0px 30px;
`;
const Body = styled(View)`
  height: 500px;
  background-color: lightgrey;
`;

const SignoutBtn = styled(TouchableOpacity)`
  background-color: #e1e1e1;
  border-radius: 4px;
  padding: 5px 10px;
`;
const SignoutTItle = styled(Text)`
  color: #7c7c7c;
  text-align: center;
`;

type Props = {
  user: MyUser | undefined;
  onSignout: () => void;
  onEditImage: () => void;
};

//function : function & arrow func

export default ({ user, onSignout, onEditImage }: Props) => {
  //design screen
  return (
    <Scroll>
      <Header>
        <ProfileInfo user={user} onEditImage={onEditImage} />
      </Header>
      <Body>
        <SignoutBtn onPress={onSignout}>
          <SignoutTItle>로그아웃</SignoutTItle>
        </SignoutBtn>
      </Body>
    </Scroll>
  );
};

// export default ({ user: }) => {};
// const Add = (a: number, b: number) => {
//   return a + b;
// };

// Add(1, 3); //Call (1,3)<-이건인수 argument임
