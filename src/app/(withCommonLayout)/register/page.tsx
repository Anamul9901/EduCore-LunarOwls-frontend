"use client";
import EDForm from "@/src/components/form/EDForm";
import EDInput from "@/src/components/form/EDInput";
import EDSelect from "@/src/components/form/EDSelect";
import Loading from "@/src/components/UI/loading";
import { useRegisterMutation } from "@/src/redux/features/auth/authApi";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [resigter, { isLoading, error }] = useRegisterMutation();

  useEffect(() => {
    if ((error as any)?.status == 500) {
      toast.error("Email is already exist");
    }
  }, [error]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.role == "") {
      toast.error("Please select role");
      return;
    }
    const res = await resigter(data).unwrap();
    if (res?.data) {
      toast.success(`${res?.message}`);
      const { email, name, id, role } = res?.data?.result;
      const finalUserData = { email, name, id, role };
      dispatch(setUser({ user: finalUserData, token: res?.data?.accessToken }));
      // if (res?.data?.result?.role == "vendor") {
      //   router.push("/create-shop");
      // } else {
      //   router.push("/");
      // }
    }
  };

  const selectOpdiont = [
    { key: "student", label: "Student" },
    { key: "teacher", label: "Teacher" },
  ];

  return (
    <div className="relative h-screen flex items-center justify-center">
      {isLoading && <Loading />}

      <div className="bg-default-100 shadow-lg rounded-lg w-full max-w-md p-8 mx-4">
        <h3 className="text-3xl font-bold text-center text-default-700">
          Register to CookUp
        </h3>
        <p className="text-center text-default-800 mb-6">
          Create your account to get started.
        </p>

        <EDForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <EDInput name="name" label="Name" size="sm" required />
            <EDInput
              name="email"
              label="Email"
              type="email"
              size="sm"
              required
            />
            <EDInput
              name="password"
              label="Password"
              type="password"
              size="sm"
              required
            />
            <EDSelect name="role" label="Role" options={selectOpdiont} />

            <Button
              className="w-full rounded-md bg-gradient-to-r from-teal-400 to-purple-500 text-default-800 font-semibold py-2"
              size="lg"
              type="submit"
            >
              Register
            </Button>
          </div>
        </EDForm>

        <div className="mt-4 text-center">
          <p className="text-default-500">
            Already have an account?{" "}
            <Link href={"/login"} className="text-teal-500 font-semibold">
              Login
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

export default Register;
