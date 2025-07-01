"use client";
import React from "react";
import Button from "../../ui_elements/button/Button";
import { PlusIcon } from "../../icons";
import Modal from "../../ui_elements/modal";
import { useModal } from "../../ui_elements/hooks/useModal";
import AddOrderModal from "./add_order_modal";
import Orders from "./orders";

function AddOrders() {
  const {
    isOpen: isOpenModalAddOrder,
    closeModal: closeModalAddOrder,
    openModal: openModalAddOrder,
  } = useModal();
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/60 lg:px-5 px-0 pt-5 dark:border-gray-800 dark:bg-white/[0.03]  sm:px-6 sm:pt-6 ">
      <div className="flex flex-col items-cent/er justify-between w-full gap-2 px-3 py-3 border-b  border-gray-200 dark:border-gray-800 sm:gap-4  lg:border-b-0 lg:px-0 lg:py-4">
        <div className="flex flex-row justify-between items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Liste des commandes effectées
          </h3>
          <Button
            onClick={() => {
              openModalAddOrder();
            }}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <PlusIcon className="size-4 mr-2" />
            <span>Ajouter une commande</span>
          </Button>
        </div>
        <div className="flex flex-col gap-y-3">
          <Orders
            from={{
              issuedOn: "11 Mars, 2027",
            }}
            products={[{ name: "Grain", quantity: 500 }]}
          />
          <Orders
            from={{
              issuedOn: "11 Mars, 2027",
            }}
            products={[{ name: "Grain", quantity: 500 }]}
          />
        </div>
      </div>
      <Modal
        isOpen={isOpenModalAddOrder}
        onClose={closeModalAddOrder}
        className="max-w-[700px] m-4"
      >
        <AddOrderModal />
      </Modal>
    </div>
  );
}

export default AddOrders;
