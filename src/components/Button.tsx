interface ComponentProps {
  id: string;
  type?: 'primary' | 'outlined-primary';
  htmlType: 'button' | 'submit';
  label: string;
  onClick?: () => void;
}

const Button = ({ id, type = 'primary', htmlType, label, onClick }: ComponentProps) => {
  if (type == 'outlined-primary') {
    return (
      <button
        id={id}
        type={htmlType}
        className="w-full h-auto rounded-[8px] px-[20px] py-[10px] border-[1px] border-blue-500 cursor-pointer text-center text-[14px] leading-[20px] text-blue-500 font-semibold transition-all hover:bg-gray-100"
        onClick={onClick}
      >
        {label}
      </button>
    )
  }

  return (
    <button
      id={id}
      type={htmlType}
      className="w-full h-auto rounded-[8px] px-[20px] py-[10px] bg-blue-500 cursor-pointer text-center text-[14px] leading-[20px] text-white font-semibold transition-all hover:bg-blue-600"
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
