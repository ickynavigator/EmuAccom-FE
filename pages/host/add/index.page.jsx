import {
  Alert,
  Button,
  Container,
  Divider,
  Group,
  Image,
  NumberInput,
  Paper,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { getNames } from "country-list";
import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { CurrencyLira } from "tabler-icons-react";
import PictureUpload from "../../../components/PictureUpload";
import { store } from "../../../context/store";
import WithManager from "../../../HOC/withManager";
import { addNewDorm, addNewHome } from "../../../utils/axiosRequests";
import { handleFileUpload } from "../../../utils/cloudinary";
import Notifications from "../../../utils/Notifications";
import {
  NumberInputCurrencyFormatter,
  NumberInputCurrencyParser,
  stringToKeywords,
} from "../../../utils/stringTools";

const Index = () => {
  const { state } = useContext(store);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imageUploadDisabled, setImageUploadDisabled] = useState(true);
  const [propertyType, setPropertyType] = useState("dorm");
  const countries = getNames();

  const formDetails = useForm({
    initialValues: {
      name: "",
      description: "",
      addressLine: "",
      city: "",
      postalCode: "",
      country: "Cyprus",
      bedCount: 0,
      bedroomCount: 0,
      bathroomCount: 0,
      accomodateCount: 0,
      availabilityCount: 0,
      pricePerSemester: 0,
      pricePerNight: 0,
      pictures: [],
      keywords: "",
      management: "",
    },
    validate: {
      name: value => (value.length > 0 ? null : "Name is required"),
      description: value =>
        value.length > 0 ? null : "Description is required",
      addressLine: value => (value.length > 0 ? null : "Address is required"),
      city: value => (value.length > 0 ? null : "City is required"),
      postalCode: value =>
        value.length > 0 ? null : "Postal code is required",
      country: value => (value.length > 0 ? null : "Country is required"),
      bedCount: value => (value > 0 ? null : "Bed count is required"),
      bedroomCount: value => (value > 0 ? null : "Bedroom count is required"),
      bathroomCount: value => (value > 0 ? null : "Bathroom count is required"),
      accomodateCount: value => (value > 0 ? null : "Guest count is required"),
      availabilityCount: value =>
        value > 0 ? null : "Availability count is required",
      pricePerSemester: value =>
        value > 0 ? null : "Price per semester is required",
      pricePerNight: value =>
        value > 0 ? null : "Price per night is required",
    },
  });

  async function uploadImages() {
    if (!files && files.length < 1) {
      Notifications.error("No file selected");
      return;
    }

    const fileForForm = [];

    files.forEach(async curr => {
      await handleFileUpload({
        fileToUpload: curr.file,
        successCB: secureUrl => {
          setUploadedFiles([...uploadedFiles, secureUrl]);
          setFiles([]);
          fileForForm.push({ url: secureUrl, description: curr.file.name });
        },
      });
    });

    formDetails.setFieldValue("pictures", fileForForm);
  }

  /** @param {typeof formDetails.values} values */
  const handleSubmit = async values => {
    const form = {
      name: values.name,
      description: values.description,
      address: {
        addressLine: values.addressLine,
        city: values.city,
        postalCode: values.postalCode,
        country: values.country,
      },
      bedCount: values.bedCount,
      bedroomCount: values.bedroomCount,
      bathroomCount: values.bathroomCount,
      accomodateCount: values.accomodateCount,
      availabilityCount: values.availabilityCount,
      pricePerSemester: values.pricePerSemester,
      pricePerNight: values.pricePerNight,
      pictures: values.pictures,
      keywords: stringToKeywords(values.keywords),
      management: state.manager.id,
      approved: false,
    };

    const res = await (propertyType === "dorm"
      ? addNewDorm(form)
      : addNewHome(form));

    if (res.status === 201) {
      Notifications.success("Property added successfully");

      setError(false);
      setErrorMessage("");

      setUploadedFiles([]);
      setFiles([]);

      formDetails.reset();
    } else {
      setError(true);
      setErrorMessage(res.response.data.message);
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      setImageUploadDisabled(false);
    } else {
      setImageUploadDisabled(true);
    }
  }, [files]);

  const defaultNumberInputProps = {
    parser: NumberInputCurrencyParser,
    formatter: NumberInputCurrencyFormatter,
    icon: <CurrencyLira />,
  };

  return (
    <Container mx="auto">
      {error && (
        <Alert
          title="Signup Issue!"
          color="red"
          withCloseButton
          closeButtonLabel="Close alert"
          onClose={() => setError(false)}
        >
          {errorMessage || "Something terrible happened! Please try again."}
        </Alert>
      )}

      <Title align="center">Add a new property</Title>

      <form onSubmit={formDetails.onSubmit(handleSubmit)}>
        <Select
          label="Property Type"
          placeholder="Pick property"
          data={[
            { value: "dorm", label: "Dormitory" },
            { value: "home", label: "Home" },
          ]}
          value={propertyType}
          onChange={value => setPropertyType(value)}
        />
        <TextInput
          required
          id="name"
          label="Property name"
          placeholder="Property Name"
          {...formDetails.getInputProps("name")}
        />
        <Textarea
          required
          autosize
          minRows={2}
          maxRows={4}
          id="description"
          label="Property description"
          placeholder="Property description"
          {...formDetails.getInputProps("description")}
        />

        <Divider
          mt="md"
          mb="xs"
          variant="dashed"
          labelPosition="center"
          label={<Title order={2}>Address</Title>}
        />

        <TextInput
          required
          id="addressLine"
          label="Address Line"
          placeholder="Enter address line"
          {...formDetails.getInputProps("addressLine")}
        />
        <TextInput
          required
          id="city"
          label="City"
          placeholder="Enter city"
          {...formDetails.getInputProps("city")}
        />
        <TextInput
          required
          id="postalCode"
          label="Postal Code"
          placeholder="Enter postal code"
          {...formDetails.getInputProps("postalCode")}
        />
        <Select
          required
          searchable
          id="country"
          label="Country"
          placeholder="Select country"
          data={countries}
          {...formDetails.getInputProps("country")}
        />

        <Divider mt="md" mb="xs" variant="dashed" />

        <NumberInput
          required
          id="bedroomCount"
          label="Bedroom Count"
          placeholder="Enter bedroom count"
          {...formDetails.getInputProps("bedroomCount")}
        />
        <NumberInput
          required
          id="bedcount"
          label="Bed Count"
          placeholder="Enter bed count"
          {...formDetails.getInputProps("bedCount")}
        />
        <NumberInput
          required
          id="bathroomCount"
          label="Bathroom Count"
          placeholder="Enter bathroom count"
          {...formDetails.getInputProps("bathroomCount")}
        />
        <NumberInput
          required
          id="guestCount"
          label="Guest Count"
          placeholder="Enter max guest amount"
          {...formDetails.getInputProps("accomodateCount")}
        />
        <NumberInput
          required
          id="availabilityCount"
          label="Availability Count"
          placeholder="Enter amount of properties left"
          {...formDetails.getInputProps("availabilityCount")}
        />
        <NumberInput
          required
          id="pricePerSemester"
          label="Price Per Semester"
          placeholder="Enter price per semester"
          {...defaultNumberInputProps}
          {...formDetails.getInputProps("pricePerSemester")}
        />
        <NumberInput
          required
          id="pricePerNight"
          label="Price Per Night"
          placeholder="Enter price per night"
          {...defaultNumberInputProps}
          {...formDetails.getInputProps("pricePerNight")}
        />

        <Divider mt="md" mb="xs" variant="dashed" />

        <TextInput
          id="keywords"
          label="Keywords"
          placeholder="Enter Keywords"
          description="Enter a comma (,) to separate"
          {...formDetails.getInputProps("keywords")}
        />

        <Group direction="column" align="center" my="md">
          <PictureUpload
            files={files}
            setFiles={setFiles}
            MAX_FILE_SIZE={5 * 1024 ** 2}
            FILE_TYPE={IMAGE_MIME_TYPE}
            child={
              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            }
          />
          {files && files.length > 0 && (
            <>
              <Paper shadow="xl" radius="md" p="xl" withBorder>
                <Carousel showArrows showThumbs={false} showStatus={false}>
                  {files?.map(file => (
                    <div key={file.name}>
                      <Image
                        src={file.preview}
                        fit="contain"
                        // withPlaceholder
                        // placeholder={<Text align="center">{imgDesc}</Text>}
                      />
                    </div>
                  ))}
                </Carousel>
              </Paper>
              <Button
                align="right"
                onClick={() => uploadImages()}
                disabled={imageUploadDisabled}
              >
                Upload
              </Button>
            </>
          )}
        </Group>

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Container>
  );
};

export default WithManager(Index);
