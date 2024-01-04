import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createBookSchema = z.object({
  book_uniq_idx: z.string().min(1).max(255),
  bookname: z.string().min(1).max(255),
  co_id: z.string(),
  publisher_id: z.string(),
  cover_photo: z.nullable(z.string()),
  price: z.string(),
});

export async function GET(request: NextRequest) {
  const users = await prisma.tbl_book.findMany({
    orderBy: { idx: "asc" },
  });
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createBookSchema.safeParse(body);
  console.log(validation);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newBook = await prisma.tbl_book.create({
    data: {
      book_uniq_idx: body.book_uniq_idx,
      bookname: body.bookname,
      co_id: parseInt(body.co_id),
      publisher_id: parseInt(body.publisher_id),
      cover_photo: body.cover_photo,
      price: parseInt(body.price),
    },
  });

  return NextResponse.json(newBook, { status: 201 });
}
