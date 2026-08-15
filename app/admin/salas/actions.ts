"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { writeFile } from "fs/promises"
import path from "path"

const prisma = new PrismaClient()

async function saveImage(formData: FormData) {
  const imageFile = formData.get("image") as File | null
  if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uniqueName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`
    const filePath = path.join(process.cwd(), "public", "images", uniqueName)

    await writeFile(filePath, buffer)
    return `/images/${uniqueName}`
  }
  return null
}

export async function updateSala(formData: FormData) {
  const id = Number(formData.get("id"))
  const city = formData.get("city") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string

  const updateData: any = {
    city,
    title,
    description
  }

  const imageUrl = await saveImage(formData)
  if (imageUrl) {
    updateData.image = imageUrl
  }

  await prisma.experience.update({
    where: { id },
    data: updateData
  })

  revalidatePath("/admin/salas")
  revalidatePath("/salas-de-experiencia")
  revalidatePath("/")
}

export async function createSala(formData: FormData) {
  const city = formData.get("city") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string

  const imageUrl = await saveImage(formData) || "/images/placeholder.jpg"

  await prisma.experience.create({
    data: {
      city,
      title,
      description,
      image: imageUrl
    }
  })

  revalidatePath("/admin/salas")
  revalidatePath("/salas-de-experiencia")
  revalidatePath("/")
}

export async function deleteSala(id: number) {
  await prisma.experience.delete({
    where: { id }
  })
  revalidatePath("/admin/salas")
  revalidatePath("/salas-de-experiencia")
  revalidatePath("/")
}
