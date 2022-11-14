import axios from "axios";
import { FormEvent, MutableRefObject, useEffect, useRef } from "react";

export function Form() {
  const licensePlate = useRef() as MutableRefObject<HTMLInputElement>;
  const carModel = useRef() as MutableRefObject<HTMLInputElement>;
  const form = useRef() as MutableRefObject<HTMLFormElement>;

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      license_plate: licensePlate.current.value,
      model: carModel.current.value,
    };

    axios.post("http://localhost:3000/api/car", data, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "Token",
        "Access-Control-Allow-Origin": "*",
      },
    });

    form.current.reset();
  };

  return (
    <form name="insert" ref={form} onSubmit={handleFormSubmit}>
      <legend>New Car</legend>
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          <label>Model: </label>
          <input ref={carModel} type="text" name="model" id="model" required />
        </div>
        <div className="flex gap-1">
          <label>License Plate: </label>
          <input
            ref={licensePlate}
            type="text"
            name="license_plate"
            id="license_plate"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="rounded-md bg-slate-100 py-1 px-3 uppercase"
      >
        Add
      </button>
    </form>
  );
}
