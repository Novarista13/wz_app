import React from "react";
import TableComponent from "./table";

const page = () => {
  return (
    <div>
      <p className="text-3xl mb-5 ms-5 font-semibold text-gray-800">
        Book List
      </p>
      <TableComponent />
    </div>
  );
};

export default page;
