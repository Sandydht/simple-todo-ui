import type React from "react";

interface ComponentProps {
  id: string;
  name: string;
  label: string;
  isRequired: boolean;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ id, name, label, isRequired, placeholder, value, onChange }: ComponentProps) => {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-[4px]">
      <label
        htmlFor={id}
        className="text-left text-[14px] leading-[20px] text-[#000000] font-semibold"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        className="w-full h-auto border-[1px] border-gray-400 rounded-[8px] px-[20px] py-[10px] text-left text-[14px] leading-[20px] text-[#000000] focus-within:outline-0"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
