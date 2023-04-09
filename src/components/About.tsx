import { Container, Stack, Title, Text } from "@mantine/core";
const About = () => {
  return (
    <Container size={"md"}>
      <Stack className="flex items-center justify-center">
        <Stack className="text-center">
          <Text className="text-secondary">ABOUT</Text>
          <Title order={1} color="white" className="text-5xl leading-tight">
            About MedGnosis
          </Title>
          <Text
            size={"lg"}
            className=" text-justify text-secondary [text-align-last:center]"
          >
            MedGnosis is a decentralized platform for medical diagnosis using
            machine learning algorithms. Our platform aims to provide reliable,
            efficient, and privacy-preserving medical diagnoses to patients.
          </Text>

          <Text
            size={"lg"}
            className=" text-justify text-secondary [text-align-last:center]"
          >
            The platform uses a secure aggregation protocol to protect patient
            privacy while allowing for the aggregation of medical data from
            multiple sources. This approach enables the creation of a robust and
            accurate machine learning model that can make accurate diagnoses,
            even with limited data.
          </Text>
          <Text
            size={"lg"}
            className=" text-justify text-secondary [text-align-last:center]"
          >
            At MedGnosis, we believe that decentralized technology can
            revolutionize the healthcare industry by providing patients with
            more control over their data and allowing medical professionals to
            collaborate more effectively. By leveraging the power of blockchain
            and machine learning, we are committed to creating a more secure,
            transparent, and patient-centered healthcare system.
          </Text>

          <Text
            size={"lg"}
            className=" text-justify text-secondary [text-align-last:center]"
          >
            Join us on our mission to improve healthcare outcomes and empower
            patients by using the latest decentralized technologies.
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
};


export default About;