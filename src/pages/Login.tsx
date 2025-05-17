import { useForm } from "react-hook-form"
import Input from "../components/Input"
import Button from "../components/Button";
import InputPassword from "../components/InputPassword";
import { loginAccountService } from "../services/authentication.service";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { saveDataToLocalStorage } from "../lib/crypto-js";
import { useAppDispatch } from "../hooks";
import { showSnackbar } from "../lib/redux/features/snackbarSlice";

type FormValues = {
  username: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, reset, watch } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const onSubmit = async (payload: FormValues) => {
    try {
      setIsLoading(true);
      const response = await loginAccountService({ ...payload })
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
          <div className="w-full h-auto">
            <p className="text-left text-[24px] leading-[32px] text-[#000000] font-semibold">
              Login
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
                id="loginFormSubmit"
                htmlType="submit"
                label="Login"
                isLoading={isLoading}
                disabled={disabledButton()}
              />
              <Link
                to={"/register"}
                className="text-left text-[14px] leading-[20px] text-blue-500 font-semibold"
              >
                Register Account ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
