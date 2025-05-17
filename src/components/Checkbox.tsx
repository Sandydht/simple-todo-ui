import type React from "react";

interface ComponentProps {
  id: string;
  name: string;
  label: string;
  isRequired: boolean;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ id, name, label, isRequired, checked, onChange }: ComponentProps) => {
  return (
    <label
      htmlFor={id}
      className="text-left text-[14px] leading-[20px] text-[#000000] font-semibold flex items-center justify-start gap-[8px]"
    >
      <input 
        id={id}
        name={name}
        type="checkbox"
        className="w-full h-full min-w-[16px] max-w-[16px] min-h-[16px] max-h-[16px] cursor-pointer"
        checked={checked}
        onChange={onChange}
      />
      <span>
        {label} {isRequired && <span className="text-red-500">*</span>}
      </span>
    </label>
  )
}

export default Checkbox
