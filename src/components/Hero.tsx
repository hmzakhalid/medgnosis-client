import { Container, Title, Button, Text, Group, Stack } from "@mantine/core";
import Link from "next/link";

const Hero = () => {
  return (
    <Container size={"xl"} className="relative h-screen">
      <Group className="grid grid-cols-2 gap-8 py-44">
        <Group>
          <Stack>
            <Title order={1} color="white" className="text-5xl leading-tight">
              Decentralized Federated Learning <br /> for Medical Diagnosis
            </Title>
            <Text size={"lg"} className="text-secondary">
              MedGnosis is a cutting-edge, decentralized platform that provides
              secure and privacy-preserving collaborative medical machine
              learning using peer-to-peer federated learning.
            </Text>
            <Link href="/main">
            <Button
              radius="md"
              size="md"
              className="w-36 text-violet-300 bg-violet-700/25 hover:bg-violet-700/40"
            >
              Get Started
            </Button>
            </Link>
          </Stack>
        </Group>
        <Group></Group>
      </Group>
    </Container>
  );
};

export default Hero;
