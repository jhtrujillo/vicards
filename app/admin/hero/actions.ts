"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { writeFile } from "fs/promises"
import path from "path"

const prisma = new PrismaClient()

export async function updateHeroSlide(formData: FormData) {
  const id = Number(formData.get("id"))
  const title1 = formData.get("title1") as string
  const title2 = formData.get("title2") as string
  const titleHighlight = formData.get("titleHighlight") as string
  const subtitle = formData.get("subtitle") as string
  const text1 = formData.get("text1") as string
  const text2 = formData.get("text2") as string

  // Objeto con los datos de texto a actualizar
  const updateData: any = {
    title1,
    title2,
    titleHighlight,
    subtitle,
    text1,
    text2,
  }

  // Manejo de la subida de imagen
  const imageFile = formData.get("imageFile") as File
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Crear un nombre de archivo único
    const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`
    const filepath = path.join(process.cwd(), "public/images", filename)

    // Guardar el archivo en public/images/
    await writeFile(filepath, buffer)

    // Agregar la nueva ruta de la imagen a los datos a actualizar
    updateData.image = `/images/${filename}`
  }

  // Actualizar la base de datos
  await prisma.heroSlide.update({
    where: { id },
    data: updateData
  })

  // Revalidar para que los cambios se vean en la landing de inmediato
  revalidatePath("/")
  revalidatePath("/admin/hero")
}
