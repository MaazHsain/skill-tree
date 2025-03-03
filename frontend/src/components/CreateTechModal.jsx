import React from "react";
import { Button, Flex, Input, useDisclosure } from "@chakra-ui/react";
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
import { FormControl, FormLabel } from "@chakra-ui/form-control";

const CreateTechModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Tech/Tool ➕</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Flex alignItems={"center"} gap={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Python" />
              </FormControl>
            </Flex>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
      {/* </ModalContent>
    //   </Modal> */}

      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="outline">
            <BiAddToQueue size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Tech/Tool ➕</DialogTitle>
          </DialogHeader>
          <DialogBody pb={6}>
            <Flex alignItems={"center"} gap={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Python" />
              </FormControl>
            </Flex>
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
