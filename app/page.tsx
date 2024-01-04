import Image from "next/image";
import books from "../public/books.svg";

export default function Home() {
  return (
    <div>
      <p className="text-6xl text-center font-extrabold mt-14 text-gray-800">
        Welcome to my Website
      </p>
      <Image className="mx-auto mt-9" src={books} height={250} width={250} alt="book logo" />
    </div>
  );
}
