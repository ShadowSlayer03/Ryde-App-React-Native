import { ButtonProps } from "@/types/type";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
      break;
    case "danger":
      return "bg-red-500";
      break;
    case "success":
      return "bg-green-500";
      break;
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
      break;
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
      break;
    case "secondary":
      return "text-gray-100";
      break;
    case "danger":
      return "text-red-100";
      break;
    case "success":
      return "text-green-100";
      break;
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      className={`w-full rounded-full p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(
        bgVariant
      )} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-[16px] font-JakartaBold ${getTextVariantStyle(textVariant)}`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
