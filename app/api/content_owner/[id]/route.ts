import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const users = await prisma.content_owner.findUnique({
    where: { idx: parseInt(params.id) },
  });

  return NextResponse.json(users);
}
