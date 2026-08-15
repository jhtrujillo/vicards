import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { city, title, description, image } = body;

    if (!city || !title || !description || !image) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const sala = await prisma.experience.create({
      data: {
        city,
        title,
        description,
        image
      }
    });

    return NextResponse.json(sala);
  } catch (error) {
    console.error("Error creating sala:", error);
    return NextResponse.json({ error: "Error al crear la sala" }, { status: 500 });
  }
}
