import React, { useState } from "react";
import {
  Button,
  Flex,
  Input,
  useDisclosure,
  Fieldset,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../components/ui/native-select";
import { Field } from "../components/ui/field";
import { BiEditAlt } from "react-icons/bi";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from "../components/ui/dialog";
import { Radio, RadioGroup } from "../components/ui/radio";
import { BASE_URL } from "../App";

const CATEGORIES = [
  "Language",
  "Web(Backend)",
  "Web(Frontend)",
  "Deployment(Backend)",
  "Deployment(Frontend)",
  "Relational Database",
  "NoSQL Database",
  "Big Data Tool",
  "Cloud Data Warehouse",
  "Orchestration",
  "Data Transformation",
  "Data Manipulation",
  "Containerization",
];

const EditModal = ({ addTech, tech }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: tech.name,
    category: tech.category,
    roles: tech.roles,
    resources: tech.resources,
    mastery: tech.mastery,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditTech = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/techStack/${tech.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      addTech((existingTechStack) =>
        existingTechStack.map((t) => (t.id === tech.id ? data : t))
      );
      onClose();
    } catch (error) {
      console.error("Error updating tech:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DialogRoot isOpen={isOpen} onClose={onClose}>
        <DialogTrigger asChild>
          <IconButton
            onClick={onOpen}
            variant="ghost"
            colorPalette="gray"
            size="sm"
            aria-label="Edit"
          >
            <BiEditAlt size={20} />
          </IconButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tech/Tool 🤖</DialogTitle>
          </DialogHeader>
          <DialogBody pb={6}>
            <Fieldset.Root size="lg" maxW="md">
              <Fieldset.Content>
                <Flex alignItems="center" gap={4}>
                  <Field label="Name">
                    <Input
                      name="name"
                      value={inputs.name}
                      onChange={handleChange}
                      placeholder="Python"
                    />
                  </Field>
                  <Field label="Category">
                    <NativeSelectRoot>
                      <NativeSelectField
                        name="category"
                        value={inputs.category}
                        onChange={handleChange}
                        placeholder="Select Category"
                        items={CATEGORIES}
                      />
                    </NativeSelectRoot>
                  </Field>
                </Flex>
                <Field label="Roles">
                  <Input
                    name="roles"
                    value={inputs.roles}
                    onChange={handleChange}
                    placeholder="Which roles demand this tech?"
                  />
                </Field>
                <Field label="Resources">
                  <Input
                    name="resources"
                    value={inputs.resources}
                    onChange={handleChange}
                    placeholder="Where can I learn this?"
                  />
                </Field>
                <Field label="Mastery">
                  <RadioGroup
                    name="mastery"
                    value={inputs.mastery}
                    onChange={handleChange}
                  >
                    <HStack gap="6">
                      <Radio value="Beginner">Beginner</Radio>
                      <Radio value="Intermediate">Intermediate</Radio>
                      <Radio value="Advanced">Advanced</Radio>
                    </HStack>
                  </RadioGroup>
                </Field>
              </Fieldset.Content>
            </Fieldset.Root>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogActionTrigger>
            <DialogActionTrigger asChild>
              <Button
                type="submit"
                isLoading={isLoading}
                onClick={handleEditTech}
              >
                Update
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default EditModal;
