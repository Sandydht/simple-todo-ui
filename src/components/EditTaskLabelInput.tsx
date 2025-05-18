import { useForm } from "react-hook-form";
import Button from "./Button"
import ColorPicker from "./ColorPicker";

type FormValues = {
  label_color: string;
};

interface ComponentProps {
  onCancel: () => void;
  onSave: (data: FormValues) => void;
  defaultValue: string;
  isLoading: boolean;
}

const EditTaskLabelInput = ({ onCancel, onSave, defaultValue, isLoading }: ComponentProps) => {
  const { handleSubmit, reset, watch, control } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    onSave(data);
    reset();
  }

  const disabledSaveButton = () => Boolean(
    watch('label_color') == '' ||
    watch('label_color') == defaultValue
  )

  return (
    <form
      className="w-full h-auto flex flex-col items-start justify-start gap-[8px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full h-auto">
        <ColorPicker
          id="label_color"
          label="Tag Label"
          isRequired={true}
          control={control}
        />
      </div>
      <div className="w-full h-auto flex items-center justify-start gap-[8px] max-w-[200px]">
        <Button
          id="saveUpdateLabelButton"
          type="primary"
          htmlType="submit"
          label="Save"
          disabled={disabledSaveButton()}
          isLoading={isLoading}
        />
        <Button
          id="cancelUpdateLabelButton"
          type="outlined-primary"
          htmlType="button"
          label="Cancel"
          onClick={onCancel}
        />
      </div>
    </form>
  )
}

export default EditTaskLabelInput
