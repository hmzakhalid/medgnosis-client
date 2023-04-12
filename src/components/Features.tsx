import {
  Container,
  Title,
  Text,
  Group,
  ActionIcon,
  Stack,
  Card,
} from "@mantine/core";
import {
  Icon3dCubeSphere,
  IconAtom,
  IconHierarchy,
  IconShieldCheck,
} from "@tabler/icons-react";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card
      className="mx-4 flex h-[20rem] w-[17rem] justify-center bg-gray-600/25 py-8 align-middle"
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
    >
      <Stack className="items-center text-center">
        <div className="text-white">
            {icon}
        </div>
        <Text
          variant="light"
          color="violet"
          className="text-lg font-semibold text-tertiary"
        >
          {title}
        </Text>
        <Text
          size="sm"
          className="break-all px-4 text-justify text-secondary [text-align-last:center]"
        >
          {description}
        </Text>
      </Stack>
    </Card>
  );
};

const Features = () => {
  return (
    <Container size={"xl"} className="mb-32">
      <Stack className="flex items-center justify-center">
        <Text className="text-secondary">WHAT WE OFFER</Text>
        <Title order={1} color="white" className="text-5xl leading-tight">
          Features
        </Title>
        <Group position="apart" className="mt-16">
          <FeatureCard
            icon={<IconShieldCheck size="3rem" />}
            title="Privacy-Preserving"
            description="Our platform ensures that client data is protected at all times using advance cryptographic techniques, so you can be confident that your data is safe."
          />

          <FeatureCard
            icon={<Icon3dCubeSphere size="3rem" />}
            title="Decentralized"
            description="We use a peer-to-peer network to distribute the model training process across multiple clients, ensuring that no single entity has control over the model."
          />

          <FeatureCard
            icon={<IconAtom size="3rem" />}
            title="Flexible"
            description="Our platform is highly customizable, allowing clients to select the type of data they want to contribute and the level of participation they are comfortable with."
          />

          <FeatureCard
            icon={<IconHierarchy size="3rem" />}
            title="Secure Aggregation"
            description="Our platform uses a secure aggregation protocol to ensure that the model is trained on aggregated data, while preserving the privacy of each client."
          />
        </Group>
      </Stack>
    </Container>
  );
};

export default Features;
