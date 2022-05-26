/// <reference path="../../../types/typedefs.js" />
import {
  Alert,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Grid,
  Image,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { AlertCircle, Share, Star } from "tabler-icons-react";
import ShareModal from "../../../components/Modals/ShareModal";
import { fetchSingleHouseById } from "../../../utils/axiosRequests";
import { getRating } from "../../../utils/reviewHelpers";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetchSingleHouseById(id);

  return { props: { house: { ...res.data } } };
}

const Dot = () => <Box px={2}>&#xb7;</Box>;
const PaddedDivider = ({ pad = 25 }) => <Divider my={pad} />;

/**
 * @param {{
 *  house: Dormitory
 * }} props
 */
const Index = props => {
  const { house } = props;
  const [shareModalOpen, setshareModalOpen] = useState(false);
  let link = `/house/${house.id}`;
  if (typeof window !== "undefined") {
    link = window.location.href;
  }

  return (
    <div>
      {house ? (
        <Container>
          <Grid justify="space-between" align="center">
            <Grid.Col span={10}>
              <Title weight={700}>{house.name}</Title>
              <Text>
                <Center inline>
                  <Star size={16} />
                  {getRating(house.reviews)}
                  <Dot />
                  <Text underline>{house.reviews.length} reviews</Text>
                  <Dot />
                  <Text underline>
                    {house.address.addressLine}, {house.address.city},{" "}
                    {house.address.country}
                  </Text>
                </Center>
              </Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Button
                compact
                variant="subtle"
                radius="lg"
                onClick={() => setshareModalOpen(true)}
              >
                <Text weight={700} size="lg">
                  Share
                </Text>
                <Share size={15} />
              </Button>
              <ShareModal
                opened={shareModalOpen}
                onClose={() => setshareModalOpen(false)}
                id={house._id}
                link={link}
              />
            </Grid.Col>
          </Grid>
          <br />
          <Carousel showArrows showThumbs={false} showStatus={false}>
            {house.pictures.map(({ _id: id, description: imgDesc, url }) => (
              <Image key={id} src={url} alt={imgDesc} />
            ))}
          </Carousel>

          <>
            <br />
            <Text>{house.name}</Text>
            <br />
            <Center inline>
              <Text weight={600}>{house.bedroomCount} Bedrooms</Text> <Dot />
              <Text weight={600}>{house.bedCount} Beds</Text> <Dot />
              <Text weight={600}>{house.bathroomCount} Bathrooms</Text> <Dot />
              <Text weight={600}>{house.accomodateCount} Residents</Text>
            </Center>
            <PaddedDivider />
            <Title order={2}>Description</Title>
            <Text>{house.description}</Text>
            <PaddedDivider />
            <Title order={2}>What this place offers</Title>
            AMENITIES TO BE LISTED
            <PaddedDivider />
            <Title order={2}>Reviews</Title>
            <Text>
              <Center inline>
                <Star size={24} />
                <Text size="xl">{getRating(house.reviews)}</Text>
                <Dot />
                <Text underline size="xl">
                  {house.reviews.length} reviews
                </Text>
              </Center>
            </Text>
            {house.reviews.length > 0 ? (
              "not done"
            ) : (
              <Alert
                icon={<AlertCircle size={16} />}
                title="Bummer!"
                color="yellow"
                my={10}
              >
                No reviews yet
              </Alert>
            )}
            {/* Add reviews */}
            <PaddedDivider />
            <Title order={2}>Contact Info</Title>
            <Text>Fax: {"+905331234567 "}</Text>
            <Text>Phone: {"+905331234567 "}</Text>
            <Text>
              Mail: <a href="mailto:john@doe.com">john@doe.com</a>
            </Text>
          </>
        </Container>
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
