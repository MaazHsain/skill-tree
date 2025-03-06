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

const TechCard = ({ tech }) => {
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
            <EditModal />
            <IconButton
              variant="ghost"
              colorPalette="red"
              size={"sm"}
              aria-label="Delete"
            >
              <BiTrash size={20} />
              {/* // onClick={handleDeleteUser} */}
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
