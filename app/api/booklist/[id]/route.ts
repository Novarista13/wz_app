import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const users = await prisma.tbl_book.findUnique({
    where: { idx: parseInt(params.id) },
  });

  return NextResponse.json(users);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const book = await prisma.tbl_book.findUnique({
    where: { idx: parseInt(params.id) },
  });

  if (!book)
    return NextResponse.json({ error: "Invalid book" }, { status: 404 });

  await prisma.tbl_book.delete({
    where: { idx: book.idx },
  });

  return NextResponse.json({});
}

const createBookSchema = z.object({
  book_uniq_idx: z.string().min(1).max(255),
  bookname: z.string().min(1).max(255),
  co_id: z.string(),
  publisher_id: z.string(),
  cover_photo: z.nullable(z.string()),
  price: z.string(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = createBookSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const book = await prisma.tbl_book.findUnique({
    where: { idx: parseInt(params.id) },
  });

  if (!book)
    return NextResponse.json({ error: "Invalid book" }, { status: 404 });

  const updatedBook = await prisma.tbl_book.update({
    where: { idx: book.idx },
    data: {
      book_uniq_idx: body.book_uniq_idx,
      bookname: body.bookname,
      co_id: parseInt(body.co_id),
      publisher_id: parseInt(body.publisher_id),
      cover_photo: body.cover_photo,
      price: parseInt(body.price),
    },
  });

  return NextResponse.json(updatedBook, { status: 200 });
}
