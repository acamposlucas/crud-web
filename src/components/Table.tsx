import axios from "axios";
import { useState, useEffect } from "react";
import { Car } from "../interfaces/ICar";
import { EditDialogForm } from "./EditDialogForm";

export function Table() {
  const [cars, setCars] = useState<Car[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cars")
      .then((res) => setCars(res.data.result));
  }, [cars]);

  const handleDeleteRow = (id: number) => {
    const confirmation = window.confirm(`Confirm deletion of ${id}?`);
    if (confirmation) {
      axios.delete(`http://localhost:3000/api/car/${id}`);
    }
  };

  return (
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
        {cars.map((car) => (
          <tr key={car.id}>
            <td>{car.id}</td>
            <td>{car.license_plate}</td>
            <td>{car.model}</td>
            <td className="flex gap-2">
              <button
                type="button"
                onClick={() => handleDeleteRow(car.id)}
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
                  car={car}
                />
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
