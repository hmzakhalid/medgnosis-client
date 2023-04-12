import { Burger, Button, Header, MediaQuery, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

export default function HeaderComponent(props: Props) {
  const { data: session } = useSession();

  return (
    <Header height={70} p="md">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={props.opened}
            onClick={() => props.setOpened(!props.opened)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <Link href="/" className="w-fit">
          <Image
            src="/assets/Logo.png"
            alt="MedGnosis Logo"
            width="0"
            height="0"
            sizes="100vw"
            className="h-auto w-40"
          />
        </Link>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Text>
            <Button
              variant="light"
              color="violet"
              onClick={() => void signOut()}
            >
              Sign out
            </Button>
          </Text>
        </div>
      </div>
    </Header>
  );
}
