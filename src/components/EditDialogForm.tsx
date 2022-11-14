import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { FormEvent, Fragment, MutableRefObject, useRef, useState } from "react";
import { Car } from "../interfaces/ICar";
import { X } from "./Icons/X";

interface IEditDialogForm {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  car: Car;
}

// TODO: Fix multiple re renders when dialog opens

export function EditDialogForm({ isOpen, setIsOpen, car }: IEditDialogForm) {
  const licensePlate = useRef() as MutableRefObject<HTMLInputElement>;
  const carModel = useRef() as MutableRefObject<HTMLInputElement>;
  const form = useRef() as MutableRefObject<HTMLFormElement>;

  console.log(car);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      license_plate: licensePlate.current.value,
      model: carModel.current.value,
    };

    axios.put(`http://localhost:3000/api/car/${car.id}`, data, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "Token",
        "Access-Control-Allow-Origin": "*",
      },
    });

    form.current.reset();
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-200"
    >
      <Dialog.Panel>
        <div className="relative p-8">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-2 top-2"
          >
            <X width={32} height={32} />
          </button>
          <form name="insert" ref={form} onSubmit={handleFormSubmit}>
            <legend>New Car</legend>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <label>Model: </label>
                <input
                  ref={carModel}
                  type="text"
                  name="model"
                  id="model"
                  defaultValue={car.model}
                  required
                />
              </div>
              <div className="flex gap-1">
                <label>License Plate: </label>
                <input
                  ref={licensePlate}
                  type="text"
                  name="license_plate"
                  id="license_plate"
                  defaultValue={car.license_plate}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="rounded-md bg-slate-100 py-1 px-3 uppercase"
            >
              Update
            </button>
          </form>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
