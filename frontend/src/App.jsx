import { Text, Container, Stack } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import TechGrid from "./components/TechGrid";

function App() {
  return (
    <Stack minH={"100vh"} fontFamily={"body"}>
      <Navbar />
      <Container maxW={"1200px"} my={4}>
        <Text
          fontSize={{ base: "3xl", md: "50" }}
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
        >
          <Text
            as={"span"}
            bgGradient="to-r"
            gradientFrom="cyan.400"
            gradientTo="blue.500"
            bgClip={"text"}
          >
            Tech Stack
          </Text>
          💻🚀
        </Text>
        <TechGrid />
      </Container>
    </Stack>
  );
}

export default App;
