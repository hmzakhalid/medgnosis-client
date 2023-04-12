import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";
import { z } from "zod";
import { useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  createStyles,
  Container,
  Text,
  Title,
  Grid,
  Checkbox,
  Button,
  Paper,
  Select,
  TextInput,
} from "@mantine/core";

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
        You have no patients yet. Please add some.
      </Title>

      <Container p={0} size={600}>
        <Text size="lg" color="dimmed" className={classes.description}>
          PLease add new Patients and their data.
        </Text>
      </Container>

      <div className={classes.controls}>
        <Link href="/users">
          <Button
            className={classes.control}
            size="lg"
            variant="light"
            color="violet"
          >
            Add new Patient
          </Button>
        </Link>
      </div>
    </div>
  );
};

const cardioDataSchema = z.object({
  Name: z
    .string()
    .min(1, "Name must be at least 1 character long")
    .max(50, "Name must be less than or equal to 50 characters"),
  AGE: z
    .number()
    .min(1, "Age must be at least 1 year old")
    .max(120, "Age must be less than or equal to 120"),
  GENDER: z
    .number()
    .min(1, "Invalid gender value, use 1 for male or 2 for female")
    .max(2, "Invalid gender value, use 1 for male or 2 for female"),
  HEIGHT: z
    .number()
    .min(50, "Height must be at least 50 cm")
    .max(272, "Height must be less than or equal to 272 cm"),
  WEIGHT: z
    .number()
    .min(2, "Weight must be at least 2 kg")
    .max(635, "Weight must be less than or equal to 635 kg"),
  AP_HIGH: z
    .number()
    .min(50, "AP_HIGH must be at least 50")
    .max(300, "AP_HIGH must be less than or equal to 300"),
  AP_LOW: z
    .number()
    .min(30, "AP_LOW must be at least 30")
    .max(200, "AP_LOW must be less than or equal to 200"),
  CHOLESTEROL: z
    .number()
    .min(
      1,
      "Invalid cholesterol value, use 1 for normal, 2 for above normal, or 3 for well above normal"
    )
    .max(
      3,
      "Invalid cholesterol value, use 1 for normal, 2 for above normal, or 3 for well above normal"
    ),
  GLUCOSE: z
    .number()
    .min(
      1,
      "Invalid glucose value, use 1 for normal, 2 for above normal, or 3 for well above normal"
    )
    .max(
      3,
      "Invalid glucose value, use 1 for normal, 2 for above normal, or 3 for well above normal"
    ),
  SMOKE: z.boolean(),
  ALCOHOL: z.boolean(),
  PHYSICAL_ACTIVITY: z.boolean(),
  CARDIO_DISEASE: z.boolean(),
});

const CardioDataForm = () => {
  const { classes } = useStyles();

  const [prediction, setPrediction] = useState(0);

  const form = useForm({
    initialValues: {
      Name: "",
      AGE: 1,
      GENDER: 1,
      HEIGHT: 50,
      WEIGHT: 2,
      AP_HIGH: 50,
      AP_LOW: 30,
      CHOLESTEROL: 1,
      GLUCOSE: 1,
      SMOKE: false,
      ALCOHOL: false,
      PHYSICAL_ACTIVITY: false,
      CARDIO_DISEASE: false,
    },
    validate: zodResolver(cardioDataSchema),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // make an array of the values
    const values = Object.values(form.values);
    values.shift(); // remove the first value
    values.pop(); // remove the last value

    // fetch the prediction
    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: values }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.predictions);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className={classes.inner}>
      <Title className={classes.title}>Make a Prediction</Title>
      <Paper p="md">
        <form onSubmit={handleSubmit}>
          <Grid gutter="md" align="center">
            <Grid.Col span={4}>
              <TextInput
                label="Name"
                placeholder="Enter Name"
                value={form.values.Name}
                onChange={(event) =>
                  form.setFieldValue("Name", event.currentTarget.value)
                }
                error={form.errors.Name}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                label="Age"
                placeholder="Enter age"
                type="number"
                value={form.values.AGE}
                onChange={(event) =>
                  form.setFieldValue("AGE", Number(event.currentTarget.value))
                }
                error={form.errors.AGE}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Gender"
                placeholder="Select Gender"
                defaultValue="1"
                onChange={(value) =>
                  form.setFieldValue("GENDER", value ? Number(value) : 1)
                }
                data={[
                  { value: "1", label: "Male" },
                  { value: "2", label: "Female" },
                ]}
                error={form.errors.GENDER}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Height"
                placeholder="Enter Height"
                type="number"
                value={form.values.HEIGHT}
                onChange={(event) =>
                  form.setFieldValue(
                    "HEIGHT",
                    Number(event.currentTarget.value)
                  )
                }
                error={form.errors.HEIGHT}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Weight"
                placeholder="Enter Weight"
                type="number"
                value={form.values.WEIGHT}
                onChange={(event) =>
                  form.setFieldValue(
                    "WEIGHT",
                    Number(event.currentTarget.value)
                  )
                }
                error={form.errors.WEIGHT}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="AP_HIGH"
                placeholder="Enter AP_HIGH"
                type="number"
                value={form.values.AP_HIGH}
                onChange={(event) =>
                  form.setFieldValue(
                    "AP_HIGH",
                    Number(event.currentTarget.value)
                  )
                }
                error={form.errors.AP_HIGH}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="AP_LOW"
                placeholder="Enter AP_LOW"
                type="number"
                value={form.values.AP_LOW}
                onChange={(event) =>
                  form.setFieldValue(
                    "AP_LOW",
                    Number(event.currentTarget.value)
                  )
                }
                error={form.errors.AP_LOW}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Cholesterol"
                placeholder="Cholesterol Level"
                defaultValue="1"
                onChange={(value) =>
                  form.setFieldValue("CHOLESTEROL", value ? Number(value) : 1)
                }
                data={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                ]}
                error={form.errors.CHOLESTEROL}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Glucose"
                placeholder="Glucose Level"
                defaultValue="1"
                onChange={(value) =>
                  form.setFieldValue("GLUCOSE", value ? Number(value) : 1)
                }
                data={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                ]}
                error={form.errors.GLUCOSE}
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <Checkbox
                label="Smoke"
                color="violet"
                checked={form.values.SMOKE}
                onChange={(event) =>
                  form.setFieldValue("SMOKE", event.currentTarget.checked)
                }
                error={form.errors.SMOKE}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Checkbox
                label="Alcohol"
                color="violet"
                checked={form.values.ALCOHOL}
                onChange={(event) =>
                  form.setFieldValue("ALCOHOL", event.currentTarget.checked)
                }
                error={form.errors.ALCOHOL}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Checkbox
                label="Physical Activity"
                color="violet"
                checked={form.values.PHYSICAL_ACTIVITY}
                onChange={(event) =>
                  form.setFieldValue(
                    "PHYSICAL_ACTIVITY",
                    event.currentTarget.checked
                  )
                }
                error={form.errors.PHYSICAL_ACTIVITY}
              />
            </Grid.Col>
            <Grid.Col
              span={12}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                type="submit"
                color="violet"
                variant="light"
                disabled={false}
              >
                Submit
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Paper>
      <Paper>
        <Grid gutter="md" align="center">
          <Grid.Col span={12}>
            <h2>
              Cardiovascular Disease:{" "}
              {prediction ? (
                <Text color="red">Yes</Text>
              ) : (
                <Text color="green">No</Text>
              )}
            </h2>
          </Grid.Col>
        </Grid>
      </Paper>
    </div>
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
        <CardioDataForm />
      </Layout>
    </>
  );
}
