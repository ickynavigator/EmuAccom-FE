import { Container, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import React from "react";
import { Search } from "tabler-icons-react";
import { fetchDorms } from "../utils/axiosRequests";

export async function getServerSideProps(context) {
  const res = await fetchDorms({
    search: context.query.s,
    pageNumber: context.query.p,
  });

  return {
    props: {
      data: res.data,
    },
  };
}

const Index = () => {
  const router = useRouter();
  const { s: search } = router.query;

  const form = useForm({
    initialValues: {
      search,
    },

    validate: {
      search: value =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
    },
  });

  const handleSearch = e => {
    console.log(e);
  };

  return (
    <div>
      <Container size="xs" px="xs">
        <form onSubmit={form.onSubmit(handleSearch)}>
          <Group align="end" position="center" grow>
            <TextInput
              icon={<Search />}
              label="Search"
              radius="xl"
              size="md"
              placeholder="Search for a home"
              {...form.getInputProps("search")}
            />
          </Group>
        </form>
      </Container>
    </div>
  );
};

export default Index;
