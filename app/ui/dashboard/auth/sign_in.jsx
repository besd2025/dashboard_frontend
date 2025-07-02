"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../../ui_elements/button/Button";
import Checkbox from "../../ui_elements/form/input/Checkbox";
import Input from "../../ui_elements/form/input/InputField";
import Label from "../../ui_elements/form/Label";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import LoadingDots from "../../ui_elements/loading/loading_dots";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleLogin = async (e) => {
    if (e) e.preventDefault(); // évite rechargement du formulaire

    if (!identifiant || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
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
      document.cookie = `accessToken=${data.access}; path=/; max-age=3600; secure`;
      localStorage.setItem("accessToken", data.access);
      const user = DecodeToJwt(data.access);
      if (
        user?.category === "Admin" ||
        user?.category === "Anagessa" ||
        user?.category === "General"
      ) {
        router.push("/dashboard/home");
      } else if (user?.category === "Communal") {
        router.push("/municipal/cultivators");
      } else if (user?.category === "Provincial") {
        router.push("/provincial/cultivators");
      } else if (user?.category === "Regional") {
        router.push("/regional/cultivators");
      } else {
        setError("Vous n'avez pas d'accès.");
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
      console.error("Erreur de connexion :", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white lg:bg-yellow-50">
      <div className="bg-white lg:rounded-2xl shadow-lg w-full max-w-md overflow-hidden">
        {/* Header Image with Overlay and SIGN IN text */}
        <div className="relative h-40 w-full">
          <Image
            src="/img/mais_background.jpg"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover brightness-75 blur-[0.5px] "
          />
          <div className="absolute inset-0 bg-bl/ack bg-opacity-40 flex items-center justify-center">
            <h2 className="text-white text-4xl font-bold tracking-wide">
              Se connecter
            </h2>
          </div>
        </div>
        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleLogin}>
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
                      <EyeCloseIcon className="size-6 text-gray-400 dark:text-gray-400" />
                    ) : (
                      <EyeIcon className="size-6 text-gray-400 dark:text-gray-400" />
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
                  type="submit"
                  className="w-full bg-yellow-500 disabled:bg-yellow-500"
                  size="sm"
                  disabled={loading}
                >
                  {loading ? <LoadingDots /> : "Se connecter"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
