"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      //Signup with Appwrite & create plaid link token
      if (type === "sign-up") {
          const newUser = await signUp(data);
          setUser(newUser);
      }
      if (type === "sign-in") {
          const response = await signIn({ email: data.email, password: data.password })
          if (response) {
              router.push('/')
          }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Synergetics Logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Synergetics
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-in" ? (
                <>
                  <CustomInput
                    control={form.control}
                    name={"email"}
                    label={"Email"}
                    placeholder={"Enter your email"}
                  />
                  <CustomInput
                    control={form.control}
                    name={"password"}
                    label={"Password"}
                    inputType="password"
                    placeholder={"Enter your password"}
                  />
                </>
              ) : (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Ex: John"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Ex: Doe"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="Enter your specific address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="State"
                      placeholder="Ex: NY"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Postal Code"
                      placeholder="Ex: 11101"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dob"
                      label="Date of Birth"
                      placeholder="yyyy-mm-dd"
                      inputType="date"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="Ex: 1234"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name={"email"}
                    label={"Email"}
                    placeholder={"Enter your email"}
                  />
                  <CustomInput
                    control={form.control}
                    name={"password"}
                    label={"Password"}
                    inputType="password"
                    placeholder={"Enter your password"}
                  />
                </>
              )}

              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Login"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
