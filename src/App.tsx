import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { EditDialogForm } from "./components/EditDialogForm";
import { Table } from "./components/Table";

interface IFormDataType {
  model: string;
  license_plate: string;
}

export default function App() {
  const formData: IFormDataType = { model: "", license_plate: "" };
  const [responseBody, setResponseBody] = useState<IFormDataType>(formData);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResponseBody({ ...responseBody, [name]: value });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post("http://localhost:3000/api/car", responseBody, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "Token",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };

  const handleGetRowById = (id: number) => {
    axios
      .get(`http://localhost:3000/api/car/${id}`)
      .then((res) => console.log(res.data.result));
  };

  return (
    <div className="bg-zinc-400">
      <div className="mx-auto min-h-screen w-11/12 max-w-6xl">
        <h1 className="text-2xl text-zinc-900">Lista de Carros</h1>
        <form name="insert" onSubmit={handleFormSubmit}>
          <legend>New Car</legend>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <label>Model: </label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="model"
                id="model"
                required
              />
            </div>
            <div className="flex gap-1">
              <label>License Plate: </label>
              <input
                onChange={(e) => handleInputChange(e)}
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
        <Table />
      </div>
    </div>
  );
}
