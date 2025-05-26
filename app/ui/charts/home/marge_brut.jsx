import React from "react";

function MargeBrut() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-yellow-600/80 p-5 dark:border-gray-800  md:p-6">
      <div className="flex items-center   ">
        {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 text-white/80"
        >
          <path
            fillRule="evenodd"
            d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z"
            clipRule="evenodd"
          />
        </svg>

        <h4 className="ml-2 font-semibold  text-2xl dark:text-white/90">
          1.000 <span className="text-sm">FBU/kg</span>
        </h4>
      </div>

      <div className="flex items-end justify-between mt-2">
        <div>
          <span className="text-md text-white/90  font-semi/bold">
            Marge Brute
          </span>
        </div>
        {/* <Badge color="success">
          <ArrowUpIcon />
          2.0%
        </Badge> */}
      </div>
    </div>
  );
}

export default MargeBrut;
