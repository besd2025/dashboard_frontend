"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "../../ui_elements/button/Button";
import Checkbox from "../../ui_elements/form/input/Checkbox";
import Input from "../../ui_elements/form/input/InputField";
import Label from "../../ui_elements/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function DecodeToJwt(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Échec du décodage du token", error);
      return null;
    }
  }

  const handleLogin = async () => {
    if (!identifiant || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Signature-web": process.env.NEXT_PUBLIC_SIGNATURE,
          },
          body: JSON.stringify({ identifiant, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.detail || "Échec de connexion.");
      }

      const data = await response.json();
      //localStorage.setItem("accessToken", data.access);
      document.cookie = `accessToken=${data.access}; path=/; max-age=3600; secure`;
      const user = DecodeToJwt(data.access);
      if (
        user?.category == "Admin" ||
        user?.category == "Anagessa" ||
        user?.category == "General"
      ) {
        router.push("/dashboard/home");
      } else if (user?.category == "Communal") {
        router.push("/municipal/cultivators");
      } else if (user?.category == "Provincial") {
        router.push("/provincial/cultivators");
      } else if (user?.category == "Regional") {
        router.push("/regional/cultivators");
      } else {
        setError("vous n'avez pas d'acces.");
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
      console.error("Erreur de connexion :", err);
    }
  };

  return (
    <div className="flex flex-row flex-1 w-full h-screen lg:p-4 sm:p-0 bg-yellow-500/80 lg:bg-white overflow-hidden">
      <div className="relative flex flex-col h-full justify-center flex-1 w-full lg:w-1/2 lg:max-w-md lg:mx-auto">
        <div className="w-full h-full blur-[2px] contrast-75 block lg:hidden">
          <Image
            className="w-full object-cover"
            src="/img/mais_background.jpg"
            alt="Background"
            width={320}
            height={320}
          />
        </div>
        <div className="absolute sm:bottom-20 lg:bottom-0 lg:relative mx-2 bg-white p-6 lg:p-0 rounded-2xl sm:left-20 lg:left-0">
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
            <div className="space-y-6">
              <div>
                <Label>
                  Nom utilisateur <span className="text-error-500">*</span>
                </Label>
                <Input
                  placeholder="Nom d'utilisateur"
                  type="text"
                  value={identifiant}
                  onChange={(e) => setIdentifiant(e.target.value)}
                />
              </div>
              <div>
                <Label>
                  Mot de passe <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
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
                    onClick={() => setIsChecked(!isChecked)}
                  >
                    Gardez-moi connecté
                  </span>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div>
                <Button
                  onClick={() => handleLogin()}
                  className="w-full bg-yellow-500"
                  size="sm"
                >
                  Se connecter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-full blur-[2px] contrast-75 hidden lg:block">
        <Image
          className="w-full object-cover"
          src="/img/mais_background.jpg"
          alt="Background"
          width={320}
          height={320}
        />
      </div>
    </div>
  );
}
