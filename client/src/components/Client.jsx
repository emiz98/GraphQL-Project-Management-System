import { useMutation } from "@apollo/client";
import { MdDelete } from "react-icons/md";
import { DELETE_CLIENT } from "../graphQL/mutations";
import { GET_CLIENTS } from "../graphQL/queries";

const Client = ({ id, name, email, phone }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: id },
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <img
          className="h-10 w-10 rounded-full p-[2px] border-2 border-primary"
          src="user.png"
          alt="user"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-xs text-gray-600">{email}</span>
        </div>
      </div>
      <MdDelete
        onClick={deleteClient}
        className="h-10 w-10 p-2 rounded-lg text-red-500 bg-gray-200
       hover:bg-red-500 hover:text-white transitionClass"
      />
    </div>
  );
};

export default Client;
