import type React from "react";

interface ComponentProps {
  id: string;
  label: string;
  isRequired: boolean;
  value: string;
  selectColor: (value: string) => void;
}

const ColorPicker = ({ id, label, isRequired, value, selectColor }: ComponentProps) => {
  const handleSelectColor = (event: React.MouseEvent<HTMLButtonElement>, payload: string) => {
    event.preventDefault();
    selectColor(payload);
  }

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-[4px]">
      <label
        htmlFor={id}
        className="text-left text-[14px] leading-[20px] text-[#000000] font-semibold"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>

      <div className="w-full h-auto flex items-center justify-start gap-[8px]">
        <button
          type="button"
          className={value == '#fb2c36' ? 'w-full h-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px] rounded-full bg-red-600 cursor-pointer transition-all hover:bg-red-600' : 'w-full h-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px] rounded-full bg-red-500 cursor-pointer transition-all hover:bg-red-600'}
          onClick={(event) => handleSelectColor(event, '#fb2c36')}
        ></button>
        <button
          type="button"
          className={value == '#00c951' ? 'w-full h-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px] rounded-full bg-green-600 cursor-pointer transition-all hover:bg-green-600' : 'w-full h-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px] rounded-full bg-green-500 cursor-pointer transition-all hover:bg-green-600'}
          onClick={(event) => handleSelectColor(event, '#00c951')}
        ></button>
        <button
          type="button"
          className={value == '#2b7fff' ? 'w-full h-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px] rounded-full bg-blue-600 cursor-pointer transition-all hover:bg-blue-600' : 'w-full h-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px] rounded-full bg-blue-500 cursor-pointer transition-all hover:bg-blue-600'}
          onClick={(event) => handleSelectColor(event, '#2b7fff')}
        ></button>
      </div>
    </div>
  )
}

export default ColorPicker
