import {
  Button,
  Group,
  // eslint-disable-next-line no-unused-vars
  MantineTheme,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  Dropzone,
  // eslint-disable-next-line no-unused-vars
  DropzoneStatus,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import React, { useState } from "react";
import { Photo, Upload, X } from "tabler-icons-react";
import { Notifications as message } from "../../utils/Notifications";

/**
 * @param {DropzoneStatus} status
 * @param {MantineTheme} theme
 */
const getIconColor = (status, theme) =>
  status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];

/**
 *
 * @param {{status: DropzoneStatus}}
 * @returns
 */
const ImageUploadIcon = ({ status, ...props }) => {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
};

const dropzoneChildren = (status, theme) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: "none" }}
  >
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={80}
    />

    <div>
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
);

const Index = props => {
  const theme = useMantineTheme();
  const MAX_FILE_SIZE = 3 * 1024 ** 2;
  const { successCallBack, errorCallBack } = props;

  const [files, setFiles] = useState(/** @type {File[]} */ []);
  const [uploadedImage, setUploadedImage] = useState(
    /** @type {{name: string, url: string}[]} */ [],
  );

  /**
   * Verifies the File
   *
   * @param {File} fileToCheck
   * @return {boolean}
   */
  async function checkSetFile(fileToCheck) {
    if (!fileToCheck) {
      message.error("No file selected");
      return false;
    }

    // check if file is an image
    if (!fileToCheck.type.match("image/")) {
      message.error("File must be an image");
      return false;
    }

    // check if file is larger than 1mb
    if (fileToCheck.size > MAX_FILE_SIZE) {
      message.error("File is larger than 1mb");
      return false;
    }

    return true;
  }

  /**
   * Handles file dropping
   *
   * @param {File[]} fileList
   */
  async function handleFileDrop(fileList) {
    fileList.forEach(async curr => {
      const res = checkSetFile(curr);
      if (res) {
        const file = {
          file: curr,
          preview: URL.createObjectURL(curr),
          name: `${curr.name}+-+${new Date().toDateString()}`,
          type: curr.type,
        };

        setFiles([...files, file]);
      }
    });
    // message.success("File selected successfully");
  }

  /**
   * @param {File} fileToUpload
   */
  async function handleFileUpload(fileToUpload) {
    const formData = new FormData();

    formData.append("file", fileToUpload);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

    const options = { method: "POST", body: formData };

    fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, options)
      .then(res => res.json())
      .then(res => {
        const { secure_url: secureUrl } = res;
        if (secureUrl) {
          setUploadedImage([
            ...uploadedImage,
            { ...fileToUpload, url: secureUrl },
          ]);

          message.success("Image Uploaded");

          if (successCallBack) successCallBack(secureUrl);
        } else {
          message.error("An error has occured. Please try again");
        }
      })
      .catch(err => {
        message.error("An error has occured. Please try again");
        if (errorCallBack) errorCallBack(err);
      });
  }

  async function submitFiles() {
    if (!files && files.length < 0) {
      message.error("No file selected");
      return;
    }

    files.forEach(curr => {
      handleFileUpload(curr);
    });
  }

  // eslint-disable-next-line no-unused-vars
  async function parseImageBlob(preview) {
    return fetch(preview)
      .then(r => r.blob())
      .then(
        blobFile =>
          new File([blobFile], new Date().toDateString(), {
            type: preview.type,
            ...preview,
          }),
      )
      .then(res => res);
  }

  return (
    <Group direction="column" align="center">
      <Dropzone
        onDrop={fileList => handleFileDrop(fileList)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        {status => dropzoneChildren(status, theme)}
      </Dropzone>
      <Button align="right" onClick={() => submitFiles}>
        Upload
      </Button>
    </Group>
  );
};

export default Index;
