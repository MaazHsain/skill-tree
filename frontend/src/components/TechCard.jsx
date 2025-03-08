import {
  Button,
  Card,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Span,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import React from "react";
import { Avatar } from "../components/ui/avatar";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";
import { Toaster, toaster } from "../components/ui/toaster";

const TechCard = ({ tech, addTech }) => {
  const handleDeleteTech = async () => {
    try {
      const res = await fetch(BASE_URL + "/techStack/" + tech.id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      addTech((existingTechStack) =>
        existingTechStack.filter((t) => t.id !== tech.id)
      );
      // Fails to toast
      // setTimeout(() => {
      //   toaster.create({
      //     id: "3",
      //     title: "Deleted!",
      //     description: "Tech deleted successfully",
      //     type: "success",
      //     duration: 2000,
      //   });
      // }, 100);
    } catch (error) {
      // setTimeout(() => {
      //   toaster.create({
      //     id: "3",
      //     title: "Deleted!",
      //     description: "Tech deleted successfully",
      //     type: "success",
      //     duration: 2000,
      //   });
      // }, 100);
    }
  };

  return (
    <Card.Root>
      <Card.Body>
        <Flex gap={4}>
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar src={tech.imgURL} />
            <Box>
              <Card.Title>{tech.name}</Card.Title>
              <Card.Description fontWeight={"medium"}>
                {tech.category}
              </Card.Description>
            </Box>
          </Flex>
          <Flex>
            <EditModal addTech={addTech} tech={tech} />
            <IconButton
              variant="ghost"
              colorPalette="red"
              size={"sm"}
              aria-label="Delete"
              onClick={handleDeleteTech}
            >
              <BiTrash size={20} />
            </IconButton>
          </Flex>
        </Flex>

        <Stack>
          <Card.Description mt={5}>
            <Span fontWeight={"medium"}>Roles</Span>
            <br /> {tech.roles}
          </Card.Description>
          <Separator />
          <Card.Description mt={5}>
            <Span fontWeight={"medium"}>Where can I learn?</Span>
            <br />
            {tech.resources}
          </Card.Description>
          <Separator />
        </Stack>
      </Card.Body>
      <Card.Footer justifyContent="flex-start">
        <Text>Mastery: {tech.mastery}</Text>
      </Card.Footer>
    </Card.Root>
  );
};

export default TechCard;
