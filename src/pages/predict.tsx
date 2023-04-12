import Head from "next/head";
import { useState, useEffect } from "react";
import { z } from "zod";
import {
  createStyles,
  useMantineTheme,
  Container,
  Text,
  ScrollArea,
  Table,
  Title,
  Grid,
  Checkbox,
  Stepper,
  Button,
  Paper,
  Select,
  Group,
  TextInput,
  PasswordInput,
  Code,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Link from "next/link";
import Layout from "@/components/Layout";

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
  SMOKE: z
    .number()
    .min(0, "Invalid smoke value, use 0 for non-smoker or 1 for smoker")
    .max(1, "Invalid smoke value, use 0 for non-smoker or 1 for smoker"),
  ALCOHOL: z
    .number()
    .min(0, "Invalid alcohol value, use 0 for non-drinker or 1 for drinker")
    .max(1, "Invalid alcohol value, use 0 for non-drinker or 1 for drinker"),
  PHYSICAL_ACTIVITY: z
    .number()
    .min(
      0,
      "Invalid physical activity value, use 0 for low activity or 1 for high activity"
    )
    .max(
      1,
      "Invalid physical activity value, use 0 for low activity or 1 for high activity"
    ),
  CARDIO_DISEASE: z
    .number()
    .min(
      0,
      "Invalid cardio disease value, use 0 for no disease or 1 for disease"
    )
    .max(
      1,
      "Invalid cardio disease value, use 0 for no disease or 1 for disease"
    ),
});

const CardioDataForm = () => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      Name: "",
      AGE: "",
      GENDER: "",
      HEIGHT: "",
      WEIGHT: "",
      AP_HIGH: "",
      AP_LOW: "",
      CHOLESTEROL: "",
      GLUCOSE: "",
      SMOKE: false,
      ALCOHOL: false,
      PHYSICAL_ACTIVITY: false,
      CARDIO_DISEASE: false,
    },

    validate: zodResolver(cardioDataSchema),
  });

  return (
    <div className={classes.inner}>
      <Title className={classes.title}>Enter a New Patient&apos;s Data</Title>
      <Container p={0} size={1000}>
        <Paper p="md">
          <form>
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
                  value={form.values.AGE}
                  onChange={(event) =>
                    form.setFieldValue("AGE", event.currentTarget.value)
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
                    form.setFieldValue("GENDER", value ? value : "")
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
                  value={form.values.HEIGHT}
                  onChange={(event) =>
                    form.setFieldValue("Height", event.currentTarget.value)
                  }
                  error={form.errors.HEIGHT}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  label="Weight"
                  placeholder="Enter Weight"
                  value={form.values.WEIGHT}
                  onChange={(event) =>
                    form.setFieldValue("WEIGHT", event.currentTarget.value)
                  }
                  error={form.errors.WEIGHT}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  label="AP_HIGH"
                  placeholder="Enter AP_HIGH"
                  value={form.values.AP_HIGH}
                  onChange={(event) =>
                    form.setFieldValue("AP_HIGH", event.currentTarget.value)
                  }
                  error={form.errors.AP_HIGH}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  label="AP_LOW"
                  placeholder="Enter AP_LOW"
                  value={form.values.AP_LOW}
                  onChange={(event) =>
                    form.setFieldValue("AP_LOW", event.currentTarget.value)
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
                    form.setFieldValue("CHOLESTEROL", value ? value : "")
                  }
                  data={[{ value: "1" }, { value: "2" }, { value: "3" }]}
                  error={form.errors.CHOLESTEROL}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <Select
                  label="Glucose"
                  placeholder="Glucose Level"
                  defaultValue="1"
                  onChange={(value) =>
                    form.setFieldValue("GLUCOSE", value ? value : "")
                  }
                  data={[{ value: "1" }, { value: "2" }, { value: "3" }]}
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
      </Container>
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
        <Container className={classes.wrapper} size={1400}>
          {/* <InitialComponent /> */}
          <CardioDataForm />
        </Container>
      </Layout>
    </>
  );
}
