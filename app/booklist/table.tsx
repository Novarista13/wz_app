"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import SingleRow from "./singleRow";

export default function TableComponent() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchInfo = async () => {
      const res = await axios.get("/api/booklist");
      const data = res.data;
      console.log(data);
      setBooks(data);
    };
    fetchInfo();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Idx
            </th>
            <th scope="col" className="px-6 py-3">
              Book Name
            </th>
            <th scope="col" className="px-6 py-3">
              Content Owner
            </th>
            <th scope="col" className="px-6 py-3">
              Publisher
            </th>
            <th scope="col" className="px-6 py-3">
              Created Date
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {books?.map((b: any) => (
            <SingleRow key={b.idx} data={b} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
