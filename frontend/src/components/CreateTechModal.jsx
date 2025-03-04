import React from "react";
import {
  Button,
  Flex,
  Input,
  useDisclosure,
  Fieldset,
  HStack,
} from "@chakra-ui/react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../components/ui/native-select";
import { Field } from "../components/ui/field";
import { BiAddToQueue } from "react-icons/bi";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Radio, RadioGroup } from "../components/ui/radio";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

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

const CreateTechModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="outline">
            <BiAddToQueue size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Tech/Tool 🤖</DialogTitle>
          </DialogHeader>
          <DialogBody pb={6}>
            <Fieldset.Root size="lg" maxW="md">
              <Fieldset.Content>
                <Flex alignItems={"center"} gap={4}>
                  <Field label="Name">
                    <Input placeholder="Python" />
                  </Field>

                  <Field label="Category">
                    <NativeSelectRoot>
                      <NativeSelectField
                        placeholder="Language"
                        items={CATEGORIES}
                      />
                    </NativeSelectRoot>
                  </Field>
                </Flex>
                <Field label="Roles">
                  <Input
                    placeholder="Which roles demand this tech?"
                    type="text"
                  />
                </Field>
                <Field label="Resources">
                  <Input placeholder="Where can I learn this?" type="text" />
                </Field>
                <Field label="Mastery">
                  <RadioGroup defaultValue="1">
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
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button>Save</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default CreateTechModal;
