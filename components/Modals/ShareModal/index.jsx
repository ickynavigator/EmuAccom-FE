import {
  Button,
  Divider,
  Grid,
  Modal,
  Paper,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import React from "react";
import {
  BrandFacebook,
  BrandMessenger,
  BrandTwitter,
  BrandWhatsapp,
  Copy,
  Mail,
  Message,
} from "tabler-icons-react";

const Index = ({ opened, onClose, id, link }) => {
  const clipboard = useClipboard({ timeout: 500 });

  const shareOptions = [
    {
      name: "copylink",
      disabled: clipboard.copied,
      onClick: () => {
        clipboard.copy(link);
      },
      icon: <Copy />,
      text: "Copy Link",
      isShown: true,
    },
    {
      name: "mail",
      disabled: true,
      onClick: () => {},
      icon: <Mail />,
      text: "Mail",
      isShown: true,
    },
    {
      name: "messages",
      disabled: true,
      onClick: () => {},
      icon: <Message />,
      text: "Messages",
      isShown: true,
      iconColor: "blue",
    },
    {
      name: "whatsapp",
      disabled: true,
      onClick: () => {},
      icon: <BrandWhatsapp />,
      text: "Whatsapp",
      isShown: true,
      iconColor: "green",
    },
    {
      name: "messenger",
      disabled: true,
      onClick: () => {},
      icon: <BrandMessenger />,
      text: "Messenger",
      isShown: true,
      iconColor: "blue",
    },
    {
      name: "facebook",
      disabled: true,
      onClick: () => {},
      icon: <BrandFacebook />,
      text: "Facebook",
      isShown: true,
      iconColor: "blue",
    },
    {
      name: "twitter",
      disabled: true,
      onClick: () => {},
      icon: <BrandTwitter />,
      text: "Twitter",
      isShown: true,
      iconColor: "blue",
    },
  ];

  return (
    <Paper>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        closeOnClickOutside
        closeOnEscape
        id={`share-modal-${id}`}
        size="lg"
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        <Title align="center">Share this dorm with friends</Title>
        <Divider my="sm" variant="dashed" />
        <Grid columns={12}>
          {shareOptions.map(
            ({ name, isShown, disabled, onClick, text, icon, iconColor }) => {
              if (isShown) {
                return (
                  <Grid.Col span={6} key={name}>
                    <Button
                      fullWidth
                      disabled={disabled}
                      onClick={onClick}
                      size="xl"
                    >
                      <ThemeIcon
                        size={30}
                        variant="filled"
                        sx={theme => ({
                          backgroundColor: "transparent",
                          color: iconColor || theme.colors.primary,
                          border: "none",
                          textAlign: "center",
                        })}
                      >
                        {icon}
                      </ThemeIcon>
                      <Text>{text}</Text>
                    </Button>
                  </Grid.Col>
                );
              }
              return null;
            },
          )}
        </Grid>
      </Modal>
    </Paper>
  );
};

export default Index;
