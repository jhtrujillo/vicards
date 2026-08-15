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

export async function updateCategory(formData: FormData) {
  const id = Number(formData.get("id"))
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string

  const updateData: any = {
    name,
    slug,
  }

  const imageUrl = await saveImage(formData)
  if (imageUrl) {
    updateData.image = imageUrl
  }

  await prisma.category.update({
    where: { id },
    data: updateData
  })

  revalidatePath("/admin/categorias")
  revalidatePath("/admin/productos")
  revalidatePath("/tienda")
  revalidatePath("/")
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string

  const imageUrl = await saveImage(formData) || ""

  await prisma.category.create({
    data: {
      name,
      slug,
      image: imageUrl
    }
  })

  revalidatePath("/admin/categorias")
  revalidatePath("/admin/productos")
  revalidatePath("/tienda")
  revalidatePath("/")
}
