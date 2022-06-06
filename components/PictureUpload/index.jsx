/// <reference path="../../types/typedefs.js" />
import {
  Group,
  // eslint-disable-next-line no-unused-vars
  MantineTheme,
  useMantineTheme,
} from "@mantine/core";
import {
  Dropzone,
  // eslint-disable-next-line no-unused-vars
  DropzoneStatus,
} from "@mantine/dropzone";
import React from "react";
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

const dropzoneChildren = (status, theme, child) => (
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

    {child}
  </Group>
);

/**
 * @param {{
 *    files: File[],
 *    setFiles: (files: File[]) => void,
 *    onDrop?: (files: File[]) => void,
 *    onDropRejected?: (fileRejects: FileRejection[]) => void,
 *    child?: React.ReactNode,
 *    FILE_TYPE: string[],
 *    MAX_FILE_SIZE: number,
 * }} props
 */
const Index = props => {
  const theme = useMantineTheme();
  const {
    files,
    setFiles,
    MAX_FILE_SIZE,
    FILE_TYPE,
    child,
    onDrop,
    onDropRejected,
  } = props;

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

    return true;
  }

  /**
   * Handles the file upload rejections
   * @param {FileRejection[]} RejectedFiles
   */
  function handleFileUploadRejection(RejectedFiles) {
    if (onDropRejected) {
      onDropRejected(RejectedFiles);
    }

    if (RejectedFiles.length > 0) {
      message.error("No file selected");
    }

    RejectedFiles.forEach(({ file, errors }) => {
      let errStr = `For ${file.name}:`;

      errors.forEach(err => {
        if (err.code === "file-too-large") {
          errStr += " File is too big. Max file size is 5MB.";
        }
        if (err.code === "file-invalid-type") {
          errStr += " - File type not allowed.";
        }
      });

      message.error(errStr);
    });
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

    if (onDrop) {
      onDrop(fileList);
    }
  }

  return (
    <Dropzone
      onDrop={FILES => handleFileDrop(FILES)}
      onReject={FILES => handleFileUploadRejection(FILES)}
      maxSize={MAX_FILE_SIZE}
      accept={FILE_TYPE}
    >
      {status => dropzoneChildren(status, theme, child)}
    </Dropzone>
  );
};

export default Index;
