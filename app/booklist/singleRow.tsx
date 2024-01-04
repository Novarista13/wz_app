import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SingleRow = ({ data }: any) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [contentOwner, setContentOwner] = useState({ name: "" });
  const [publisher, setPublisher] = useState({ name: "" });

  useEffect(() => {
    const fetchInfo = async () => {
      const res = await axios.get(`/api/content_owner/${data.co_id}`);
      const data1 = res.data;
      setContentOwner(data1);
      const res2 = await axios.get(`/api/publisher/${data.publisher_id}`);
      const data2 = res2.data;
      setPublisher(data2);
    };
    fetchInfo();
  }, [data.co_id, data.publisher_id]);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {data.book_uniq_idx}
      </th>
      <td className="px-6 py-4">{data.bookname}</td>
      <td className="px-6 py-4">{contentOwner?.name}</td>
      <td className="px-6 py-4">{publisher?.name}</td>
      <td className="px-6 py-4">{data.created_timetick.slice(0, 10)}</td>
      <td className="px-6 py-4 text-right">
        <Link
          href={`/booklist/${data.idx}`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </Link>
      </td>
      <td className="px-6 py-4 text-right">
        <Button color="failure" onClick={() => setOpenModal(true)}>
          Delete
        </Button>
        <Modal
          dismissible
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this book?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={() => {
                    const res = axios.delete(`/api/booklist/${data.idx}`);
                    console.log(res);
                    setOpenModal(false);
                    setTimeout(() => {
                      window.location.reload();
                    }, 3000);
                  }}
                >
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </td>
    </tr>
  );
};

export default SingleRow;
