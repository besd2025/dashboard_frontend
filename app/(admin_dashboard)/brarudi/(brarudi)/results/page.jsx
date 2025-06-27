import Results from "../../../ui/brarudi/brarudi/results/results";
import React from "react";

function page() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/60 lg:px-5 px-0 pt-5 dark:border-gray-800 dark:bg-white/[0.03]  sm:px-6 sm:pt-6 ">
      <div className="flex flex-col items-cent/er justify-between w-full gap-2 px-3 py-3 border-b  border-gray-200 dark:border-gray-800 sm:gap-4  lg:border-b-0 lg:px-0 lg:py-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Resultats recus
        </h3>
        <div className="flex flex-col gap-y-3">
          <Results
            from={{
              name: "BRARUDI",
              issuedOn: "11 Mars, 2027",
            }}
            products={[
              { name: "Farine (blanc)", quantity: 200 },
              { name: "Farine (jaune)", quantity: 100 },
              { name: "Son (blanc)", quantity: 845 },
              { name: "Son (jaune)", quantity: 164 },
              { name: "Gruau", quantity: 289 },
            ]}
            vatRate={0.1}
          />
          <Results
            from={{
              name: "BRARUDI",
              issuedOn: "11 Mars, 2027",
            }}
            products={[
              { name: "Farine (blanc)", quantity: 200 },
              { name: "Farine (jaune)", quantity: 100 },
              { name: "Son (blanc)", quantity: 845 },
              { name: "Son (jaune)", quantity: 164 },
              { name: "Gruau", quantity: 289 },
            ]}
            vatRate={0.1}
          />
        </div>
      </div>
    </div>
  );
}

export default page;
