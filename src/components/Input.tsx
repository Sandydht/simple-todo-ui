import type React from "react";

interface ComponentProps {
  id: string;
  label: string;
  isRequired: boolean;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  showLabel?: boolean;
  defaultValue?: string;
  autoFocus?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({ id, label, isRequired, placeholder, register, showLabel = true, defaultValue, autoFocus = false, onKeyDown }: ComponentProps) => {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-[4px]">
      {showLabel && (
        <label
          htmlFor={id}
          className="text-left text-[14px] leading-[20px] text-[#000000] font-semibold"
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        type="text"
        className="w-full h-auto border-[1px] border-gray-400 rounded-[8px] px-[20px] py-[10px] text-left text-[14px] leading-[20px] text-[#000000] focus-within:outline-0"
        placeholder={placeholder}
        {...register(id, {
          required: isRequired
        })}
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

export default Input
