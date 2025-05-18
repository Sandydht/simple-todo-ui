import classNames from 'classnames'
import type React from 'react';
import CalendarIcon from '../assets/calendar_today_24px_outlined.svg';
import { fromISOToDateHuge } from '../lib/luxon';
import { useAppDispatch } from '../hooks';
import { showSnackbar } from '../lib/redux/features/snackbarSlice';
import { useEffect, useState } from 'react';
import { updateTask } from '../services/task.service';

interface ComponentProps {
  data: TaskData;
  onClick: (taskId: number) => void;
}

interface TaskData {
  id: number;
  title: string;
  description: string;
  label_color: string;
  start_date: string;
  end_date: string;
  is_done: boolean;
}

const TaskItem = ({ data, onClick }: ComponentProps) => {
  const dispatch = useAppDispatch();
  const [editTaskDataPayload, setEditTaskDataPayload] = useState<{
    title?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    is_done?: boolean;
    label_color?: string;
  }>();

  useEffect(() => {
    if (data) {
      setEditTaskDataPayload({
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        is_done: data.is_done,
        label_color: data.label_color
      })
    }
  }, [data])

  const handleClick = () => {
    onClick(data.id);
  }

  const handleClickCheckbox = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation()
  }

  const handleChangeCheckbox = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { checked } = event.target;

      const updateEditTaskPayload = {
        ...editTaskDataPayload,
        is_done: checked
      }

      setEditTaskDataPayload(updateEditTaskPayload);
      await updateTask(data?.id || null, { ...updateEditTaskPayload });
    } catch (error) {
      dispatch(showSnackbar({
        type: 'error',
        message: error
      }))
    }
  }

  return (
    <button
      type='button'
      className={classNames(
        'w-full h-auto border-[1.5px] rounded-[8px] flex flex-col items-start justify-start gap-[4px] cursor-pointer transition-all duration-500 px-[20px] py-[10px] hover:py-[15px]',
        {
          'border-[#62748e] bg-gray-200': data.label_color == '#62748e',
          'border-[#00c951] bg-green-100': data.label_color == '#00c951',
          'border-[#fb2c36] bg-red-100': data.label_color == '#fb2c36',
          'border-[#2b7fff] bg-blue-100': data.label_color == '#2b7fff',
        }
      )}
      onClick={handleClick}
    >
      <div className='w-full h-auto flex items-center justify-start gap-[16px]'>
        <div className='w-auto h-auto pointer-events-none flex items-center justify-center'>
          <input
            type='checkbox'
            className="w-full h-full min-w-[16px] max-w-[16px] min-h-[16px] max-h-[16px] cursor-pointer pointer-events-auto"
            checked={editTaskDataPayload?.is_done || false}
            onClick={handleClickCheckbox}
            onChange={handleChangeCheckbox}
          />
        </div>

        <div className='w-full h-auto pointer-events-auto'>
          <p className='text-left text-[16px] leading-[24px] text-[#000000] font-semibold'>
            {data.title}
          </p>
        </div>
      </div>
      {data.start_date && data.end_date && (
        <div className='w-full h-auto flex items-center justify-start gap-[16px]'>
          <div className='w-full h-full min-w-[16px] max-w-[16px] min-h-[16px] max-h-[16px]'></div>
          <div className='w-auto h-auto flex items-center justify-start gap-[8px]'>
            <div className='w-auto h-auto'>
              <img
                src={CalendarIcon}
                alt='Calendar icon'
                loading='lazy'
                className='w-full h-full min-w-[16px] max-w-[16px] min-h-[16px] max-h-[16px]'
              />
            </div>
            <div className='w-full h-auto'>
              <p className='text-left text-[14px] leading-[20px] text-[#000000]'>
                {fromISOToDateHuge(data.start_date)} - {fromISOToDateHuge(data.end_date)}
              </p>
            </div>
          </div>
        </div>
      )}
    </button>
  )
}

export default TaskItem
