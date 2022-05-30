import {
  Flex,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AttributeData } from "../data controllers/AttributeDataController";

type AttributeRowProps = {
  attributeData?: AttributeData;
  onAttributeValueChanged(newValue: number): void;
};

const AttributeRow: React.FC<AttributeRowProps> = ({
  attributeData,
  onAttributeValueChanged,
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const onFieldValueChanged = (event: any) => {
    let value = event.target.value;
    if (value.trim() == "") value = "0";
    const newValue = parseInt(value);
    setCurrentValue(newValue);
    onAttributeValueChanged(newValue);
    console.log("current value: ", newValue);
  };
  const onUpButtonClick = () => {
    const newValue = clamp(currentValue + 1, 0, 200);
    setCurrentValue(newValue);
    onAttributeValueChanged(newValue);
    console.log("current value: ", newValue);
  };
  const onDownButtonClick = () => {
    const newValue = clamp(currentValue - 1, 0, 200);
    setCurrentValue(newValue);
    onAttributeValueChanged(newValue);
    console.log("current value: ", newValue);
  };
  const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);

  return (
    <Flex
      align="center"
      direction="row"
      width="100%"
      height="25%"
      borderRadius={4}
      borderColor="blue"
      borderWidth="1px"
    >
      <Image
        src={attributeData?.iconImageURL}
        height="2rem"
        width="2rem"
        m={2}
      ></Image>
      <Text ml={2} mr={2} fontSize="12">
        {attributeData?.attributeName}
      </Text>
      <Flex
        height={"100%"}
        width="100%"
        align="center"
        direction="row"
        justify={"flex-end"}
      >
        <NumberInput
          float="right"
          m={2}
          size="xs"
          maxW={20}
          defaultValue={0}
          min={0}
          max={200}
          value={currentValue}
        >
          <NumberInputField
            onInput={(event) => {
              onFieldValueChanged(event);
            }}
          />
          <NumberInputStepper>
            <NumberIncrementStepper onClick={onUpButtonClick} />
            <NumberDecrementStepper onClick={onDownButtonClick} />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
    </Flex>
  );
};
export default AttributeRow;
