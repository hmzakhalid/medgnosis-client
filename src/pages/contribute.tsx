import Head from "next/head";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  createStyles,
  Container,
  Text,
  Table,
  Group,
  rem,
  Loader,
  Stack,
  Title,
  Button,
  Center,
  ScrollArea,
} from "@mantine/core";
import Layout from "@/components/Layout";
import { IconFileAnalytics, IconUpload, IconX } from "@tabler/icons-react";

import { Dropzone, type FileWithPath, MIME_TYPES } from "@mantine/dropzone";

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

type CardioData = {
  id: number;
  age: string | undefined;
  gender: string | undefined;
  height: string | undefined;
  weight: string | undefined;
  ap_high: string | undefined;
  ap_low: string | undefined;
  cholesterol: string | undefined;
  glucose: string | undefined;
  smoke: string | undefined;
  alcohol: string | undefined;
  physical_activity: string | undefined;
  cardio_disease: string | undefined;
};

const CSVtoTable = (csv: string) => {
  const rows = csv.split("\n");
  rows.shift();
  rows.splice(100, rows.length - 100);
  const tableRows = rows.map((row, id) => {
    const cells = row.split(",");
    return {
      id: id,
      age: cells[0],
      gender: cells[1],
      height: cells[2],
      weight: cells[3],
      ap_high: cells[4],
      ap_low: cells[5],
      cholesterol: cells[6],
      glucose: cells[7],
      smoke: cells[8],
      alcohol: cells[9],
      physical_activity: cells[10],
      cardio_disease: cells[11],
    };
  });
  return tableRows;
};

const DropzoneComponent = ({
  setTableRows,
  setFile,
}: {
  setTableRows: (tableRows: CardioData[]) => void;
  setFile: (file: FileWithPath) => void;
}) => {
  const { classes } = useStyles();

  const handleDrop = (files: FileWithPath[]) => {
    if (files[0]) {
      console.log("dropped file", files[0]);
      setFile(files[0]);
      const reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = (e) => {
        const text = (e.target?.result as string) || "";
        const tableRows = CSVtoTable(text);
        setTableRows(tableRows);
      };
    }
  };

  return (
    <>
      <Title
        className={classes.title}
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        Upload Data and Start Training
      </Title>
      <Dropzone
        maxFiles={1}
        onDrop={handleDrop}
        onReject={(files) => console.log("rejected files", files)}
        accept={[MIME_TYPES.csv]}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(220), pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload size="3.2rem" stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size="3.2rem" stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFileAnalytics size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag CVS here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
    </>
  );
};

const displayTable = (tableRows: CardioData[]) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>AGE</th>
          <th>GENDER</th>
          <th>HEIGHT</th>
          <th>WEIGHT</th>
          <th>AP_HIGH</th>
          <th>AP_LOW</th>
          <th>CHOLESTEROL</th>
          <th>GLUCOSE</th>
          <th>SMOKE</th>
          <th>ALCOHOL</th>
          <th>PHYSICAL_ACTIVITY</th>
          <th>CARDIO_DISEASE</th>
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row) => (
          <tr key={row.id}>
            <td>{row.age}</td>
            <td>{row.gender}</td>
            <td>{row.height}</td>
            <td>{row.weight}</td>
            <td>{row.ap_high}</td>
            <td>{row.ap_low}</td>
            <td>{row.cholesterol}</td>
            <td>{row.glucose}</td>
            <td>{row.smoke}</td>
            <td>{row.alcohol}</td>
            <td>{row.physical_activity}</td>
            <td>{row.cardio_disease}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default function Home() {
  const { classes } = useStyles();
  const [tableRows, setTableRows] = useState<CardioData[]>([]);
  const [file, setFile] = useState<FileWithPath>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleStartTraining = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);
      setTableRows([]);
      setFile(undefined);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 8000);
    } catch (error) {
      console.error("Error starting training:", error);
    }
  };


  return (
    <>
      <Head>
        <title>MedGnosis</title>
        <meta name="description" content="A Nextine főoldala." />
      </Head>

      <Layout>
        {tableRows.length > 0 ? (
          <>
            <Title
              className={classes.title}
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              Preview Data
            </Title>
            <ScrollArea h={400} className="my-8">
              {displayTable(tableRows)}
            </ScrollArea>
            <Center>
              <Button
                className="mx-2"
                color="red"
                variant="light"
                onClick={() => {
                  setTableRows([]);
                  setFile(undefined);
                }}
              >
                Reset
              </Button>
              <Button
                className="mx-2"
                color="violet"
                variant="light"
                onClick={handleStartTraining}
              // onClick={() => {
              //   setTableRows([]);
              //   setFile(undefined);
              // }}
              >
                Start Training
              </Button>
            </Center>
          </>
        ) : (
          loading ?
            <div className="flex flex-col justify-center items-center align-middle">
                <Title
                  className={classes.title}
                  style={{ textAlign: "center", marginBottom: 20 }}
                >
                  Training in Progress
                </Title>
                <Loader variant="dots" size="xl" color="white" />
            </div> :
            <DropzoneComponent setTableRows={setTableRows} setFile={setFile} />
        )}
      </Layout>
    </>
  );
}
