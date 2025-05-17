import classNames from 'classnames'
import CloseIcon from '../assets/close_24px_outlined.svg';
import { useAppDispatch } from '../hooks';
import { hideSnackbar } from '../lib/redux/features/snackbarSlice';

interface ComponentProps {
  type: string;
  message: string;
}

const Snackbar = ({ type = 'success', message }: ComponentProps) => {
  const dispatch = useAppDispatch();

  const handleCloseSnackbar = () => {
    dispatch(hideSnackbar());
  }

  return (
    <div className={classNames(
      'w-full max-w-[500px] h-auto px-[10px] py-[5px] rounded-[6px] flex items-center justify-between gap-[10px] fixed top-[35px] left-[50%] -translate-1/2 border-[2px]',
      {
        'bg-green-100 border-green-400 text-green-400': type == 'success',
        'bg-red-100 border-red-400 text-red-400': type == 'error'
      }
    )}>
      <p className={classNames(
        'text-left text-[14px] leading-[20px]',
        {
          'text-green-400': type == 'success',
          'text-red-400': type == 'error'
        }
      )}>
        {message}
      </p>
      <button
        type='button'
        className='w-auto h-auto cursor-pointer'
        onClick={handleCloseSnackbar}
      >
        <img 
          src={CloseIcon}
          alt='Close icon'
          className='w-full h-full min-w-[18px] max-w-[18px] min-h-[18px] max-h-[18px]'
        />
      </button>
    </div>
  )
}

export default Snackbar
