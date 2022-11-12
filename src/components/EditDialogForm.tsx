import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "./Icons/X";

interface IEditDialogForm {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditDialogForm({ isOpen, setIsOpen }: IEditDialogForm) {
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
            <form className="flex w-full flex-col gap-2">
              <div className="flex flex-col gap-0.5">
                <label htmlFor="license_plate">License plate</label>
                <input id="license_plate" type="text" required></input>
              </div>
              <div className="flex flex-col gap-0.5">
                <label htmlFor="model">Model</label>
                <input id="model" type="text" required></input>
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
