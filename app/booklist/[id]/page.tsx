"use client";
import React, { useEffect, useState } from "react";
import Form from "./form";
import axios from "axios";

const Page = ({ params }: { params: { id: string } }) => {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const fetchInfo = async () => {
      const res = await axios.get(`/api/booklist/${params.id}`);
      const data = res.data;
      setBook(data);
    };
    fetchInfo();
  }, [params.id]);

  return (
    <div>{book && <Form data={book} />}</div>
  );
};

export default Page;
