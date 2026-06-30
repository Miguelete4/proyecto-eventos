import bcrypt from "bcryptjs"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { email, nombre, apellido, password, rol } = body
    
    const hash = await bcrypt.hash(password, 12)

    const usuario = await prisma.usuario.create({
        data: {
            email,
            nombre,
            apellido,
            password: hash,
            rol
        }
    })

    return {
        ok: true,
        usuario
    }
})