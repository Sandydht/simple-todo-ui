interface ComponentProps {
  id: string;
  label: string;
  isRequired: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  defaultValue?: string;
}

const DatePicker = ({ id, label, isRequired, register, defaultValue }: ComponentProps) => {
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
        type='date'
        className='w-full h-auto px-[20px] py-[10px] border-[1px] border-gray-400 rounded-[8px] focus-within:outline-0 text-left text-[14px] leading-[20px] text-[#000000]'
        {...register(id, {
          required: isRequired
        })}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default DatePicker
