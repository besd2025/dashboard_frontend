import React from "react";

export default function CardsOverview() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:gap-6">
      {/* <!-- Metric Item Start quantity collected --> */}
      <div className="rounded-2xl border border-gray-200 bg-green-300 p-3 dark:border-gray-800 dark:bg-white/[0.03] ">
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Qté Vendue
            </span>
          </div>
        </div>
        <div className="flex">
          {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
          <div className="flex items-center justify-center   rounded-xl dark:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor "
              className="size-6 text-gray-800  dark:text-white/90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
              />
            </svg>
          </div>

          <h4 className="ml-3 font-semibold text-gray-800 text-lg dark:text-white/90">
            500,452 <span className="text-sm">KG</span>
          </h4>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}

      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}

      <div className="rounded-2xl border border-gray-200 bg-yellow-200 p-3 dark:border-gray-800 dark:bg-white/[0.03] ">
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Montant
            </span>
          </div>
        </div>
        <div className="flex">
          {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
          <div className="flex items-center justify-center  rounded-xl dark:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-800  dark:text-white/90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
              />
            </svg>
          </div>

          <h4 className="ml-3 font-bold text-gray-800 text-lg dark:text-white/90">
            300 M <span className="text-sm">FBU</span>
          </h4>
        </div>
      </div>

      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}

      <div className="rounded-2xl border border-gray-200 bg- p-3 dark:border-gray-800 dark:bg-white/[0.03] ">
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Paiement
            </span>
          </div>
        </div>
        <div className="flex">
          {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
          <div className="flex items-center justify-center  rounded-xl dark:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-800  dark:text-white/90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
              />
            </svg>
          </div>

          {/* <h4 className="ml-3 font-bold text-gray-800 text-lg dark:text-white/90">
            Ecocash <span className="text-sm">68456218</span>
          </h4> */}
          <div className="grid grid-cols-2 gap-4 ml-2 ">
            <div>
              <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                Type
              </p>
              <p className="text-sm  text-gray-800 dark:text-white/90 font-semibold">
                LUMICASH
              </p>
            </div>

            <div>
              <p className=" text-xs leading-normal text-gray-500 dark:text-gray-400">
                No
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                68456125
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Metric Item End --> */}
    </div>
  );
}
