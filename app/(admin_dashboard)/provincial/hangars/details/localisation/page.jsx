import { ChevronLeftIcon, ChevronRightIcon } from "../../../../../ui/icons";
import HangarLocalisation from "../../../../../ui/dashboard/localisation/hangar_localisation";
import React from "react";

function page() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-4 lg:col-span-1 space-y-6 ">
        <div className="flex flex-col top-0 left-0  w-full lg:w-64   mt-4  lg:mt-0   bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 transition-all duration-300 ease-in-out z-50 border rounded-xl border-gray-200">
          <div className="overflow-y-auto overflow-x-auto lg:overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              {/* //hjhghj */}
              <div>
                <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                  <div className="px-6 py-4">
                    <h3 className=" font-medium text-gray-900  dark:text-white/90">
                      Adresse
                    </h3>
                    <p className="mt-1 text-gray-600  dark:text-white/70 text-sm ">
                      123 Main St, San Francisco, CA 94105
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          Longitude
                        </p>
                        <p className="mt-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          3°23'47.0"S
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          Latitude
                        </p>
                        <p className="mt-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          29°22'35.6"E
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* //hangars proches */}
              <div className="flex flex-col mb-8 md:mb-auto gap-2 flex-1 p-4 mt-16">
                <h2 className="font-bold text-gray-800 dark:text-white/90">
                  Hangar proches
                </h2>
                <ul className="flex flex-col gap-2 w-full sm:max-w-md m-auto">
                  <button className="w-full flex flex-row justify-between text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-white/[0.003] hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-2  rounded-md">
                    <span> Hangar 1</span>
                    <ChevronRightIcon className="size-4" />
                  </button>
                  <button className="w-full flex flex-row justify-between text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-white/[0.003] hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-2  rounded-md">
                    <span> Hangar 2</span>
                    <ChevronRightIcon className="size-4" />
                  </button>
                  <button className="w-full flex flex-row justify-between text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-white/[0.003] hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-2  rounded-md">
                    <span> Hangar 3</span>
                    <ChevronRightIcon className="size-4" />
                  </button>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-4 lg:col-span-3 space-y-6  overflow-x-auto rounded-2xl">
        <HangarLocalisation />;
      </div>
    </div>
  );
}

export default page;
