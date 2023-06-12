import { Container, Button, Header, Group } from "@mantine/core";

import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <Container size={"xl"}>
      <Header height={30} bg="transparent" className="border-0 py-8">
        <Group position="apart">
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
          <Group className="text-sm">
            <Link href="#" className="text-violet-300">About</Link>
            <Link href="#" className="text-violet-300">Contact</Link>
            <Button className="w-36 bg-violet-700/25 text-violet-300 hover:bg-violet-700/40">
              Lets Go
            </Button>
          </Group>
        </Group>
      </Header>
    </Container>
  );
};

export default NavBar;
