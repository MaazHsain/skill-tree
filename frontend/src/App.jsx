import { Text, Container, Stack } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import TechGrid from "./components/TechGrid";
import { useState } from "react";

export const BASE_URL = "http://127.0.0.1:5000";
function App() {
  const [techStack, addTech] = useState([]);
  return (
    <Stack minH={"100vh"} fontFamily={"body"}>
      <Navbar addTech={addTech} />
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
        <TechGrid techStack={techStack} addTech={addTech} />
      </Container>
    </Stack>
  );
}

export default App;
