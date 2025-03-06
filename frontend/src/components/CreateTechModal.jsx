import React, { useState } from "react";
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
import { Toaster, toaster } from "../components/ui/toaster";
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

const CreateTechModal = ({ addTech }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    category: "",
    roles: "",
    resources: "",
    mastery: "",
  });

  const handleAddTech = async (e) => {
    e.preventDefault(); // prevent page reload

    setIsLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/techStack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }
      onClose();
      addTech((existingTechStack) => [...existingTechStack, data]);
      setInputs({
        name: "",
        category: "",
        roles: "",
        resources: "",
        mastery: "",
      }); // clear inputs
    } catch (error) {
      console.log("Payload:", JSON.stringify(inputs));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <DialogRoot isOpen={isOpen} onClose={onClose}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={onOpen}>
            <BiAddToQueue size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleAddTech}>
            <DialogHeader>
              <DialogTitle>New Tech/Tool 🤖</DialogTitle>
            </DialogHeader>
            <DialogBody pb={6}>
              <Fieldset.Root size="lg" maxW="md">
                <Fieldset.Content>
                  <Flex alignItems={"center"} gap={4}>
                    <Field label="Name">
                      <Input
                        placeholder="Python"
                        value={inputs.name}
                        onChange={(e) =>
                          setInputs({ ...inputs, name: e.target.value })
                        }
                      />
                    </Field>

                    <Field label="Category">
                      <NativeSelectRoot>
                        <NativeSelectField
                          placeholder="Select category"
                          items={CATEGORIES}
                          value={inputs.category}
                          onChange={(e) =>
                            setInputs({ ...inputs, category: e.target.value })
                          }
                        />
                      </NativeSelectRoot>
                    </Field>
                  </Flex>
                  <Field label="Roles">
                    <Input
                      placeholder="Which roles demand this tech?"
                      type="text"
                      value={inputs.roles}
                      onChange={(e) =>
                        setInputs({ ...inputs, roles: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Resources">
                    <Input
                      placeholder="Where can I learn this?"
                      type="text"
                      value={inputs.resources}
                      onChange={(e) =>
                        setInputs({ ...inputs, resources: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Mastery">
                    <RadioGroup
                      defaultValue="Beginner"
                      value={inputs.mastery}
                      onChange={(e) =>
                        setInputs({ ...inputs, mastery: e.target.value })
                      }
                    >
                      <HStack gap="6">
                        <Radio value="Beginner">Beginner</Radio>
                        <Radio value="Intermediate">Intermediate</Radio>
                        <Radio value="Advanced">Advanced</Radio>
                      </HStack>
                    </RadioGroup>
                  </Field>
                </Fieldset.Content>
                <DialogActionTrigger asChild>
                  <Button type="submit" isLoading={isLoading}>
                    Submit
                  </Button>
                </DialogActionTrigger>
              </Fieldset.Root>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </DialogActionTrigger>
            </DialogFooter>
            <DialogCloseTrigger />
          </form>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default CreateTechModal;
