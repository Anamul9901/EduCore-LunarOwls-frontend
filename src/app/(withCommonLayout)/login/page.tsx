"use client";
import EDForm from "@/src/components/form/EDForm";
import EDInput from "@/src/components/form/EDInput";
import Loading from "@/src/components/UI/loading";
import { useLoginMutation } from "@/src/redux/features/auth/authApi";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const Login = () => {
  const [errorShow, setErrorShow] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loginUser, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    if (error) {
      setErrorShow(true);
    }
  }, [error]);

  useEffect(() => {
    if (errorShow && (error as any)?.data) {
      toast.error((error as any)?.data?.message);
    }
  }, [errorShow, error]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const dateTime = data.eventDateTime;
    // const isoDate = new Date(dateTime).toISOString();
    // data.eventDateTime = isoDate;
    const res = await loginUser(data).unwrap();
    if (res?.data) {
      toast.success(`${res?.message}`);
      const { email, name, id, role } = res?.data?.data;
      const finalUserData = { email, name, id, role };
      dispatch(setUser({ user: finalUserData, token: res?.data?.accessToken }));
      router?.push("/");
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      {isLoading && <Loading />}

      <div className="bg-default-100 shadow-lg rounded-lg w-full max-w-md p-8 mx-4">
        <h3 className="text-3xl font-bold text-center text-default-700">
          Login to EduCore
        </h3>
        <p className="text-center text-default-800 mb-6">
          Welcome back! Let’s get started.
        </p>

        <EDForm onSubmit={onSubmit}>
          <div className="space-y-4">
            {/* <EDDateTime
          name="eventDateTime"
          label="Event Date & Time"
          type="datetime-local"
          size="sm"
        /> */}
            <EDInput name="email" label="Email" type="email" size="sm" />
            <EDInput
              name="password"
              label="Password"
              type="password"
              size="sm"
            />
            <Button
              className="w-full rounded-md bg-gradient-to-r from-teal-400 to-purple-500 text-default-800 font-semibold py-2"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </div>
        </EDForm>

        <div className="mt-4 text-center">
          <p className="text-default-500">
            Don’t have an account?{" "}
            <Link href={"/register"} className="text-teal-500 font-semibold">
              Register
            </Link>
          </p>
          <p className="text-sm text-teal-500 mt-2">
            <Link href={"/forget-password"}>Forgot password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
