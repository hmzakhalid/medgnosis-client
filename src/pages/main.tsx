import Head from "next/head";
import { useState, useEffect } from "react";
import {
  createStyles,
  useMantineTheme,
  Container,
  Text,
  ScrollArea,
  Table,
  Title,
  Button,
  Group,
  Card,
  Stack,
  Center,
} from "@mantine/core";
import Link from "next/link";
import Layout from "@/components/Layout";
import { IconExternalLink, IconEdit, IconTrash } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 120,
    paddingBottom: 80,

    "@media (max-width: 755px)": {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));


const InitialComponent = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.inner}>
      <Title className={classes.title}>
        Welcome to{" "}
        <Text component="span" color="violet" inherit>
          MedGnosis
        </Text>
        !
      </Title>

      <Container p={0} size={600}>
        <Text size="lg" color="dimmed" className={classes.description}>
          PLease add new Patients and their data.
        </Text>
      </Container>

      <div className={classes.controls}>
        <Link href="/patients">
          <Button
            className={classes.control}
            size="lg"
            variant="light"
            color="violet"
          >
            Predictions
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default function Home() {
  const { classes } = useStyles();
  const [globalModel, setGlobalModel] = useState();
  const [individualHashes, setIndividualHashes] = useState([]);


  
  useEffect(() => {
    const getMetrics = async () => {
      const response = await fetch("http://localhost:8000/metrics");
      const data = await response.json();
      console.log(data);
      setGlobalModel(data.global_model);
      setIndividualHashes(data.contributors.splice(0, 2));
    };
    getMetrics();
  }, []);

  return (
    <>
      <Head>
        <title>MedGnosis</title>
        <meta name="description" content="A Nextine főoldala." />
      </Head>

      <Layout>
        <Container className={classes.wrapper} size={1200}>
          {/* <InitialComponent /> */}
          <Title
            className={classes.title}
            style={{  marginBottom: 20 }}
          >
            Metrics
          </Title>

    <Center>
          <Stack>
            <Card shadow="sm" padding="md" style={{ width: 500 }}>
              <Text size="xl" weight={700}>
                Global Model
              </Text>
              <Text size="sm" color="dimmed">
                {globalModel}
              </Text>
            </Card>
            <Card shadow="sm" padding="md" style={{ width: 500 }}>
              <Text size="xl" weight={700}>
                Individual Hashes
              </Text>
              <Text size="sm" color="dimmed">
                {individualHashes.map((hash, idx) => (
                  <div key={idx}>{hash}</div>
                ))}
              </Text>
            </Card>
          </Stack>
          </Center>

        </Container>
      </Layout>
    </>
  );
}
