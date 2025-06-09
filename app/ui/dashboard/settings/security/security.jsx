import LoginHistory from "../../../ui_elements/tables/settings/login_history";
import Link from "next/link";
import React from "react";

function SecurityPage() {
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Parametre de sécurité
        </h3>
        <div className="space-y-4">
          <Link
            href="/dashboard/settings/security/change_password"
            className="flex flex-row justify-between bg-gray-100 p-3 rounded-md dark:bg-white/[0.03] text-blue-500"
          >
            <span className="text-sm tracking-wide truncate">
              Réinitialisation du mot de passe
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span>Dernière connexion : 2024-03-20 14:30:45</span>
          </div>
          <LoginHistory />
        </div>
      </div>
    </div>
  );
}

export default SecurityPage;
