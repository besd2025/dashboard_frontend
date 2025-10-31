import React, { useEffect, useState } from "react";
import {
  TableBody,
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../ui_elements/tables/table_elemets";
import { fetchData } from "../../../../../_utils/api";
function ModificationAchat({ achat_id }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!achat_id) return;

    async function getData() {
      try {
        const response = await fetchData(
          "get",
          `/achats/${achat_id}/get_purchase_history/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        setData(response.results);
        console.log("achat modification data: ", response);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement de l'adresse");
      }
    }

    getData();
  }, [achat_id]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-8  w-full">
      <div className="max-w-full overflow-x-auto col-span-8  ">
        <div className="min-w-max max-h-[25rem] lg:h-full lg:max-h-full">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] shadow-sm ">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase "
                >
                  Cultivateur
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase "
                >
                  Date d'achat
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Quantité blanc
                </TableCell>{" "}
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Quantité Jaune
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Numéro de recu
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody
              //loading={loading}
              columns={5}
              // skeletonRows={totalCount < 5 ? totalCount : 5}
              menu={false}
              className="divide-y divide-gray-100 dark:divide-white/[0.05]"
            >
              {data.map((order) => (
                <TableRow key={order?.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order?.cultivator.cultivator_last_name}{" "}
                    {order?.cultivator.cultivator_first_name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order?.date_achat}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order?.quantity_blanc}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order?.quantity_jaune}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order?.receipt_number}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ModificationAchat;
