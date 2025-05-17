import Button from "./Button";

interface ComponentProps {
  title: string;
  description: string;
  onCancel: (() => void) | null;
  onConfirm: (() => void) | null;
  isLoading: boolean;
}

const ConfirmationModalBox = ({ title, description, onCancel, onConfirm, isLoading }: ComponentProps) => {
  const handleCancel = () => {
    if (onCancel != null) {
      onCancel();
    }
  }

  const handleConfirm = () => {
    if (onConfirm != null) {
      onConfirm();
    }
  }

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-50">
      <div className="absolute left-0 top-0 right-0 bottom-0 bg-black opacity-50"></div>

      <div className="absolute left-0 top-0 right-0 bottom-0 p-[25px] flex items-center justify-center">
        <div className="w-full h-auto max-w-[500px] bg-white rounded-[8px] p-[25px] flex flex-col items-start justify-start gap-[24px]">
          <div className="w-full h-auto flex flex-col items-start justify-start gap-[8px]">
            <p className="text-left text-[16px] leading-[24px] text-black font-semibold">
              {title}
            </p>
            <p className="text-left text-[14px] leading-[20px] text-black">
              {description}
            </p>
          </div>
          <div className="w-full h-auto flex items-center justify-between gap-[16px]">
            <Button
              id="noConfirmationModalBoxButton"
              label="No"
              type="outlined-primary"
              htmlType="button"
              onClick={handleCancel}
            />
            <Button
              id="yesConfirmationModalBoxButton"
              label="Yes"
              type="primary"
              htmlType="button"
              onClick={handleConfirm}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModalBox
