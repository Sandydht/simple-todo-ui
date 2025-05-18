import Button from "./Button"
import { useForm } from "react-hook-form";
import DatePicker from "./DatePicker";
import { dateIsSame, fromISOToLocale } from "../lib/luxon";

type FormValues = {
  start_date: string;
  end_date: string;
};

interface ComponentProps {
  onCancel: () => void;
  start_date: string;
  end_date: string;
  onSave: (data: FormValues) => void;
  isLoading: boolean;
}

const EditTaskDatesInput = ({ onCancel, start_date, end_date, onSave, isLoading }: ComponentProps) => {
  const { register, handleSubmit, reset, watch } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    onSave(data);
    reset();
  }

  const disabledSaveButton = () => Boolean(
    watch('start_date') == '' ||
    watch('end_date') == '' ||
    (dateIsSame(watch('start_date'), start_date) && dateIsSame(watch('end_date'), end_date))
  )

  return (
    <form
      className="w-full h-auto flex flex-col items-start justify-start gap-[8px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full h-auto flex flex-col items-start justify-start gap-[16px]">
        <DatePicker
          id="start_date"
          label="Start Date"
          isRequired={true}
          register={register}
          defaultValue={fromISOToLocale(start_date)}
        />
        <DatePicker
          id="end_date"
          label="End Date"
          isRequired={true}
          register={register}
          defaultValue={fromISOToLocale(end_date)}
        />
      </div>
      <div className="w-full h-auto flex items-center justify-start gap-[8px] max-w-[200px]">
        <Button
          id="saveUpdateDatesButton"
          type="primary"
          htmlType="submit"
          label="Save"
          disabled={disabledSaveButton()}
          isLoading={isLoading}
        />
        <Button
          id="cancelUpdateDatesButton"
          type="outlined-primary"
          htmlType="button"
          label="Cancel"
          onClick={onCancel}
        />
      </div>
    </form>
  )
}

export default EditTaskDatesInput
