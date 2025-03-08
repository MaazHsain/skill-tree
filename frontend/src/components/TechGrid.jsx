import React, { useEffect, useState } from "react";
import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
// import { TECHSTACK } from "../dummy/dummy";
import TechCard from "./TechCard";
import { BASE_URL } from "../App";

const TechGrid = ({ techStack, addTech }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTechStack = async () => {
      try {
        const res = await fetch(BASE_URL + "/techStack");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }
        addTech(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getTechStack();
  }, [addTech]);
  // console.log(techStack);
  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {techStack.map((tech) => (
          <TechCard key={tech.id} tech={tech} addTech={addTech} />
        ))}
      </Grid>

      {isLoading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!isLoading && techStack.length === 0 && (
        <Flex justifyContent={"center"}>
          <Text fontSize={"xl"}>
            <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
              Nothing to add?
            </Text>
            Tech Stack empty 🥺
          </Text>
        </Flex>
      )}
    </>
  );
};

export default TechGrid;
