import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import styled from 'styled-components';

interface ComponentProps {
  id: string;
  label: string;
  isRequired: boolean;
  placeholder: string;
  value: string;
  isShowLabel?: boolean;
  onChange: (value: string) => void;
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

const RichTextEditor = ({ id, label, isRequired, placeholder, value, isShowLabel = true, onChange }: ComponentProps) => {
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
      <CustomStyleReactQuill
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default RichTextEditor
