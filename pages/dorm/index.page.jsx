import {
  Alert,
  Center,
  Container,
  Group,
  Pagination,
  Space,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import React from "react";
import { AlertCircle, Search } from "tabler-icons-react";
import DormCard from "../../components/Cards/DormCard";
import { fetchDorms } from "../../utils/axiosRequests";

const pageSize = 9;
export async function getServerSideProps(context) {
  const res = await fetchDorms({
    search: context.query.s,
    pageNumber: context.query.p,
    pageSize,
  });

  return {
    props: {
      data: {
        ...res.data,
      },
    },
  };
}

const Index = props => {
  const { data } = props;
  const { dorms, page, pages } = data;

  const router = useRouter();
  const currentSearch = router?.query?.s;

  const form = useForm({
    initialValues: {
      search: currentSearch || "",
    },

    validate: {
      search: value =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
    },
  });

  const changePageHandler = ({
    newSearch = form.values.search,
    newPage = page,
  }) => {
    const queries = {};

    if (newSearch) {
      queries.s = newSearch;
    }
    if (newPage && newPage !== page) {
      queries.p = newPage;
    }

    router.push({
      pathname: "/dorm",
      query: queries,
    });
  };

  const handleSearch = s => {
    changePageHandler({ newSearch: s.search });
  };
  const handlePageChange = p => {
    changePageHandler({ newPage: p });
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

      {dorms && dorms.length > 0 ? (
        <>
          <Center size="xl" py="md" spacing="xs">
            <Group>
              {dorms.map(dorm => {
                const { _id: id } = dorm;
                return <DormCard key={id} {...dorm} />;
              })}
            </Group>
          </Center>
          <Center>
            <Pagination
              total={pages}
              initialPage={page}
              onChange={handlePageChange}
              withEdges
            />
          </Center>
        </>
      ) : (
        <Center>
          <Alert icon={<AlertCircle size={16} />} title="Bummer!" color="red">
            Sorry but no Dorm has been found.
            <Space />
            Please try different parameters
          </Alert>
        </Center>
      )}
    </div>
  );
};

export default Index;
