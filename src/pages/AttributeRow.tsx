import {
  Flex,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AttributeData } from "../data controllers/AttributeDataController";

type AttributeRowProps = {
  attributeData?: AttributeData;
  onAttributeValueChanged?(newValue: number): void;
  viewBroPage: boolean;
  initialStatValue?: string | number;
};

const AttributeRow: React.FC<AttributeRowProps> = ({
  attributeData,
  onAttributeValueChanged,
  viewBroPage,
  initialStatValue,
}) => {
  console.log(initialStatValue);
  const [currentValue, setCurrentValue] = useState(0);
  const onFieldValueChanged = (event: any) => {
    let value = event.target.value;
    if (value.trim() == "") value = "0";
    const newValue = parseInt(value);
    setCurrentValue(newValue);
    if (onAttributeValueChanged) onAttributeValueChanged(newValue);
    console.log("current value: ", newValue);
  };
  const onUpButtonClick = () => {
    const newValue = clamp(currentValue + 1, 0, 200);
    setCurrentValue(newValue);
    if (onAttributeValueChanged) onAttributeValueChanged(newValue);
    console.log("current value: ", newValue);
  };
  const onDownButtonClick = () => {
    const newValue = clamp(currentValue - 1, 0, 200);
    setCurrentValue(newValue);
    if (onAttributeValueChanged) onAttributeValueChanged(newValue);
    console.log("current value: ", newValue);
  };
  const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);

  return (
    <Flex
      align="center"
      direction="row"
      width="90%"
      height="auto%"
      borderRadius={4}
      borderColor={"gray.300"}
      borderWidth="1px"
      bg={"gray.100"}
      mb={2}
    >
      <Popover trigger="hover" closeDelay={0}>
        <PopoverTrigger>
          <Image src={attributeData?.iconImageURL} height="auto"></Image>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            <Flex width={"100%"} justify="center" align={"center"}>
              {" "}
              {attributeData?.attributeName} <Spacer />
              <Image
                height="30px"
                width={"30px"}
                src={attributeData?.iconImageURL}
              ></Image>
            </Flex>
          </PopoverHeader>

          <PopoverBody>{attributeData?.description}</PopoverBody>
        </PopoverContent>
      </Popover>

      {!viewBroPage ? (
        <Text ml={2} mr={2} fontSize="12">
          {attributeData?.attributeName}
        </Text>
      ) : (
        <Text ml={1}>{initialStatValue}</Text>
      )}

      <Flex
        height={"100%"}
        width="100%"
        align="center"
        direction="row"
        justify={"flex-end"}
      >
        {!viewBroPage && (
          <NumberInput
            float="right"
            m={2}
            size="xs"
            maxW={20}
            defaultValue={0}
            min={0}
            max={200}
            value={currentValue}
            bg="white"
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
        )}
      </Flex>
    </Flex>
  );
};
export default AttributeRow;
