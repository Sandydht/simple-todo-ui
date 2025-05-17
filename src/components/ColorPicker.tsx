import { Controller } from 'react-hook-form'

interface ComponentProps {
  id: string;
  label: string;
  isRequired: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
}

const ColorPicker = ({ id, label, isRequired, control }: ComponentProps) => {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-[4px]">
      <label
        htmlFor={id}
        className="text-left text-[14px] leading-[20px] text-[#000000] font-semibold"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>

      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <div className="w-full h-auto flex items-center justify-start gap-[8px]">
            <button
              type="button"
              className={field.value == '#fb2c36' ? 'w-full h-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px] rounded-full bg-red-600 cursor-pointer transition-all hover:bg-red-600' : 'w-full h-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px] rounded-full bg-red-500 cursor-pointer transition-all hover:bg-red-600'}
              onClick={() => field.onChange('#fb2c36')}
            ></button>
            <button
              type="button"
              className={field.value == '#00c951' ? 'w-full h-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px] rounded-full bg-green-600 cursor-pointer transition-all hover:bg-green-600' : 'w-full h-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px] rounded-full bg-green-500 cursor-pointer transition-all hover:bg-green-600'}
              onClick={() => field.onChange('#00c951')}
            ></button>
            <button
              type="button"
              className={field.value == '#2b7fff' ? 'w-full h-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px] rounded-full bg-blue-600 cursor-pointer transition-all hover:bg-blue-600' : 'w-full h-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px] rounded-full bg-blue-500 cursor-pointer transition-all hover:bg-blue-600'}
              onClick={() => field.onChange('#2b7fff')}
            ></button>
          </div>
        )}
      />
    </div>
  )
}

export default ColorPicker
