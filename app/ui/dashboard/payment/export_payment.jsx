"use client";
import Button from "../../ui_elements/button/Button";
import ExportButton from "../../ui_elements/button/export_button";
import React, { useState } from "react";
import ViewPaymentExportList from "./view_payment_export";

function ExportPayment() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showList, setShowList] = useState(false);
  const [exportProcess, setExportProcess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processDone, setProcessDone] = useState(false);

  const exportPaymentListToExcel = () => {
    setExportProcess(true);
    // Simuler un processus d'exportation
    setTimeout(() => {
      // setExportProcess(false);
      setProcessDone(true);
    }, 5000);
  };
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 md:p-6 relative">
        <div className="px-6">
          <div className="flex items-center justify-between  w-full ">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Exporter la liste de paiement
            </h3>
          </div>
          <div className="grid grid-cols-6 gap-4 ">
            <div className="col-span-6 lg:col-span-1 ">
              <div className="space-y-6">
                <div className="relative z-40">
                  <div className="mt-6">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Depuis
                    </label>
                    <div className="relative">
                      <input
                        id="event-start-date"
                        type="date"
                        value={dateFrom ? [new Date(dateFrom)] : undefined}
                        onChange={(date) => {
                          // if (dates && dates.length > 0) {
                          const selectedDat = date[0]; // En supposant que dates est un tableau
                          const formattedDat = selectedDat
                            .toISOString()
                            .split("T")[0]; // Format YYYY-MM-DD
                          setDateFrom(formattedDat);
                          //}
                          //setDateFrom(dates[0]);
                        }}
                        className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-1 ">
              <div className="space-y-6">
                <div>
                  <div className="mt-6">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Jusqu'à
                    </label>
                    <div className="relative">
                      <input
                        id="event-start-date"
                        type="date"
                        value={dateTo ? [new Date(dateFrom)] : undefined}
                        //defaultDate={new Date()}
                        onChange={(date) => {
                          if (date && date.length > 0) {
                            const selectedDate = date[0]; // En supposant que dates est un tableau
                            const formattedDate = selectedDate
                              .toISOString()
                              .split("T")[0]; // Format YYYY-MM-DD
                            setDateTo(formattedDate);
                          }
                          //setDateTo(date[0]);
                        }}
                        className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ExportButton onClick={exportPaymentListToExcel} />
          </div>
          {exportProcess && (
            <div className="flex flex-col lg:flex-row w-full items-center justify-between mt-4 gap-y-4">
              <div className="relative py-4 w-full lg:w-[70%]">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200">
                      En cours...
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-teal-600">
                      70%
                    </span>
                  </div>
                </div>
                <div className="flex rounded-full h-4 bg-gray-200">
                  <div
                    style={{ width: "70%" }}
                    className="rounded-full bg-yellow-600/80"
                  ></div>
                </div>
              </div>
              {processDone && (
                <div className="flex gap-x-2">
                  <Button
                    className={`bg-green-600  px-3 py-2 text-sm h-max`}
                    onClick={() => setShowList(!showList)}
                    // loading={loading}
                    // loadingType="spinner"
                    size=""
                    variant="outline"
                    startIcon={
                      !showList ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                          <path
                            fillRule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                          <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                          <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                        </svg>
                      )
                    }
                  >
                    Apercus
                  </Button>
                  <Button
                    className={`bg-yellow-600 text-white hover:bg-yellow-700 px-3 py-2 text-sm h-max`}
                    // onClick={onClick}
                    // loading={loading}
                    // loadingType="spinner"
                    size=""
                    startIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                  >
                    Telecharger
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {showList && (
        <div className="mt-2 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 md:p-6 relative">
          <div className="lg:px-6">
            <ViewPaymentExportList />
          </div>
        </div>
      )}
    </>
  );
}

export default ExportPayment;
