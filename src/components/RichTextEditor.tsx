import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';

interface ComponentProps {
  id: string;
  label: string;
  isRequired: boolean;
  placeholder: string;
  isShowLabel?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
}

const CustomStyleReactQuill = styled(ReactQuill)`
  width: 100%;
  height: auto;
  min-height: 200px;
  border: 1px solid #90a1b9 !important;
  border-radius: 8px;

  .ql-toolbar.ql-snow {
    widht: 100%;
    height: auto;
    border: 0px !important;
    border-bottom: 1px solid #90a1b9 !important;
  }

  .ql-container.ql-snow {
    widht: 100%;
    height: auto;
    border: 0px !important;
  }

  .ql-container {
    font-size: 14px;
    line-height: 20px;
    color: #000000;
  }
`;

const RichTextEditor = ({ id, label, isRequired, placeholder, isShowLabel = true, control }: ComponentProps) => {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-[4px]">
      {isShowLabel && (
        <label
          htmlFor={id}
          className="text-left text-[14px] leading-[20px] text-[#000000] font-semibold"
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <CustomStyleReactQuill
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  )
}

export default RichTextEditor
