import { Link, useHistory } from "react-router-dom"
import ArrowBackIcon from '../assets/arrow_back_24px_outlined.svg';
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import InputPassword from "../components/InputPassword";
import Button from "../components/Button";
import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { showSnackbar } from "../lib/redux/features/snackbarSlice";
import { saveDataToLocalStorage } from "../lib/crypto-js";
import { registerAccountService } from "../services/authentication.service";

type FormValues = {
  username: string;
  password: string;
};

const Register = () => {
  const { register, handleSubmit, reset, watch } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const onSubmit = async (payload: FormValues) => {
    try {
      setIsLoading(true);
      const response = await registerAccountService({ ...payload })
      if (response.status == 'OK' && response.access_token) {
        const accessToken = response.access_token;
        saveDataToLocalStorage('access_token', accessToken);
        reset();
        history.push("/");
      }
    } catch (error) {
      dispatch(showSnackbar({
        type: 'error',
        message: error
      }))
    } finally {
      setIsLoading(false);
    }
  }

  const disabledButton = () => Boolean(
    watch('username') == '' ||
    watch('password') == ''
  )

  return (
    <div className="w-full h-full min-h-screen bg-linear-to-t from-sky-500 to-indigo-500 p-[25px] pt-[100px]">
      <div className="w-full h-auto flex flex-col items-start justify-start gap-[25px] max-w-[500px] mx-auto">
        <div className="w-full h-auto flex flex-col items-start justify-start gap-[24px] rounded-[16px] bg-white p-[25px] shadow-lg border-[1px] border-gray-400">
          <div className="w-full h-auto flex items-center justify-start gap-[10px]">
            <Link
              to={"/login"}
              className="w-auto h-auto"
            >
              <img
                src={ArrowBackIcon}
                alt="Arrow back icon"
                className="w-full h-full min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px]"
              />
            </Link>
            <p className="text-left text-[24px] leading-[32px] text-[#000000] font-semibold">
              Register
            </p>
          </div>
          <form
            className="w-full h-auto flex flex-col items-start justify-start gap-[24px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full h-auto flex flex-col items-start justify-start gap-[16px]">
              <Input
                id={"username"}
                label={"Username"}
                isRequired={true}
                placeholder="John Doe"
                register={register}
              />
              <InputPassword
                id={"password"}
                label={"Password"}
                isRequired={true}
                placeholder="Password"
                register={register}
              />
            </div>
            <div className="w-full h-auto flex flex-col items-start justify-start gap-[8px]">
              <Button
                id="registerFormSubmit"
                htmlType="submit"
                label="Regitser"
                isLoading={isLoading}
                disabled={disabledButton()}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
