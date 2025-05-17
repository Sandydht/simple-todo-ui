interface ComponentProps {
  id: string;
  label: string;
  isRequired: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
}

const Checkbox = ({ id, label, isRequired, register }: ComponentProps) => {
  return (
    <label
      htmlFor={id}
      className="text-left text-[14px] leading-[20px] text-[#000000] font-semibold flex items-center justify-start gap-[8px]"
    >
      <input
        id={id}
        type="checkbox"
        className="w-full h-full min-w-[16px] max-w-[16px] min-h-[16px] max-h-[16px] cursor-pointer"
        {...register(id)}
      />
      <span>
        {label} {isRequired && <span className="text-red-500">*</span>}
      </span>
    </label>
  )
}

export default Checkbox
