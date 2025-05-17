import { useState } from 'react';
import VisibilityIcon from '../assets/visibility_24px_outlined.svg';
import VisibilityOffIcon from '../assets/visibility_off_24px_outlined.svg';

interface ComponentProps {
  id: string;
  label: string;
  isRequired: boolean;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
}

const InputPassword = ({ id, label, isRequired, placeholder, register }: ComponentProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-[4px]">
      <label
        htmlFor={id}
        className="text-left text-[14px] leading-[20px] text-[#000000] font-semibold"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div className="w-full h-auto border-[1px] border-gray-400 rounded-[8px] flex items-center justify-between gap-[20px] px-[20px]">
        <input
          id={id}
          type={isShowPassword ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(id, {
            required: isRequired
          })}
          className="w-full h-auto focus-within:outline-0 py-[10px] text-left text-[14px] leading-[20px] text-[#000000]"
        />
        <button
          type="button"
          className="w-auto h-auto cursor-pointer flex items-center justify-center focus-within:outline-0"
          onClick={() => setIsShowPassword(!isShowPassword)}
        >
          <img
            src={isShowPassword ? VisibilityIcon : VisibilityOffIcon}
            className='w-full h-full min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px]'
            alt='Visibility icon'
            loading='lazy'
          />
        </button>
      </div>
    </div>
  )
}

export default InputPassword
