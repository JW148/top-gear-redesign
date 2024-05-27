"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Switch,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { deleteListing } from "../lib/actions";

import { PiMinusCircleFill } from "react-icons/pi";

export function ConfirmDeleteListing({ id }) {
  //controls confirmation model state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteListingById = deleteListing.bind(null, id);
  return (
    <>
      <Button
        isIconOnly
        className="absolute top-0 right-0 bg-transparent p-0 m-0 "
        aria-label="Delete listing button"
        onPress={onOpen}
      >
        <PiMinusCircleFill className="size-7 text-gray-700" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <form action={deleteListingById}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-danger-500">
                  Warning
                </ModalHeader>
                <ModalBody>
                  <p>Are you sure you want to delete this listing?</p>
                  <p className="font-bold">It cannot be undone.</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="danger" onPress={onClose} type="submit">
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

import { deleteImage } from "../lib/actions";

export function ConfirmDeleteImage({ file }) {
  //controls confirmation model state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteImageByName = deleteImage.bind(null, file);
  return (
    <>
      <Button
        isIconOnly
        className="absolute -top-2 -right-2 bg-transparent p-0 m-0 "
        aria-label="Delete listing button"
        onPress={onOpen}
      >
        <PiMinusCircleFill className="size-6 text-danger-600" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <form action={deleteImageByName}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-danger-500">
                  Warning
                </ModalHeader>
                <ModalBody>
                  <p>Are you sure you want to delete this image?</p>
                  <p className="font-bold">It cannot be undone.</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="danger" onPress={onClose} type="submit">
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
