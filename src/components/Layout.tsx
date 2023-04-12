import { useState } from "react";
import { AppShell, createStyles, Container } from "@mantine/core";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";


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
}));


const Layout = ({ children } : { children: React.ReactNode }) => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();


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
      <Container className={classes.wrapper} size={1200}>

      {children}
      </Container>
    </AppShell>
  );
};

export default Layout;