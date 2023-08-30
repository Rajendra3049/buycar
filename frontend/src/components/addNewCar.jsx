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
import { addNewCar } from "../redux/inventory/inventory.action";

const AddCarModal = ({ isOpen, onClose }) => {
  const [newCarData, setNewCarData] = useState({
    title: "",
    accidents: "",
    description: "",
    image: "",
    previous_buyers: "",
    registration_place: "",
    major_scratch: false,
    original_paint: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewCarData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  const dispatch = useDispatch();
  const { myInventory, inventory } = useSelector(
    (store) => store.inventoryManager
  );

  const handleSubmit = () => {
    dispatch(addNewCar({ inventory, myInventory, newCarData }));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Car</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={newCarData.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Accidents</FormLabel>
            <Input
              name="accidents"
              value={newCarData.accidents}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={newCarData.description}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              name="image"
              value={newCarData.image}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Previous Buyers</FormLabel>
            <Input
              name="previous_buyers"
              value={newCarData.previous_buyers}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Odometer</FormLabel>
            <Input
              name="odometer"
              value={newCarData.odometer}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Registration Place</FormLabel>
            <Input
              name="registration_place"
              value={newCarData.registration_place}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Major Scratch</FormLabel>
            <Switch
              name="major_scratch"
              isChecked={newCarData.major_scratch}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Original Paint</FormLabel>
            <Switch
              name="original_paint"
              isChecked={newCarData.original_paint}
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

export default AddCarModal;
