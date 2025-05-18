/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import Input from "./Input";
import React, { useEffect } from "react";

type FormValues = {
  title: string;
};

interface ComponentProps {
  defaultValue: string;
  onChangeInput: (data: string) => void;
  onKeyDown: (data: string) => void;
}

const EditTaskTitleInput = ({ defaultValue, onChangeInput, onKeyDown }: ComponentProps) => {
  const { register, watch } = useForm<FormValues>();

  useEffect(() => {
    onChangeInput(watch('title'));
  }, [watch('title')])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter') {
      onKeyDown(watch('title'));
    }
  }

  return (
    <Input
      id={"title"}
      label={"Title"}
      isRequired={true}
      placeholder="Meeting..."
      register={register}
      showLabel={false}
      defaultValue={defaultValue}
      autoFocus={true}
      onKeyDown={handleKeyDown}
    />
  )
}

export default EditTaskTitleInput
