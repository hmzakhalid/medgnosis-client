import { Container, Button, Header, Group } from "@mantine/core";

import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <Container size={"xl"}>
      <Header height={30} bg="transparent" className="border-0 py-8">
        <Group position="apart">
          {/* <Title order={3} color="white">
                  MedGnosis
                </Title> */}
          <Image
            src="/assets/Logo.png"
            alt="MedGnosis Logo"
            width="0"
            height="0"
            sizes="100vw"
            className="h-auto w-1/6"
          />
          <Group className="text-sm">
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
            <Button variant="light" color="violet">
              Register Org
            </Button>
          </Group>
        </Group>
      </Header>
    </Container>
  );
};

export default NavBar;
