import { Accordion, AccordionItem, Container, Title } from "@mantine/core";
import React from "react";

const Index = () => {
  const [queries] = React.useState([
    {
      question: "What is EmuAccom? Why should I use this service?",
      answer:
        "EmuAccom is an accommodation service built under the roof of Eastern Mediterranean University, connecting our students with dormitory companies and homeowners. By using this service, our university students can quickly and reliably choose the dormitories and rental houses that are suitable for them.",
    },
    {
      question: "How can I post a advertisements?",
      answer:
        "Hosts can register directly on our website and post their advertisements.",
    },
    {
      question: "How does the Eastern Mediterranean University control posts?",
      answer:
        "Our university meticulously examines every posting on EmuAccom, whether it is suitable for our students or not, after passing the decision committee, it continues to advertise on our site.",
    },
    {
      question: "I forgot my password, what should I do?",
      answer:
        "You can update your password from the registration offices of our university.",
    },
  ]);

  return (
    <Container>
      <Title>Frequently Asked Questions</Title>
      <Accordion>
        {queries.map(({ question, answer }) => (
          <AccordionItem key={question} label={question}>
            {answer}
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};

export default Index;
