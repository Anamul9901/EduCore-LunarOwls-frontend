"use client";
import { IInput } from "@/src/types";
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {
  type: "date" | "time" | "datetime-local";
}

const EDDateTime = ({
  type = "datetime-local",
  name,
  label,
  defaultValue,
  isDisabled,
  variant = "bordered",
  size = "md",
  required = false,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      type={type}
      variant={variant}
      size={size}
      label={label}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      required={required}
      isInvalid={!!errors[name]}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
    />
  );
};

export default EDDateTime;
