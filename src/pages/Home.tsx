import { useEffect, useState } from "react"
import { gerProfileService, logoutAccountService } from "../services/authentication.service"
import { useAppDispatch } from "../hooks"
import { resetUserProfileData, setUserProfileData } from "../lib/redux/features/authenticationSlice";
import { showSnackbar } from "../lib/redux/features/snackbarSlice";
import ExitAppIcon from '../assets/exit_to_app_24px_outlined.svg';
import TaskItem from "../components/TaskItem";
import AddIcon from '../assets/add_24px_outlined.svg';
import { hideConfirmationModalBox, setConfirmationModalBoxLoading, showConfirmationModalBox } from "../lib/redux/features/modalBoxSlice";
import { useHistory } from "react-router-dom";
import TaskFormModal from "../components/TaskFormModal";
import { getTaskList } from "../services/task.service";
import TaskDetailModal from "../components/TaskDetailModal";

export interface TaskData {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  label_color: string;
  is_done: boolean;
  created_at: string;
  updated_at: string;
}

const Home = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowTaskFormModal, setIsShowTaskFormModal] = useState<boolean>(false);
  const [isShowTaskDetailModal, setIsShowTaskDetailModal] = useState<boolean>(false);
  const [taskData, setTaskData] = useState<TaskData[]>([])
  const history = useHistory();
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);

  useEffect(() => {
    fetchUserProfileData()
    fetchTaskList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchUserProfileData = async () => {
    try {
      setIsLoading(true)
      const response = await gerProfileService();
      if (response.status == 'OK' && response.data) {
        dispatch(setUserProfileData(response.data));
      }
    } catch (error) {
      dispatch(resetUserProfileData());
      dispatch(showSnackbar({
        type: 'error',
        message: error
      }))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isShowTaskFormModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isShowTaskFormModal])

  const handleClickDetail = (taskId: number) => {
    setIsShowTaskDetailModal(true);
    const task = findTask(taskId);
    setSelectedTask(task);
  }

  const handleLogout = () => {
    dispatch(showConfirmationModalBox({
      title: 'Logout Confirmation',
      description: 'Are you sure you want to exit the application?',
      onCancel: () => {
        dispatch(hideConfirmationModalBox());
      },
      onConfirm: () => {
        handleConfirmLogout();
      }
    }))
  }

  const handleConfirmLogout = async () => {
    try {
      dispatch(setConfirmationModalBoxLoading(true));
      const response = await logoutAccountService();
      if (response.status == 'OK') {
        localStorage.clear();
        dispatch(hideConfirmationModalBox());
        history.push("/login");
      }
    } catch (error) {
      dispatch(showSnackbar({
        type: 'error',
        message: error
      }))
    } finally {
      dispatch(setConfirmationModalBoxLoading(false));
    }
  }

  const fetchTaskList = async () => {
    try {
      setIsLoading(true)
      const response = await getTaskList();
      if (response.status == 'OK' && response.data) {
        setTaskData(response.data);
      }
    } catch (error) {
      dispatch(showSnackbar({
        type: 'error',
        message: error
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccessCreatedTask = () => {
    fetchTaskList()
    setIsShowTaskFormModal(false)
  }

  const findTask = (taskId: number): TaskData | null => {
    if (taskData.length < 1) return null;
    const task = taskData.find((item: TaskData) => item.id == taskId);
    return task || null;
  }

  return (
    <>
      {isShowTaskFormModal && (
        <TaskFormModal
          onClose={() => setIsShowTaskFormModal(false)}
          onSuccessCreatedTask={handleSuccessCreatedTask}
        />
      )}

      {isShowTaskDetailModal && (
        <TaskDetailModal
          taskData={selectedTask}
          onClose={() => setIsShowTaskDetailModal(false)}
        />
      )}

      <div className="w-full h-auto min-h-screen bg-linear-to-t from-sky-500 to-indigo-500">
        <div className="w-full h-auto bg-white flex items-center justify-center px-[20px] py-[10px] shadow-lg sticky top-0 z-10">
          <div className="w-full h-auto max-w-[1024px] flex items-center justify-between px-[20px] py-[10px]">
            <p className="text-left text-[24px] leading-[32px] text-[#000000] font-semibold">
              Simple TODO
            </p>
            <button
              type="button"
              className="w-auto h-auto cursor-pointer focus-within:outline-0"
              onClick={handleLogout}
            >
              <img
                src={ExitAppIcon}
                alt="Exit app icon"
                className="w-full h-full min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px]"
                loading="lazy"
              />
            </button>
          </div>
        </div>

        {!isLoading && (
          <>
            <div className="w-full h-auto flex flex-col items-start justify-start gap-[25px] max-w-[728px] mx-auto p-[25px]">
              <div className="w-full h-auto flex flex-col items-start justify-start gap-[24px] rounded-[16px] bg-white p-[25px] shadow-lg border-[1px] border-gray-400">
                <div className="w-full h-auto">
                  <p className="text-left text-[24px] leading-[32px] text-[#000000] font-semibold">
                    Task List
                  </p>
                </div>

                <div className="w-full h-auto flex flex-col items-start justify-start gap-[16px]">
                  {taskData.map((item) => (
                    <TaskItem
                      key={item.id}
                      data={item}
                      onClick={handleClickDetail}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

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
    </>
  )
}

export default Home
