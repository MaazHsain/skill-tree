import { Container, Box, Flex, Text, Button } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import React from "react";
import CreateTechModal from "./CreateTechModal";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"900px"}>
      <Box
        bg={useColorModeValue("gray.200", "gray.900")}
        shadow="md"
        borderRadius="md"
        px={4}
        my={4}
      >
        <Flex h="16" alignItems={"center"} justifyContent={"space-between"}>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            display={{ base: "none", sm: "flex" }}
          ></Flex>
          <Flex gap={3} alignItems={"center"}>
            <Text
              fontSize={"lg"}
              fontWeight={500}
              display={{ base: "none", md: "block" }}
            >
              ⚙️ Color Mode
            </Text>

            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
            </Button>
            <Text
              fontSize={"lg"}
              fontWeight={500}
              display={{ base: "none", md: "block" }}
            >
              🤖 Add Tech
            </Text>
            <CreateTechModal />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;
