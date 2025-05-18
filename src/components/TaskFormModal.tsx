import Input from "./Input";
import RichTextEditor from "./RichTextEditor";
import DatePicker from "./DatePicker";
import ColorPicker from "./ColorPicker";
import Checkbox from "./Checkbox";
import Button from "./Button";
import CloseIcon from '../assets/close_24px_outlined.svg';
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks";
import { showSnackbar } from "../lib/redux/features/snackbarSlice";
import { createTask } from "../services/task.service";
import { useState } from "react";
import { fromISOToLocale } from "../lib/luxon";

interface ComponentProps {
  onClose: () => void;
  onSuccessCreatedTask: () => void;
}

type FormValues = {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_done: boolean;
  label_color: string;
};

const TaskFormModal = ({ onClose, onSuccessCreatedTask }: ComponentProps) => {
  const { register, handleSubmit, reset, watch, control } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const disabledSubmitButton = () => Boolean(
    watch('title') == '' ||
    watch('description') == '' ||
    watch('start_date') == '' ||
    watch('end_date') == '' ||
    watch('label_color') == '' ||
    watch('label_color') == undefined ||
    watch('is_done') == undefined
  )

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);

      const startDate = fromISOToLocale(data.start_date);
      const endDate = fromISOToLocale(data.end_date);

      data = {
        ...data,
        start_date: startDate,
        end_date: endDate
      }

      const response = await createTask(data);
      if (response.status == 'OK' && response.data) {
        dispatch(showSnackbar({
          type: 'success',
          message: 'Task created successfully'
        }))
        reset();
        onSuccessCreatedTask();
      }
    } catch (error) {
      dispatch(showSnackbar({
        type: 'error',
        message: error
      }))
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-40">
      <div className="absolute left-0 top-0 right-0 bottom-0 bg-black opacity-60"></div>

      <div className="absolute left-0 top-0 right-0 bottom-0 flex items-start justify-center p-[25px] overflow-y-auto">
        <div className="w-full h-auto flex flex-col items-start justify-start gap-[24px] rounded-[16px] bg-white p-[25px] shadow-lg border-[1px] border-gray-400 max-w-[728px]">
          <div className="w-full h-auto flex items-center justify-between gap-[16px]">
            <div className="w-full h-auto">
              <p className="text-left text-[24px] leading-[32px] text-[#000000] font-semibold">
                Task Form
              </p>
            </div>
            <button
              type="button"
              className="cursor-pointer w-full h-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px] rounded-[8px] transition-all hover:bg-gray-100 flex items-center justify-center"
              onClick={onClose}
            >
              <img
                src={CloseIcon}
                alt="Close icon"
                loading="lazy"
                className="w-full h-full min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px]"
              />
            </button>
          </div>
          <form
            className="w-full h-auto flex flex-col items-start justify-start gap-[16px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full h-auto flex flex-col items-start justify-start gap-[16px]">
              <Input
                id={"title"}
                label={"Title"}
                isRequired={true}
                placeholder="Meeting..."
                register={register}
              />
              <RichTextEditor
                id="description"
                label="Description"
                isRequired={true}
                placeholder="Meeting with client..."
                control={control}
              />
              <DatePicker
                id="start_date"
                label="Start Date"
                isRequired={true}
                register={register}
              />
              <DatePicker
                id="end_date"
                label="End Date"
                isRequired={true}
                register={register}
              />
              <ColorPicker
                id="label_color"
                label="Tag Label"
                isRequired={true}
                control={control}
              />
              <Checkbox
                id="is_done"
                label="Is Done"
                isRequired={true}
                register={register}
              />
            </div>
            <div className="w-full h-auto">
              <Button
                id="taskFormSubmitButton"
                htmlType="submit"
                label="Submit"
                isLoading={isLoading}
                disabled={disabledSubmitButton()}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TaskFormModal
