import { MdCall } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import TimeAgo from "react-timeago";

const ProjectDetail = ({ descriptionModal, setDescriptionModal }) => {
  console.log(descriptionModal);
  return (
    <div
      className="h-screen w-screen absolute top-0 left-0 overflow-hidden z-50 
  backdrop-blur-sm flex flex-col items-center justify-center"
    >
      <div className="p-5 rounded-lg relative bg-white shadow-md md:w-2/5">
        <div className="flex justify-end">
          <AiOutlineClose
            onClick={() => setDescriptionModal(false)}
            className="mb-5 border-2 p-1 h-8 w-8 rounded-full border-black 
          hover:bg-gray-300 cursor-pointer"
          />
        </div>

        <div className="bg-blue-100 p-5 flex items-center justify-between rounded-lg">
          <h2 className="font-bold text-lg">{descriptionModal.data.title}</h2>
          <span className="bg-primary text-sm text-white px-5 py-2 rounded-md">
            {descriptionModal.data.status}
          </span>
        </div>
        <div className="flex items-center text-gray-500 text-xs gap-x-10 mt-2">
          <div>
            <span className="mr-1 font-medium">Created</span>
            <TimeAgo date={parseInt(descriptionModal.data.createdAt)} />
          </div>
          <div>
            <span className="mr-1 font-medium">Updated</span>
            <TimeAgo date={parseInt(descriptionModal.data.updatedAt)} />
          </div>
        </div>
        <div className="my-5">
          <h4 className="font-medium">Description</h4>
          <p className="text-sm text-gray-700">
            {descriptionModal.data.description}
          </p>
        </div>
        <div className="my-5">
          <h4 className="font-medium mb-2">Assigned Client</h4>
          <div className="flex items-center gap-x-2">
            <img
              className="h-10 w-10 rounded-full p-[2px] border-2 border-primary"
              src="user.png"
              alt="user"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {descriptionModal.data.client.name}
              </span>
              <span className="text-xs text-gray-600">
                {descriptionModal.data.client.email}
              </span>
            </div>
            <a
              href={`tel:${descriptionModal.data.client.phone}`}
              className="flex gap-x-2 ml-20"
            >
              <MdCall
                className="h-10 w-10 p-2 bg-green-500 rounded-lg text-white
              hover:bg-green-600 transitionClass"
              />
              <div className="flex flex-col text-sm">
                <span className="font-medium">Call Client</span>
                <span className="text-xs">
                  {descriptionModal.data.client.phone}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
