import { Alert, Center } from "@mantine/core";
import React from "react";
import { AlertCircle } from "tabler-icons-react";
import { fetchSingleDormById } from "../../../utils/axiosRequests";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetchSingleDormById(id);

  return { props: { dorm: { ...res.data } } };
}

const Index = props => {
  const { dorm } = props;
  return (
    <div>
      {dorm ? (
        <>{dorm.name}</>
      ) : (
        <Center>
          <Alert icon={<AlertCircle size={16} />} title="Bummer!" color="red">
            The Dorm you are looking for does not exist.
          </Alert>
        </Center>
      )}
    </div>
  );
};

export default Index;
