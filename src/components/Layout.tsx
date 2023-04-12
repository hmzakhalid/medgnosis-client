import { useState } from "react";
import { AppShell } from "@mantine/core";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";


const Layout = ({ children } : { children: React.ReactNode }) => {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      // header={
      //   <Header
      //     opened={opened}
      //     setOpened={setOpened}
      //   />
      // }
      navbar={<Sidebar opened={opened} />}
    >
      {children}
    </AppShell>
  );
};

export default Layout;