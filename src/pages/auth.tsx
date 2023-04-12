import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Container,
  Text,
  Paper,
  Group,
  type PaperProps,
  Button,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import NavBar from "@/components/NavBar";

export default function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  return (
    <>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
          <NavBar />
          <Container
            size={"xl"}
            className="relative flex h-screen items-center justify-center"
          >
            <Paper
              radius="md"
              p="xl"
              {...props}
              className="w-[30em] "
              style={{ backdropFilter: "blur(10px)" }}
            >
              <Text size="lg" weight={500} mb="sm">
                Welcome to MedGnosis, {type} with
              </Text>
              <form
                onSubmit={form.onSubmit(() => {
                  console.log(form.values);
                })}
              >
                <Stack>
                  {type === "register" && (
                    <TextInput
                      label="Organization Name"
                      placeholder="Your Organization name"
                      value={form.values.name}
                      onChange={(event) =>
                        form.setFieldValue("name", event.currentTarget.value)
                      }
                      radius="md"
                    />
                  )}

                  <TextInput
                    required
                    label="Email"
                    placeholder="hello@mantine.dev"
                    value={form.values.email}
                    onChange={(event) =>
                      form.setFieldValue("email", event.currentTarget.value)
                    }
                    error={form.errors.email && "Invalid email"}
                    radius="md"
                    color="white"
                  />

                  <PasswordInput
                    required
                    label="Password"
                    placeholder="Your password"
                    value={form.values.password}
                    onChange={(event) =>
                      form.setFieldValue("password", event.currentTarget.value)
                    }
                    error={
                      form.errors.password &&
                      "Password should include at least 6 characters"
                    }
                    radius="md"
                  />

                  {type === "register" && (
                    <Checkbox
                      label="I accept terms and conditions"
                      color="violet"
                      variant="light"
                      checked={form.values.terms}
                      onChange={(event) =>
                        form.setFieldValue("terms", event.currentTarget.checked)
                      }
                    />
                  )}
                </Stack>

                <Group position="apart" mt="xl">
                  <Anchor
                    component="button"
                    type="button"
                    color="dimmed"
                    onClick={() => toggle()}
                    size="xs"
                  >
                    {type === "register"
                      ? "Already have an account? Login"
                      : "Don't have an account? Register"}
                  </Anchor>
                  <Button
                    type="submit"
                    className="w-36 bg-violet-600 text-violet-100 hover:bg-violet-700/40"
                    radius="xl"
                  >
                    {upperFirst(type)}
                  </Button>
                </Group>
              </form>
            </Paper>
          </Container>
        </div>
      </div>
    </>
  );
}
