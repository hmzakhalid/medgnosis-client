import { Navbar, Text, Button } from "@mantine/core";
import {
  IconHome,
  IconMail,
  IconSettings,
  IconUserBolt,
  IconUser,
  IconDrone,
} from "@tabler/icons-react";
import Link from "next/link";
// import User from "./User";
import Image from "next/image";

type Props = {
  opened: boolean;
};

export default function SidebarComponent(props: Props) {
  return (
    <Navbar
      hidden={!props.opened}
      width={{ sm: 300, lg: 250 }}
      hiddenBreakpoint="sm"
      p="md"
      height="100vh"
      style={{ paddingTop: -70 }}
      className="bg-violet-900/20"
    >
      <Navbar.Section grow>
        <Link href="/">
          <Image
            src="/assets/Logo.png"
            alt="MedGnosis Logo"
            width="0"
            height="0"
            sizes="100vw"
            className="mb-16 h-auto w-40"
          />
        </Link>
        <NavLink name="Dashboard" icon={<IconHome />} link="/main" />
        <NavLink name="Contribute" icon={<IconDrone />} link="/contribute" />
        <NavLink name="Prediction" icon={<IconUser />} link="/predict" />

        <div className="absolute bottom-8 max-w-[12rem] w-full">
          <Button color="violet" variant="light" className="w-full">
            Logout
          </Button>
        </div>
      </Navbar.Section>
    </Navbar>
  );
}

type NavLinkProps = {
  name: string;
  icon: JSX.Element;
  link: string;
};

function NavLink(props: NavLinkProps) {
  return (
    <Link href={props.link} style={{ color: "white" }}>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}>
        {props.icon}
        <Text style={{ marginLeft: 10 }}>{props.name}</Text>
      </div>
    </Link>
  );
}
