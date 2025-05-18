import CloseIcon from '../assets/close_24px_outlined.svg';
import NotesIcon from '../assets/notes_24px_outlined.svg';
import Button from './Button';
import CalendarIcon from '../assets/calendar_today_24px_outlined.svg';
import LabelIcon from '../assets/label_24px_outlined.svg';
import React, { useEffect, useRef, useState } from 'react';
import type { TaskData } from '../pages/Home';
import DOMPurify from 'dompurify';
import classNames from 'classnames'
import { updateTask } from '../services/task.service';
import EditTaskTitleInput from './EditTaskTitleInput';
import { fromISOToDateHuge } from '../lib/luxon';
import EditTaskDescriptionInput from './EditTaskDescriptionInput';
import { useAppDispatch } from '../hooks';
import { showSnackbar } from '../lib/redux/features/snackbarSlice';

interface ComponentProps {
  taskData: TaskData | null;
  onClose: () => void;
}

const TaskDetailModal = ({ taskData, onClose }: ComponentProps) => {
  const [isEditTitle, setIsEditTitle] = useState<boolean>(false);
  const [isEditDescription, setIsEditDescription] = useState<boolean>(false);
  const [isEditDates, setIsEditDates] = useState<boolean>(false);
  const [isEditLabel, setIsEditLabel] = useState<boolean>(false);
  const [cleanDescriptionHtml, setCleanDescriptionHtml] = useState<string | TrustedHTML>();
  const [editTaskDataPayload, setEditTaskDataPayload] = useState<{
    title?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    is_done?: boolean;
    label_color?: string;
  }>();
  const editTitleRef = useRef<HTMLDivElement | null>(null);
  const [updateDataLoading, setUpdateDataLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (taskData) {
      setEditTaskDataPayload({
        title: taskData.title,
        description: taskData.description,
        start_date: taskData.start_date,
        end_date: taskData.end_date,
        is_done: taskData.is_done,
        label_color: taskData.label_color
      })
    }

    if (taskData?.description) {
      const cleanHtml = DOMPurify.sanitize(taskData?.description)
      setCleanDescriptionHtml(cleanHtml)
    }
  }, [taskData])

  const handleEditIsDone = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { checked } = event.target;

      const updateEditTaskPayload = {
        ...editTaskDataPayload,
        is_done: checked
      }

      setEditTaskDataPayload(updateEditTaskPayload);
      await updateTask(taskData?.id || null, { ...updateEditTaskPayload });
    } catch (error) {
      dispatch(showSnackbar({
        type: 'error',
        message: error
      }))
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideEditTitle);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideEditTitle);
    }
  }, [])

  const handleClickOutsideEditTitle = async (event: MouseEvent) => {
    const target = event.target as Node;

    if (editTitleRef.current && !editTitleRef.current?.contains(target)) {
      setIsEditTitle(false)
    }
  }

  const handleOnChangeInputTitle = async (data: string) => {
    try {
      const updateEditTaskPayload = {
        ...editTaskDataPayload,
        title: data
      }

      setEditTaskDataPayload(updateEditTaskPayload);
      await updateTask(taskData?.id || null, { ...updateEditTaskPayload });
    } catch (error) {
      dispatch(showSnackbar({
        type: 'error',
        message: error
      }))
    }
  }

  const handleKeyDownTaskTitle = async (data: string) => {
    const updateEditTaskPayload = {
      ...editTaskDataPayload,
      title: data
    }

    setEditTaskDataPayload(updateEditTaskPayload);
    const response = await updateTask(taskData?.id || null, { ...updateEditTaskPayload });
    if (response.status == 'OK' && response.data) {
      setIsEditTitle(false);
    }
  }

  const handleSubmitUpdateDescription = async (data: { description: string }) => {
    try {
      setUpdateDataLoading(true)
      const updateEditTaskPayload = {
        ...editTaskDataPayload,
        description: data.description
      }

      setEditTaskDataPayload(updateEditTaskPayload);
      const response = await updateTask(taskData?.id || null, { ...updateEditTaskPayload });
      if (response.status == 'OK' && response.data) {
        setIsEditDescription(false);
        const cleanHtml = DOMPurify.sanitize(updateEditTaskPayload?.description)
        setCleanDescriptionHtml(cleanHtml)
      }
    } catch (error) {
      dispatch(showSnackbar({
        type: 'error',
        message: error
      }))
    } finally {
      setUpdateDataLoading(false)
    }
  }

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
                  id='is_done'
                  name='is_done'
                  type='checkbox'
                  className="w-full h-full min-w-[16px] max-w-[16px] min-h-[16px] max-h-[16px] cursor-pointer pointer-events-auto"
                  checked={editTaskDataPayload?.is_done || false}
                  onChange={handleEditIsDone}
                />
              </div>

              {!isEditTitle && (
                <div
                  className="w-full h-auto"
                  onClick={() => setIsEditTitle(true)}
                >
                  <p className='text-left text-[24px] leading-[32px] text-[#000000] font-semibold'>
                    {editTaskDataPayload?.title || '-'}
                  </p>
                </div>
              )}

              {isEditTitle && (
                <div
                  ref={editTitleRef}
                  className='w-full h-auto'
                >
                  <EditTaskTitleInput
                    defaultValue={editTaskDataPayload?.title || ''}
                    onChangeInput={handleOnChangeInputTitle}
                    onKeyDown={handleKeyDownTaskTitle}
                  />
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
                <p
                  className='text-left text-[16px] leading-[24px] text-[#000000]'
                  dangerouslySetInnerHTML={{
                    __html: cleanDescriptionHtml || ''
                  }}
                ></p>
              </div>
            )}

            {isEditDescription && (
              <div className='w-full h-auto'>
                <EditTaskDescriptionInput
                  onCancel={() => setIsEditDescription(false)}
                  defaultValue={editTaskDataPayload?.description || ''}
                  isLoading={updateDataLoading}
                  onSubmitUpdate={handleSubmitUpdateDescription}
                />
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
                  {fromISOToDateHuge(taskData?.start_date || '')} - {fromISOToDateHuge(taskData?.end_date || '')}
                </p>
              </div>
            )}
            {isEditDates && (
              <div>
                <p>Dates edit</p>
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
                <div className={classNames(
                  'w-full h-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px] rounded-full',
                  {
                    'bg-gray-500': taskData?.label_color == '#62748e',
                    'bg-green-500': taskData?.label_color == '#00c951',
                    'bg-red-500': taskData?.label_color == '#fb2c36',
                    'bg-blue-500': taskData?.label_color == '#2b7fff',
                  }
                )}></div>
              </div>
            )}
            {isEditLabel && (
              <div>
                <p>Edit label</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailModal
