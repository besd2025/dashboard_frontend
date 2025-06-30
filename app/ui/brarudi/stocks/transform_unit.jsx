import Modal from "../../ui_elements/modal";
import Button from "../../ui_elements/button/Button";
import React, { useState } from "react";
import { useModal } from "../../ui_elements/hooks/useModal";
import Input from "../../ui_elements/form/input/InputField";
import Label from "../../ui_elements/form/Label";
import Select from "../../ui_elements/form/Select";
import { ChevronDownIcon } from "../../icons";

function TransformUnit() {
  const { isOpen, openModal, closeModal } = useModal();
  const [units, setUnits] = useState([{ name: "", capacity: "" }]);

  const handleAddUnit = () => {
    setUnits([...units, { name: "", capacity: "" }]);
  };

  const handleRemoveUnit = (indexToRemove) => {
    if (indexToRemove === 0) return;
    const updatedUnits = units.filter((_, index) => index !== indexToRemove);
    setUnits(updatedUnits);
  };

  const handleChange = (index, field, value) => {
    const updatedUnits = [...units];
    updatedUnits[index][field] = value;
    setUnits(updatedUnits);
  };

  const optionProvince = [
    { value: "Bujumbura", label: "Bujumbura" },
    { value: "Kayanza", label: "Kayanza" },
    { value: "Ngozi", label: "Ngozi" },
  ];
  const handleSelectChange = (value) => {
    // console.log("Selected value:", value);
  };

  return (
    <div className="p-5 relative rounded-2xl border border-gray-100 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex flex-col gap-6 mb-5 sm:flex-row sm:items-center sm:justify-between ">
        <div className="flex flex-row space-x-5">
          <Button
            className="bg-green-500 hover:bg-green-700"
            onClick={openModal}
          >
            Ajouter UT
          </Button>
        </div>
      </div>
      <div className="overflow-hidden ">
        <div className="max-w-full overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-2 text-sm font-bold text-left text-gray-700 dark:text-gray-400">
                  Unité Transformation
                </th>
                <th className="px-5 py-2 text-sm font-bold text-left text-gray-700 dark:text-gray-400">
                  Quantité
                </th>
              </tr>
            </thead>
            <tbody className="divide-y  divide-gray-100 dark:divide-white/[0.05]">
              <tr>
                <td className="px-5 py-2 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">
                  UNIT1
                </td>
                <td className="px-5 py-2 text-left text-sm text-gray-500 dark:text-gray-400">
                  500 T
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] m-4 p-6"
      >
        <div className="col-span-1 ">
          <Label className="text-lg font-semibold mb-4">
            Ajouter un unités de transformation
          </Label>

          {units.map((unit, index) => (
            <div
              key={index}
              className="mb-4 flex flex-col md:flex-row gap-2 items-center"
            >
              <div className="relative">
                <Select
                  options={optionProvince}
                  placeholder="Selectionner l'UT"
                  value={unit.name}
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900 cursor-pointer"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>

              <Input
                type="number"
                placeholder="Quantité"
                value={unit.capacity}
                onChange={(e) =>
                  handleChange(index, "capacity", e.target.value)
                }
              />
              {index !== 0 && (
                <button
                  onClick={() => handleRemoveUnit(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800 rounded-2xl"
                  title="Supprimer cette unité de transformation"
                >
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
                      d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <div className="flex flex-col space-y-4">
            <Button
              size="sm"
              className="bg-white border-2 border-black w-max"
              onClick={handleAddUnit}
            >
              <span className="text-black">+ Autre</span>
            </Button>
            <Button size="sm" className="bg-yellow-500" onClick={handleAddUnit}>
              Ajouter
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TransformUnit;
