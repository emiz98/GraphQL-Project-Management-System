import { AiOutlineClose } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_CLIENT } from "../graphQL/mutations";

const AddClient = ({ setClientModal }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name: form.name, email: form.email, phone: form.mobile },
  });

  const handleForm = ({ currentTarget: input }) => {
    setForm({ ...form, [input.name]: input.value });
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    addClient();
  };

  return (
    <div
      className="h-screen w-screen absolute top-0 left-0 overflow-hidden z-50 
    backdrop-blur-sm flex flex-col items-center justify-center"
    >
      <div className="p-5 rounded-lg relative bg-gray-50 shadow-md md:w-96">
        <div className="flex items-center justify-between pb-6">
          <h2 className="text-lg font-medium">Add client</h2>
          <AiOutlineClose
            onClick={() => setClientModal(false)}
            className="border-2 p-1 h-8 w-8 rounded-full border-black hover:bg-gray-300 cursor-pointer"
          />
        </div>

        <form onSubmit={handleAddClient} className="flex flex-col gap-y-2">
          <input
            required
            onChange={handleForm}
            className="px-5 py-2 rounded-lg"
            type="text"
            name="name"
            placeholder="Client Name"
          />
          <input
            required
            onChange={handleForm}
            className="px-5 py-2 rounded-lg"
            type="email"
            name="email"
            placeholder="Client Email"
          />
          <input
            required
            onChange={handleForm}
            className="px-5 py-2 rounded-lg"
            type="number"
            name="mobile"
            placeholder="Client Mobile"
          />

          <button className="btnPrimary mt-2">Add Client</button>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
