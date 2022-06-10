// <reference src="../../types/typedefs.js"
import {
  Alert,
  Button,
  Center,
  Container,
  Loader,
  Table,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import React, { useContext, useEffect, useState } from "react";
import { store } from "../../context/store";
import WithManager from "../../HOC/withManager";
import {
  deleteProperty,
  fetchAllLoggedInManagerProperties,
} from "../../utils/axiosRequests";
import Notifications from "../../utils/Notifications";
import { NumberInputCurrencyFormatter } from "../../utils/stringTools";

const ActionButton = ({ id, text, href }) => (
  <Button component={NextLink} href={href} key={id} mx={2}>
    {text}
  </Button>
);

const DeleteButton = ({ id, type, setErrorMessage, delCB }) => {
  const { state } = useContext(store);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteProperty(state.manager.token, type, id);
    if (res.status === 204) {
      setLoading(false);
      Notifications.success("Successfully deleted");
      delCB({ id });
    } else {
      setErrorMessage(res.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Button
      color="red"
      key={id}
      mx={2}
      loading={loading}
      onclick={handleDelete}
    >
      Delete
    </Button>
  );
};

const Rows = ({ elems, type, setErrorMessage, delCB }) => {
  const rows = elems.map(elem => (
    <tr key={elem._id}>
      <td>{elem.name}</td>
      <td>₺ {NumberInputCurrencyFormatter(elem.pricePerSemester)}</td>
      <td>{elem.approved ? "approved" : "not approved"}</td>
      <td>
        <Center>
          {[
            { id: "view", text: "View", href: `/${type}/${elem._id}` },
            {
              id: "edit",
              text: "Edit",
              href: `/host/edit/${elem._id}?type=${type}`,
            },
          ].map(ActionButton)}
          <DeleteButton
            id={elem._id}
            type={type}
            setErrorMessage={setErrorMessage}
            delCB={delCB}
          />
        </Center>
      </td>
    </tr>
  ));

  return rows;
};

const Index = () => {
  const { state } = useContext(store);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dorms, setDorms] = useState({});
  const [houses, setHouses] = useState({});

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const res = await fetchAllLoggedInManagerProperties(state.manager.token);
      if (res.status === 200) {
        setDorms(res.data.dorms);
        setHouses(res.data.houses);
      } else {
        setError(true);
        setErrorMessage(res.response.data.message);
      }

      setLoading(false);
    }
    fetchData();
  }, [state.manager.token]);

  const deleteDorm = ({ id }) => {
    setDorms(dorms.filter(d => d._id !== id));
  };

  const deleteHouse = ({ id }) => {
    setHouses(houses.filter(h => h._id !== id));
  };

  return (
    <Container
      sx={{
        th: {
          textAlign: "center !important",
        },
        td: {
          textAlign: "center",
        },
      }}
    >
      {error && (
        <Alert
          title="Login Issue!"
          color="red"
          withCloseButton
          closeButtonLabel="Close alert"
          onClose={() => setError(false)}
        >
          {errorMessage ||
            "Something terrible happened! Please try and login again."}
        </Alert>
      )}
      <Title order={2}>Dormitories</Title>
      {loading ? (
        <Center>
          <Loader variant="dots" />
        </Center>
      ) : (
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Dorm Name</th>
              <th>Price Per Semester</th>
              <th>Approved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dorms && dorms.length > 0 ? (
              <Rows
                elems={dorms}
                type="dorm"
                setErrorMessage={setErrorMessage}
                delCB={deleteDorm}
              />
            ) : (
              <tr>
                <td colSpan={4}>No dorms found</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <Title order={2}>Houses</Title>
      {loading ? (
        <Center>
          <Loader variant="dots" />
        </Center>
      ) : (
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>House Name</th>
              <th>Price Per Semester</th>
              <th>Approved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {houses && houses.length > 0 ? (
              <Rows
                elems={houses}
                type="home"
                setErrorMessage={setErrorMessage}
                delCB={deleteHouse}
              />
            ) : (
              <tr>
                <td colSpan={4}>No houses found</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default WithManager(Index);
