import {
  Button,
  Card,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import React from "react";
import { Avatar } from "../components/ui/avatar";

const TechCard = ({ tech }) => {
  return (
    // <Card>
    //   <CardHeader>
    //     <Flex gap={4}>
    //       <Flex flex={"1"} gap={"4"} alignItems={"center"}>
    //         <Avatar src="https://avatar.iran.liara.run/username?username=java" />

    //         <Box>
    //           <Heading size="sm">{tech.name}</Heading>
    //           <Text>{tech.category}</Text>
    //         </Box>
    //       </Flex>
    //       <Flex>
    //         {/* <EditModal user={user} setUsers={setUsers} /> */}
    //         <IconButton
    //           variant="ghost"
    //           colorScheme="red"
    //           size={"sm"}
    //           aria-label="See menu"
    //           icon={<BiTrash size={20} />}
    //           // onClick={handleDeleteUser}
    //         />
    //       </Flex>
    //     </Flex>
    //   </CardHeader>
    // </Card>

    <Card.Root>
      <Card.Body>
        <Flex gap={4}>
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar src="https://avatar.iran.liara.run/username?username=java" />
            {/* <Box>
              <Heading size="sm">{tech.name}</Heading>
              <Text>{tech.category}</Text>
            </Box> */}
            <Box>
              <Card.Title>{tech.name}</Card.Title>
              <Card.Description>{tech.category}</Card.Description>
            </Box>
          </Flex>
          <Flex>
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
      </Card.Body>
      <Card.Footer justifyContent="flex-start">
        <Text>{tech.mastery}</Text>
      </Card.Footer>
    </Card.Root>
  );
};

export default TechCard;
