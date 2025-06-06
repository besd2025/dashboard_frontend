"use client";
import Button from "../../ui_elements/button/Button";
import Checkbox from "../../ui_elements/form/input/Checkbox";
import Input from "../../ui_elements/form/input/InputField";
import Label from "../../ui_elements/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex flex-row flex-1  w-ful  h-screen p-4 sm:p-0 bg-white overflow-hidden">
      <div className="flex flex-col justify-center flex-1 w-full lg:w-1/2 max-w-md mx-auto">
        <div>
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
                  <Input placeholder="info@gmail.com" type="email" />
                </div>
                <div>
                  <Label>
                    Mot de passe <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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
                  <Button className="w-full bg-yellow-500" size="sm">
                    Se connecter
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-ma blur-[2px] contrast-75">
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
