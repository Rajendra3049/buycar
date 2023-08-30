import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  Switch,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { EditCar } from "../redux/inventory/inventory.action";

const EditFormModal = ({ isOpen, onClose, carData }) => {
  const { _id } = carData;
  const [editedData, setEditedData] = useState(carData);
  const dispatch = useDispatch();
  const { myInventory, inventory, loading, msg } = useSelector(
    (store) => store.inventoryManager
  );

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = () => {
    dispatch(EditCar({ _id, inventory, myInventory, editedData }));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Car Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={editedData.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Accidents</FormLabel>
            <Input
              name="accidents"
              value={editedData.accidents}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={editedData.description}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              name="image"
              value={editedData.image}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Previous Buyers</FormLabel>
            <Input
              name="previous_buyers"
              value={editedData.previous_buyers}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Odometer</FormLabel>
            <Input
              name="odometer"
              value={editedData.odometer}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Registration Place</FormLabel>
            <Input
              name="registration_place"
              value={editedData.registration_place}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Major Scratch</FormLabel>
            <Switch
              name="major_scratch"
              isChecked={editedData.major_scratch}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Original Paint</FormLabel>
            <Switch
              name="original_paint"
              isChecked={editedData.original_paint}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditFormModal;
