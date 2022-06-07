import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { authModalState, ModalView } from "../../../atoms/authModalAtom";
import Login from "./Login";
import SignUp from "./SignUp";

type AuthInputsProps = {
  toggleView: (view: ModalView) => void;
};

const AuthInputs: React.FC<AuthInputsProps> = ({ toggleView }) => {
  
  // Get global auth state from recoil
  const modalState = useRecoilValue(authModalState);

  // JSX
  return (
    // Show login form? Or show sign up form?
    <Flex direction="column" alignItems="center" width="100%" mt={4}>
      {modalState.view === "login" ? (
        <Login toggleView={toggleView} />
      ) : (
        <SignUp toggleView={toggleView} />
      )}
    </Flex>
  );
};
export default AuthInputs;
