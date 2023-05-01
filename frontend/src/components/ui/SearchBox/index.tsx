import { ChangeEvent } from "react";

export const SearchBox = ({
  onChange,
  searchText,
  onClick,
}: {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
  onClick: () => void;
}) => {
  // TODO: any
  const handleClick = (event: any) => {
    event.preventDefault();
    onClick();
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleClick}>
          <div className="flex border border-purple-200 rounded">
            <input
              type="text"
              className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
              value={searchText}
              onChange={onChange}
            />
            <button
              className="px-4 text-white bg-gray-600 border-l rounded "
              onClick={onClick}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
