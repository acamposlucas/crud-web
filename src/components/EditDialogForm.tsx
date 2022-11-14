import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import { Car } from "../interfaces/ICar";
import { X } from "./Icons/X";

interface IEditDialogForm {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

interface IFormDataType {
  license_plate: string;
  model: string;
}

export function EditDialogForm({ isOpen, setIsOpen, id }: IEditDialogForm) {
  const [car, setCar] = useState<Car>({ id, license_plate: "", model: "" });
  const [responseBody, setResponseBody] = useState<IFormDataType>({
    license_plate: car.license_plate,
    model: car.model,
  });

  const handleGetRowById = (id: number) => {
    axios
      .get(`http://localhost:3000/api/car/${id}`)
      .then((res) => setCar(res.data.result[0]));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(responseBody);
    setResponseBody({ ...responseBody, [name]: value });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.put(`http://localhost:3000/api/car/${id}`, responseBody, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "Token",
        "Access-Control-Allow-Origin": "*",
      },
    });

    setIsOpen(false);
  };

  handleGetRowById(id);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
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
            <form
              onSubmit={handleFormSubmit}
              className="flex w-full flex-col gap-2"
            >
              <div className="flex flex-col gap-0.5">
                <label htmlFor="license_plate">License plate</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  name="license_plate"
                  id="license_plate"
                  type="text"
                  required
                  defaultValue={car?.license_plate}
                ></input>
              </div>
              <div className="flex flex-col gap-0.5">
                <label htmlFor="model">Model</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  name="model"
                  id="model"
                  type="text"
                  required
                  defaultValue={car?.model}
                ></input>
              </div>
              <button
                type="submit"
                className="rounded-md bg-green-400 text-lg tracking-wider text-zinc-800 hover:bg-green-500"
              >
                Confirm
              </button>
            </form>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}
