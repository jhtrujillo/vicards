import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { city, title, description, image } = body;

    const sala = await prisma.experience.update({
      where: { id },
      data: {
        city,
        title,
        description,
        image
      }
    });

    return NextResponse.json(sala);
  } catch (error) {
    console.error("Error updating sala:", error);
    return NextResponse.json({ error: "Error al actualizar la sala" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    await prisma.experience.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting sala:", error);
    return NextResponse.json({ error: "Error al eliminar la sala" }, { status: 500 });
  }
}
