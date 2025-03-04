import React from "react";
import { Grid } from "@chakra-ui/react";
import { TECHSTACK } from "../dummy/dummy";
import TechCard from "./TechCard";

const TechGrid = () => {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={4}
    >
      {TECHSTACK.map((tech) => (
        <TechCard key={tech.id} tech={tech} />
      ))}
    </Grid>
  );
};

export default TechGrid;
