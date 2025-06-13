"use client";
import Button from "../../ui_elements/button/Button";
import Checkbox from "../../ui_elements/form/input/Checkbox";
import Input from "../../ui_elements/form/input/InputField";
import Label from "../../ui_elements/form/Label";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchData } from "../../../_utils/api";
import axios from "axios";
export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const Login = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Signature-web": process.env.NEXT_PUBLIC_SIGNATURE,
          },
          body: JSON.stringify({
            identifiant: identifiant,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.access);
      console.log(data.access);
      router.push("/dashboard/home");
    } catch (error) {
      setError(error);
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="flex flex-row flex-1  w-ful  h-screen lg:p-4 sm:p-0 bg-yellow-500/80 lg:bg-white  overflow-hidden">
      <div className="relative flex flex-col h-full     justify-center flex-1 w-full lg:w-1/2 lg:max-w-md lg:mx-auto">
        <div className="w-full h-full blur-[2px] contrast-75 block lg:hidden">
          <Image
            className="w-full object-cover"
            src="/img/mais_background.jpg"
            alt="Logo"
            width={320}
            height={320}
          />
        </div>
        <div className="absolute sm:bottom-20 lg:bottom-0 lg:relative mx-2 lg: bg-white p-6 lg:p-0 rounded-2xl sm:left-20 lg:left-0">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Se connecter
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Entrez votre nom d'utilisateur et mot de passe pour vous connecter
              !
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                <div>
                  <Label>
                    Nom utilisateur <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder=""
                    type="text"
                    value={identifiant}
                    onChange={(e) => setIdentifiant(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    Mot de passe <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span
                      className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400 cursor-pointer"
                      onClick={setIsChecked}
                    >
                      Gardez-moi connecté
                    </span>
                  </div>
                </div>
                <div>
                  <Button
                    className="w-full bg-yellow-500"
                    size="sm"
                    onClick={(e) => Login(e)}
                  >
                    Se connecter
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-ma blur-[2px] contrast-75 hidden lg:block">
        <Image
          className="w-full object-cover"
          src="/img/mais_background.jpg"
          alt="Logo"
          width={320}
          height={320}
        />
      </div>
    </div>
  );
}
