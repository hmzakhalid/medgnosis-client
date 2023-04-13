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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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

// class Model(BaseModel):
//     globalModel: str
//     sessionId: str
//     accuracy: str
//     loss: str
//     rounds: int
//     strategy: str
//     contributors: List[dict]

type Contributor = {
  id: string;
  name: string;
};

type Model = {
  globalModel: string;
  sessionId: string;
  accuracy: string;
  loss: string;
  rounds: number;
  strategy: string;
  contributors: Array<Contributor>;
};

const ModelCharts = () => {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      const response = await fetch("http://localhost:8000/api/models");
      const data = await response.json();
      data.reverse();
      setModels(data);
    };

    fetchModels();
  }, []);

  return (
    <Stack>
      <div className="flex gap-8">
        <div>
          <h2 className="mb-4 ml-8">
            Global Accuracy:{" "}
            <span className="ml-8">{models[9]?.accuracy.slice(0, 6)}</span>
          </h2>
          <LineChart width={600} height={300} data={models} margin={{ top: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rounds" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <div>
          <h2 className="mb-4 ml-8">
            Global Loss:{" "}
            <span className="ml-8">{models[9]?.loss.slice(0, 6)}</span>
          </h2>
          <LineChart width={600} height={300} data={models} margin={{ top: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rounds" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="loss"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </div>
      <div>
        <Table>
          <thead>
            <tr>
              <th>Aggregated Hash </th>
              <th>Contributors</th>
              <th>Accuracy</th>
              <th>Loss</th>
              <th>Rounds</th>
              <th>Strategy</th>
            </tr>
          </thead>
          <tbody>
            {models
              .slice(0)
              .reverse()
              .filter((model) => model.globalModel) // Filter out empty entries
              .map((model, idx) => (
                <tr key={idx}>
                  <td>{model.globalModel}</td>
                  <td>{model.contributors.length}</td>
                  <td>{model.accuracy}</td>
                  <td>{model.loss}</td>
                  <td>{model.rounds}</td>
                  <td>{model.strategy}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </Stack>
  );
};

export default function Home() {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>MedGnosis</title>
        <meta name="description" content="A Nextine főoldala." />
      </Head>

      <Layout>
        {/* <InitialComponent /> */}
        <Title className={classes.title} style={{ marginBottom: 20 }}>
          Metrics
        </Title>

        <Center>
          <ModelCharts />
        </Center>
      </Layout>
    </>
  );
}
