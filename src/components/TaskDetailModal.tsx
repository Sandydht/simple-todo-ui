import CloseIcon from '../assets/close_24px_outlined.svg';
import NotesIcon from '../assets/notes_24px_outlined.svg';
import Button from './Button';
import CalendarIcon from '../assets/calendar_today_24px_outlined.svg';
import LabelIcon from '../assets/label_24px_outlined.svg';
import { useState } from 'react';
import RichTextEditor from './RichTextEditor';
import DatePicker from './DatePicker';

interface ComponentProps {
  onClose: () => void;
}

const TaskDetailModal = ({ onClose }: ComponentProps) => {
  const [isEditTitle, setIsEditTitle] = useState<boolean>(false);
  const [isEditDescription, setIsEditDescription] = useState<boolean>(false);
  const [isEditDates, setIsEditDates] = useState<boolean>(false);
  const [isEditLabel, setIsEditLabel] = useState<boolean>(false);

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-50">
      <div className="absolute left-0 top-0 right-0 bottom-0 bg-black opacity-60"></div>

      <div className="absolute left-0 top-0 right-0 bottom-0 flex items-start justify-center p-[25px] overflow-y-auto">
        <div className="w-full h-auto flex flex-col items-start justify-start gap-[24px] rounded-[16px] bg-white p-[25px] shadow-lg border-[1px] border-gray-400 max-w-[728px]">
          {/* Title */}
          <div className="w-full h-auto flex items-center justify-between gap-[16px]">
            <div className="w-full h-auto flex items-center justify-start gap-[16px]">
              <div className="w-auto h-auto flex items-center justify-center max-w-[24px] min-w-[24px]">
                <input
                  type='checkbox'
                  className="w-full h-full min-w-[16px] max-w-[16px] min-h-[16px] max-h-[16px] cursor-pointer pointer-events-auto"
                />
              </div>
              {!isEditTitle && (
                <div
                  className="w-full h-auto"
                  onClick={() => setIsEditTitle(true)}
                >
                  <p className='text-left text-[24px] leading-[32px] text-[#000000] font-semibold'>
                    Task detail modal box
                  </p>
                </div>
              )}

              {isEditTitle && (
                <div
                  className="w-full h-auto"
                  onClick={() => setIsEditTitle(false)}
                >
                  <p className='text-left text-[24px] leading-[32px] text-[#000000] font-semibold'>
                    Edit
                  </p>
                </div>
              )}
            </div>
            <div className="w-auto h-auto flex items-center justify-end">
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
          </div>

          {/* Description */}
          <div className='w-full h-auto flex flex-col items-start justify-start gap-[8px]'>
            <div className='w-full h-auto flex items-center justify-between gap-[16px]'>
              <div className='w-full h-auto flex items-center justify-start gap-[16px]'>
                <div className="w-auto h-auto flex items-center justify-center max-w-[24px] min-w-[24px]">
                  <img
                    src={NotesIcon}
                    alt="Notes icon"
                    loading="lazy"
                    className="w-full h-full min-w-[24x] max-w-[24px] min-h-[24px] max-h-[24px]"
                  />
                </div>

                <div className='w-full h-auto'>
                  <p className='text-left text-[18px] leading-[26px] text-[#000000] font-semibold'>
                    Description
                  </p>
                </div>
              </div>

              {!isEditDescription && (
                <div className='w-auto h-auto'>
                  <Button
                    id="taskFormSubmitButton"
                    htmlType="button"
                    label="Edit"
                    onClick={() => setIsEditDescription(true)}
                  />
                </div>
              )}
            </div>

            {!isEditDescription && (
              <div className='w-full h-auto bg-gray-200 p-[16px]'>
                <p className='text-left text-[16px] leading-[24px] text-[#000000]'>
                  Description
                </p>
              </div>
            )}

            {isEditDescription && (
              <div
                className='w-full h-auto rounded-[8px] flex flex-col items-start justify-start gap-[8px]'
              >
                <RichTextEditor
                  id="description"
                  label="Description"
                  isRequired={true}
                  placeholder="Meeting with client..."
                  isShowLabel={false}
                  value={''}
                  onChange={() => {

                  }}
                />
                <div className='w-full h-auto flex items-center justify-start gap-[8px] max-w-[200px]'>
                  <Button
                    id="taskFormSubmitButton"
                    htmlType="button"
                    label="Save"
                    onClick={() => setIsEditDescription(false)}
                  />
                  <Button
                    id="taskFormSubmitButton"
                    type='outlined-primary'
                    htmlType="button"
                    label="Cancel"
                    onClick={() => setIsEditDescription(false)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Start date & End Date */}
          <div className='w-full h-auto flex flex-col items-start justify-start gap-[8px]'>
            <div className="w-full h-auto flex items-center justify-between gap-[16px]">
              <div className="w-full h-auto flex items-center justify-start gap-[16px]">
                <div className="w-auto h-auto flex items-center justify-center max-w-[24px] min-w-[24px]">
                  <img
                    src={CalendarIcon}
                    alt="Calendar icon"
                    loading="lazy"
                    className="w-full h-full min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px]"
                  />
                </div>
                <div className='w-full h-auto'>
                  <p className='text-left text-[18px] leading-[26px] text-[#000000] font-semibold'>
                    Dates
                  </p>
                </div>
              </div>
              {!isEditDates && (
                <div className='w-auto h-auto'>
                  <Button
                    id="taskFormSubmitButton"
                    htmlType="button"
                    label="Edit"
                    onClick={() => setIsEditDates(true)}
                  />
                </div>
              )}
            </div>
            {!isEditDates && (
              <div className='w-full h-auto bg-gray-200 p-[16px]'>
                <p className='text-left text-[16px] leading-[24px] text-[#000000]'>
                  15 May 2025 - 16 May 2025
                </p>
              </div>
            )}
            {isEditDates && (
              <div className='w-full h-auto flex flex-col items-start justify-start gap-[8px]'>
                <div className='w-full h-auto flex flex-col items-start justify-start gap-[8px]'>
                  <DatePicker
                    id="start_date"
                    name="start_date"
                    label="Start Date"
                    isRequired={false}
                    value={''}
                    onChange={() => { }}
                  />
                  <DatePicker
                    id="end_date"
                    name="end_date"
                    label="End Date"
                    isRequired={false}
                    value={''}
                    onChange={() => { }}
                  />
                </div>
                <div className='w-full h-auto flex items-center justify-start gap-[8px] max-w-[200px]'>
                  <Button
                    id="taskFormSubmitButton"
                    htmlType="button"
                    label="Save"
                    onClick={() => setIsEditDates(false)}
                  />
                  <Button
                    id="taskFormSubmitButton"
                    type='outlined-primary'
                    htmlType="button"
                    label="Cancel"
                    onClick={() => setIsEditDates(false)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Tag color */}
          <div className='w-full h-auto flex flex-col items-start justify-start gap-[8px]'>
            <div className="w-full h-auto flex items-center justify-between gap-[16px]">
              <div className="w-full h-auto flex items-center justify-start gap-[16px]">
                <div className="w-auto h-auto flex items-center justify-center max-w-[24px] min-w-[24px]">
                  <img
                    src={LabelIcon}
                    alt="Label icon"
                    loading="lazy"
                    className="w-full h-full min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px]"
                  />
                </div>
                <div className='w-full h-auto'>
                  <p className='text-left text-[18px] leading-[26px] text-[#000000] font-semibold'>
                    Label
                  </p>
                </div>
              </div>
              {!isEditLabel && (
                <div className='w-auto h-auto'>
                  <Button
                    id="taskFormSubmitButton"
                    htmlType="button"
                    label="Edit"
                    onClick={() => setIsEditLabel(true)}
                  />
                </div>
              )}
            </div>
            {!isEditLabel && (
              <div className='w-full h-auto bg-gray-200 p-[16px]'>
                <p className='text-left text-[16px] leading-[24px] text-[#000000]'>
                  Label
                </p>
              </div>
            )}
            {isEditLabel && (
              <div className='w-full h-auto flex flex-col items-start justify-start gap-[8px]'>
                <div className='w-full h-auto flex flex-col items-start justify-start gap-[8px]'>
                  <DatePicker
                    id="start_date"
                    name="start_date"
                    label="Start Date"
                    isRequired={false}
                    value={''}
                    onChange={() => { }}
                  />
                  <DatePicker
                    id="end_date"
                    name="end_date"
                    label="End Date"
                    isRequired={false}
                    value={''}
                    onChange={() => { }}
                  />
                </div>
                <div className='w-full h-auto flex items-center justify-start gap-[8px] max-w-[200px]'>
                  <Button
                    id="taskFormSubmitButton"
                    htmlType="button"
                    label="Save"
                    onClick={() => setIsEditLabel(false)}
                  />
                  <Button
                    id="taskFormSubmitButton"
                    type='outlined-primary'
                    htmlType="button"
                    label="Cancel"
                    onClick={() => setIsEditLabel(false)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailModal
