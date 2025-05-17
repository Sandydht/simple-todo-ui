import TaskItem from "../components/TaskItem";
import AddIcon from '../assets/add_24px_outlined.svg';
import TaskFormModal from "../components/TaskFormModal";
import { useEffect, useState } from "react";
import TaskDetailModal from "../components/TaskDetailModal";

const Home = () => {
  const [isShowTaskFormModal, setIsShowTaskFormModal] = useState<boolean>(false);
  const [isShowTaskDetailModal, setIsShowTaskDetailModal] = useState<boolean>(false);
  const [taskData] = useState<{
    id: number;
    title: string;
    description: string;
    label_color: string;
    start_date: string;
    end_date: string;
    is_done: boolean;
  }[]>([
    {
      id: 1,
      title: 'Test task 1',
      description: 'This is task 1',
      label_color: '#62748e',
      start_date: '',
      end_date: '',
      is_done: false
    },
    {
      id: 2,
      title: 'Test task 2',
      description: 'This is task 2',
      label_color: '#00c951',
      start_date: '',
      end_date: '',
      is_done: false
    },
    {
      id: 3,
      title: 'Test task 3',
      description: 'This is task 3',
      label_color: '#fb2c36',
      start_date: '',
      end_date: '',
      is_done: false
    },
    {
      id: 4,
      title: 'Test task 4',
      description: 'This is task 4',
      label_color: '#2b7fff',
      start_date: '',
      end_date: '',
      is_done: true
    },
  ])

  useEffect(() => {
    if (isShowTaskFormModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isShowTaskFormModal])

  const handleClickDetail = (taskId: number) => {
    setIsShowTaskDetailModal(true);
    console.log('taskId: ', taskId)
  }

  return (
    <div className="w-full h-full min-h-screen bg-linear-to-t from-sky-500 to-indigo-500 p-[25px]">
      {isShowTaskFormModal && (
        <TaskFormModal
          onClose={() => setIsShowTaskFormModal(false)}
        />
      )}

      {isShowTaskDetailModal && (
        <TaskDetailModal
          onClose={() => setIsShowTaskDetailModal(false)}
        />
      )}

      <div className="w-full h-auto flex flex-col items-start justify-start gap-[25px] max-w-[728px] mx-auto">
        {/* Task list */}
        <div className="w-full h-auto flex flex-col items-start justify-start gap-[24px] rounded-[16px] bg-white p-[25px] shadow-lg border-[1px] border-gray-400">
          <div className="w-full h-auto">
            <p className="text-left text-[24px] leading-[32px] text-[#000000] font-semibold">
              Simple TODO
            </p>
          </div>

          <div className="w-full h-auto flex flex-col items-start justify-start gap-[16px]">
            {taskData.map((item) => (
              <TaskItem
                data={item}
                onClick={handleClickDetail}
              />
            ))}
          </div>
        </div>

        {/* Floating Button */}
        <button
          type="button"
          className="w-full h-full min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px] rounded-full bg-white fixed bottom-[25px] right-[25px] shadow-lg border-[1px] border-gray-400 cursor-pointer flex items-center justify-center"
          onClick={() => setIsShowTaskFormModal(!isShowTaskFormModal)}
        >
          <img
            src={AddIcon}
            alt="Add icon"
            loading="lazy"
          />
        </button>
      </div>
    </div>
  )
}

export default Home
