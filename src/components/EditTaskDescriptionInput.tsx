import { useForm } from "react-hook-form";
import Button from "./Button"
import RichTextEditor from "./RichTextEditor";

interface ComponentProps {
  onCancel: () => void;
  defaultValue: string;
  isLoading: boolean;
  onSubmitUpdate: (data: FormValues) => void;
}

type FormValues = {
  description: string;
};

const EditTaskDescriptionInput = ({ onCancel, defaultValue, isLoading, onSubmitUpdate }: ComponentProps) => {
  const { handleSubmit, reset, watch, control } = useForm<FormValues>();
  
  const onSubmit = (data: FormValues) => {
    onSubmitUpdate(data)
    reset();
  }

  const disabledSaveButton = () => Boolean(
    watch('description') == ''
  )

  return (
    <form 
      className="w-full h-auto flex flex-col items-start justify-start gap-[8px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full h-auto">
        <RichTextEditor
          id="description"
          label="Description"
          isRequired={true}
          placeholder="Meeting with client..."
          control={control}
          defaultValue={defaultValue}
          isShowLabel={false}
        />
      </div>
      <div className="w-full h-auto flex items-center justify-start gap-[8px] max-w-[200px]">
        <Button
          id="saveUpdateDescriptionButton"
          type="primary"
          htmlType="submit"
          label="Save"
          disabled={disabledSaveButton()}
          isLoading={isLoading}
        />
        <Button
          id="cancelUpdateDescriptionButton"
          type="outlined-primary"
          htmlType="button"
          label="Cancel"
          onClick={onCancel}
        />
      </div>
    </form>
  )
}

export default EditTaskDescriptionInput
