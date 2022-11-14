import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { EditDialogForm } from "./components/EditDialogForm";

export interface Car {
  id: number;
  model: string;
  license_plate: string;
}

interface IFormDataType {
  model: string;
  license_plate: string;
}

export default function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const formData: IFormDataType = { model: "", license_plate: "" };
  const [responseBody, setResponseBody] = useState<IFormDataType>(formData);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cars")
      .then((res) => setCars(res.data.result));
  }, [cars]);

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

  const handleDeleteRow = (id: number) => {
    const confirmation = window.confirm(`Confirm deletion of ${id}?`);
    if (confirmation) {
      axios.delete(`http://localhost:3000/api/car/${id}`);
    }
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
        <table className="w-full table-auto">
          <thead>
            <tr>
              <td>id</td>
              <td>license_plate</td>
              <td>model</td>
              <td>actions</td>
            </tr>
          </thead>
          <tbody>
            {cars.map(({ id, license_plate, model }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{license_plate}</td>
                <td>{model}</td>
                <td className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteRow(id)}
                    className="w-16 rounded-md bg-red-500 py-1 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="w-16 rounded-md bg-blue-500 py-1 text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  {isOpen ? (
                    <EditDialogForm
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      id={id}
                    />
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
