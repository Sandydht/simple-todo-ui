import { useForm } from "react-hook-form";
import Button from "./Button"
import Input from "./Input";

type FormValues = {
  title: string;
};

interface ComponentProps {
  defaultValue: string;
  onCancel: () => void;
  onSave: (data: FormValues) => void;
}

const EditTaskTitleInput = ({ defaultValue, onCancel, onSave }: ComponentProps) => {
  const { register, handleSubmit, watch } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    onSave(data);
  }

  const disabledSaveButton = () => Boolean(
    watch('title') == '' ||
    watch('title') == defaultValue
  )

  return (
    <form
      className="w-full h-auto flex flex-col items-start justify-start gap-[8px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full h-auto">
        <Input
          id={"title"}
          label={"Title"}
          isRequired={true}
          placeholder="Meeting..."
          register={register}
          showLabel={false}
          defaultValue={defaultValue}
        />
      </div>
      <div className="w-full h-auto flex items-center justify-start gap-[8px] max-w-[200px]">
        <Button
          id="saveEditTitleButton"
          type="primary"
          htmlType="submit"
          label="Save"
          disabled={disabledSaveButton()}
        />
        <Button
          id="cancelEditTitleButton"
          type="outlined-primary"
          htmlType="button"
          label="Cancel"
          onClick={onCancel}
        />
      </div>
    </form>
  )
}

export default EditTaskTitleInput
