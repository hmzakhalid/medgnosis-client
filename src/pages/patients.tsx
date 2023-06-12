import Head from "next/head";
import { set, z } from "zod";
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

import { api } from "@/utils/api";

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
  name: string;
  age: number;
  gender: number;
  height: number;
  weight: number;
  ap_high: number;
  ap_low: number;
  cholesterol: number;
  glucose: number;
  smoke: boolean;
  alcohol: boolean;
  physical_activity: boolean;
  cardio_disease: boolean;
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

const displayTable = (tableRows: CardioData[]) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>NAME</th>
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
            <td>{row.name}</td>
            <td>{row.age}</td>
            <td>{row.gender ? "Male" : "Female"}</td>
            <td>{row.height}</td>
            <td>{row.weight}</td>
            <td>{row.ap_high}</td>
            <td>{row.ap_low}</td>
            <td>{row.cholesterol}</td>
            <td>{row.glucose}</td>
            <td>{row.smoke ? "Yes" : "No"}</td>
            <td>{row.alcohol ? "Yes" : "No"}</td>
            <td>{row.physical_activity ? "Yes" : "No"}</td>
            <td>
              {row.cardio_disease ? (
                <Text color="red"> Yes </Text>
              ) : (
                <Text color="green"> No </Text>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

interface PredictionsResponse {
  predictions: number[];
}


export default function Home() {
  const { classes } = useStyles();
  const [tableRows, setTableRows] = useState<CardioData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  api.main.getPatients.useQuery(undefined, {
    onSuccess: (data: CardioData[]) => {
      console.log("data", data);
      setTableRows(data);
      const filteredData = data.map((item) => ({
        age: item.age,
        gender: item.gender,
        height: item.height,
        weight: item.weight,
        ap_high: item.ap_high,
        ap_low: item.ap_low,
        cholesterol: item.cholesterol,
        glucose: item.glucose,
        smoke: item.smoke,
        alcohol: item.alcohol,
        physical_activity: item.physical_activity,
      }));
      
      const arrayOfArrays = filteredData.map(item => Object.values(item));


      const fetchPrediction = async () => {
        try {
          const response = await fetch("http://localhost:8000/predict", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: arrayOfArrays }),
          });

          const pData: PredictionsResponse = await response.json();
          const { predictions } = pData;

          const predictionData= data.map((item, index) => ({
            ...item,
            cardio_disease: predictions[index],
          }));
          setTableRows(predictionData);

          console.log("Prediction data", predictionData);
    
        } catch (error) {
          console.error("Error fetching prediction:", error);
        }
      };

      fetchPrediction().then(() => {
        console.log("Prediction done");
      }).catch((error) => {
        console.log("Prediction failed");
      });
    },
  });

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
              Patients Data
            </Title>
            <ScrollArea h={400} className="my-8">
              {displayTable(tableRows)}
            </ScrollArea>
          </>
        ) : (
          loading && <Loader />
        )}
      </Layout>
    </>
  );
}
