"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Select } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BookForm {
  book_uniq_idx: string;
  bookname: string;
  co_id: number;
  publisher_id: number;
  price: number;
}

const Form = ({ data }: any) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<BookForm>();
  const [file, setFile] = useState<File>();
  const [contentOwner, setContentOwner] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInfo = async () => {
      const res = await axios.get("/api/content_owner");
      const data1 = res.data;
      setContentOwner(data1);
      const res2 = await axios.get("/api/publisher");
      const data2 = res2.data;
      setPublisher(data2);
    };
    fetchInfo();
  }, []);

  return (
    <div className="max-w-lg p-8 bg-grey-50 border rounded-lg shadow bg-gray-800 border-gray-700 basis-1/2 text-left mx-auto">
      {/* {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )} */}
      <p className="text-3xl mb-5 text-white">Edit Book</p>

      <form
        className="space-y-3 accent-[#76453B]"
        onSubmit={handleSubmit(async (data1) => {
          let cover;

          if (file) cover = file.name;
          if (!file) cover = data.cover_photo;

          const newData = { ...data1, cover_photo: cover };
          console.log(newData);
          try {
            await axios.put(`/api/booklist/${data.idx}`, newData);
            router.push("/booklist");
          } catch (error) {
            setError("Unexpectd error ocuured!");
          }

          if (!file) return;
          try {
            const data = new FormData();
            data.set("file", file);

            const res = await fetch("/api/upload", {
              method: "POST",
              body: data,
            });
            if (!res.ok) throw new Error(await res.text());
          } catch (e: any) {
            console.error(e);
          }
        })}
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <input
              type="text"
              id="topbar-search"
              className="accent-gray-300 border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
              placeholder="Book Unique ID"
              defaultValue={data.book_uniq_idx}
              {...register("book_uniq_idx", { required: true })}
            />
          </div>
          <div className="col-start-3">
            <Select
              id="countries"
              defaultValue={data.co_id}
              required
              {...register("co_id", { required: true })}
            >
              <option disabled value={""}>
                Content Owner
              </option>
              {contentOwner &&
                contentOwner.map((c: any) => (
                  <option
                    key={c.idx}
                    selected={c.idx === data.co_id ? true : false}
                    value={c.idx}
                  >
                    {c.name}
                  </option>
                ))}
            </Select>
          </div>
          <div className="col-span-2 row-start-2">
            <input
              type="text"
              id="topbar-search"
              className="accent-gray-300 border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
              placeholder="Book name"
              defaultValue={data.bookname}
              {...register("bookname", { required: true })}
            />
          </div>
          <div className="col-start-3 row-start-2">
            <Select
              id="countries"
              defaultValue={data.publisher_id}
              required
              {...register("publisher_id", { required: true })}
            >
              <option disabled value={""}>
                Publisher
              </option>
              {publisher &&
                publisher.map((p: any) => (
                  <option
                    key={p.idx}
                    selected={p.idx === data.publisher_id ? true : false}
                    value={p.idx}
                  >
                    {p.name}
                  </option>
                ))}
            </Select>
          </div>
          <div className="col-span-2">
            <input
              type="text"
              id="topbar-search"
              className="accent-gray-300 border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
              placeholder="Book Price"
              defaultValue={data.price}
              {...register("price", { required: true })}
            />
          </div>
        </div>
        <div className="">
          <label
            className="block mb-2 text-sm font-medium text-white"
            htmlFor="image"
          >
            Cover Photo
          </label>
          <input
            className="block w-full mb-5 text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="image"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        </div>
        <button
          type="submit"
          className="bg-gray-50 text-gray-600 border border-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
