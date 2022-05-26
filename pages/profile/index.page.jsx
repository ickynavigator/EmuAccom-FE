import { Text } from "@mantine/core";
import React, { useContext } from "react";
import { store } from "../../context/store";
import WithAuthenticated from "../../HOC/withAuthenticated";

const Index = () => {
  const { state } = useContext(store);
  const { user } = state;
  const { email, firstName, lastName } = user;

  return (
    <>
      <Text>Email: {email}</Text>
      <Text>First Name: {firstName}</Text>
      <Text>Last Name: {lastName}</Text>
    </>
  );
};

export default WithAuthenticated(Index);
