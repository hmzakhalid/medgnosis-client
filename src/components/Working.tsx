import { Container, Title, Text, Stack } from "@mantine/core";
import { IconCircle } from "@tabler/icons-react";

const TimeLineItem = ({
  leadingText,
  title,
  description,
  variant,
}: {
  leadingText: string;
  title: string;
  description: string;
  variant: "left" | "right";
}) => {
  return (
    <div
      className={
        `mb-8 flex w-full items-center justify-between` +
        (variant === "right" ? "" : " flex-row-reverse")
      }
    >
      <div className="order-1 w-5/12">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
          <IconCircle size={24} />
        </div>
      </div>
      <div
        className={`order-1 w-5/12 px-1 py-4 text-${
          variant === "left" ? "right" : "left"
        }`}
      >
        <Text className="mb-3 text-base text-secondary">{leadingText}</Text>
        <h4 className="mb-3 text-lg font-semibold text-tertiary md:text-2xl">
          {title}
        </h4>
        <Text className="text-gray-50 text-opacity-100 md:text-base">
          {description}
        </Text>
      </div>
    </div>
  );
};

const Working = () => {
  return (
    <Container size={"md"} className="mb-12">
      <Stack className="flex items-center justify-center">
        <Stack className="text-center">
          <Text className="text-secondary">WORKING</Text>
          <Title order={1} color="white" className="text-5xl leading-tight">
            How it works
          </Title>
          <Text
            size={"lg"}
            className=" text-justify text-secondary [text-align-last:center]"
          >
            Our platform uses a technique called Federated Learning to train
            machine learning models on data from multiple sources, without the
            need to centralize the data in one place. This means that the
            privacy of the data is preserved, and the data never leaves the
            clients device. On top of that, we use a decentralized
            blockchain-based architecture to ensure that the data is not
            tampered with, and that the model is not maliciously modified.
          </Text>
        </Stack>
        <section>
          <div className="py-8 text-white">
            <div className="mx-auto flex flex-col items-start justify-center md:flex-row">
              <div className="container mx-auto h-full w-full">
                <div className="wrap relative h-full overflow-hidden p-10">
                  <div
                    className="absolute h-full"
                    style={{
                      left: "50%",
                      border: "1px solid #cdc0fa",
                      borderRadius: "1%",
                    }}
                  ></div>

                  <TimeLineItem
                    leadingText="Initial Parameters"
                    title="Request Global Model"
                    description="The client requests the global model from the blockchain and initializes the local model with the global parameters."
                    variant="left"
                  />

                  <TimeLineItem
                    leadingText="Training"
                    title="Train Local Model"
                    description="The client receives the global model from the blockchain and trains the model on the local data."
                    variant="right"
                  />

                  <TimeLineItem
                    leadingText="Sign and Send"
                    title="IPFS Upload"
                    description="The client signs the local model with the private key and uploads the model to IPFS for non-repudiation."
                    variant="left"
                  />

                  <TimeLineItem
                    leadingText="Aggregation"
                    title="Global Model Aggregation"
                    description="The server receives the local models from the clients and aggregates them to create a new global model."
                    variant="right"
                  />

                  <TimeLineItem
                    leadingText="Update"
                    title="Update Global Model"
                    description="The server updates the global model on the blockchain and sends the new global model to the clients."
                    variant="left"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Stack>
    </Container>
  );
};

export default Working;
