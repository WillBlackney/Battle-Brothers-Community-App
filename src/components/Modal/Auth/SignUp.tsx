import React, { useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { ModalView } from "../../../atoms/AuthModalAtom";
import { auth, firestore } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import InputItem from "../../Layout/InputItem";
import { addDoc, collection } from "firebase/firestore";
import { User } from "firebase/auth";

type SignUpProps = {
  toggleView: (view: ModalView) => void;
};

const SignUp: React.FC<SignUpProps> = ({ toggleView }) => {
  // State
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Hooks
  const [createUserWithEmailAndPassword, userCred, loading, authError] =
    useCreateUserWithEmailAndPassword(auth);

  // Input Events
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate email
    if (formError) setFormError("");
    if (!form.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }

    // Validate Password
    if (form.password !== form.confirmPassword) {
      return setFormError("Passwords do not match");
    }

    // Valid form inputs
    createUserWithEmailAndPassword(form.email, form.password);
  };

  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create a user in the database
  const createUserDocument = async (user: User) => {
    await addDoc(
      collection(firestore, "users"),
      JSON.parse(JSON.stringify(user))
    );
  };

  // Effects
  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  // JSX
  return (
    <form onSubmit={onSubmit}>
      <InputItem
        name="email"
        placeholder="email"
        type="text"
        mb={2}
        onChange={onChange}
      />
      <InputItem
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        onChange={onChange}
      />
      <InputItem
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        onChange={onChange}
      />
      <Text textAlign="center" mt={2} fontSize="10pt" color="red">
        {formError ||
          FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        width="100%"
        height="36px"
        mb={2}
        mt={2}
        type="submit"
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Have an account?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() => toggleView("login")}
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;
