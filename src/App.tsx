import { Table } from "./components/Table";
import { Form } from "./components/Form";

export default function App() {
  return (
    <div className="bg-zinc-400">
      <div className="mx-auto min-h-screen w-11/12 max-w-6xl">
        <h1 className="text-2xl text-zinc-900">Lista de Carros</h1>
        <Form />
        <Table />
      </div>
    </div>
  );
}
