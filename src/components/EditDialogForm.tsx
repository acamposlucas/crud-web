import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface IEditDialogForm {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * TODO:
 * - ADD close button
 */

export function EditDialogForm({ isOpen, setIsOpen }: IEditDialogForm) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => setIsOpen(false)}
        className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-200"
      >
        <Dialog.Panel>
          <Dialog.Title className="my-4 text-center text-2xl">
            Edit vehicle
          </Dialog.Title>
          <form className="flex flex-col gap-2 p-4">
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
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}
