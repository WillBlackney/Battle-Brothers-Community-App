import React, { useEffect } from "react";
import {
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import AuthInputs from "./Inputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";
import ModalWrapper from "../ModalWrapper";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  // State
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user] = useAuthState(auth);

  // Logic
  const handleClose = () =>
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  const toggleView = (view: string) => {
    setModalState({
      ...modalState,
      view: view as typeof modalState.view,
    });
  };

  // Effects
  useEffect(() => {
    // Close the modal if a user is already logged in
    if (user) handleClose();
  }, [user]);

  // JSX
  return (
    <ModalWrapper isOpen={modalState.open} onClose={handleClose}>
      <ModalHeader display="flex" flexDirection="column" alignItems="center">
        {modalState.view === "login" && "Login"}
        {modalState.view === "signup" && "Sign Up"}
        {modalState.view === "resetPassword" && "Reset Password"}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        pb={6}
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          width="70%"
        >
          {modalState.view === "login" || modalState.view === "signup" ? (
            <>
              <OAuthButtons />
              OR
              <AuthInputs toggleView={toggleView} />
            </>
          ) : (
            <ResetPassword toggleView={toggleView} />
          )}
        </Flex>
      </ModalBody>
    </ModalWrapper>
  );
};
export default AuthModal;
