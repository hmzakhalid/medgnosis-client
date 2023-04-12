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

const MOCKUP_USERS = [
  {
    name: "John Doe",
    age: "24",
    gender: "Male",
    CARDIO_DISEASE: "Yes",
  },
  {
    name: "Jane Doe",
    age: "24",
    gender: "Female",
    CARDIO_DISEASE: "No",
  },
];

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
  const [patients, setUsers] = useState(MOCKUP_USERS); // props.patients
  const [tableRows, setTableRows] = useState([]);

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
            style={{ textAlign: "center", marginBottom: 20 }}
          >
            Predictions
          </Title>

          {patients.length > 0 ? (
            <ScrollArea>
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Prediction</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((user, idx) => (
                    <tr key={idx}>
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td>{user.gender}</td>
                      <td>{user.CARDIO_DISEASE}</td>
                      <td>
                        <Link href={`/patients/${user.name}`} className="mx-1">
                          <IconExternalLink />
                        </Link>

                        <Link href={`/patients/${user.name}/edit`} className="mx-1">
                          <IconEdit />
                        </Link>

                        <Link href={`/patients/${user.name}/delete`} className="mx-1">
                          <IconTrash color="red" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ScrollArea>
          ) : (
            <Text align="center" weight="bold">
              Nincs megjeleníthető adat.
            </Text>
          )}
        </Container>
      </Layout>
    </>
  );
}
