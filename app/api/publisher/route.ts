import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const users = await prisma.publisher.findMany({
    orderBy: { idx: "asc" },
  });
  return NextResponse.json(users);
}
