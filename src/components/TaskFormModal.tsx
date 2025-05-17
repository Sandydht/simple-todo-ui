import { useState } from "react";
import Input from "./Input";
import RichTextEditor from "./RichTextEditor";
import DatePicker from "./DatePicker";
import ColorPicker from "./ColorPicker";
import Checkbox from "./Checkbox";
import Button from "./Button";
import CloseIcon from '../assets/close_24px_outlined.svg';

interface ComponentProps {
  onClose: () => void;
}

const TaskFormModal = ({ onClose }: ComponentProps) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    label_color: string;
    is_done: boolean;
  }>({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    label_color: '',
    is_done: false
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: name == 'is_done' ? checked : value
    }))
  }

  const handleRichTextEditor = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      description: value
    }))
  }

  const handleSelectColor = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      label_color: value
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('formData: ', formData)
  }

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-50">
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
            onSubmit={handleSubmit}
          >
            <div className="w-full h-auto flex flex-col items-start justify-start gap-[16px]">
              <Input
                id="title"
                label="Title"
                isRequired={true}
                placeholder="Meeting..."
                value={formData.title}
                onChange={handleInputChange}
              />
              <RichTextEditor
                id="description"
                label="Description"
                isRequired={true}
                placeholder="Meeting with client..."
                value={formData.description}
                onChange={handleRichTextEditor}
              />
              <DatePicker
                id="start_date"
                name="start_date"
                label="Start Date"
                isRequired={true}
                value={formData.start_date}
                onChange={handleInputChange}
              />
              <DatePicker
                id="end_date"
                name="end_date"
                label="End Date"
                isRequired={true}
                value={formData.end_date}
                onChange={handleInputChange}
              />
              <ColorPicker
                id="label_color"
                label="Tag Label"
                isRequired={true}
                value={formData.label_color}
                selectColor={handleSelectColor}
              />
              <Checkbox
                id="is_done"
                name="is_done"
                label="Is Done"
                isRequired={true}
                checked={formData.is_done}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full h-auto">
              <Button
                id="taskFormSubmitButton"
                htmlType="submit"
                label="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TaskFormModal
