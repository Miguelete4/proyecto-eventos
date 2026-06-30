import bcrypt from "bcryptjs"

export default defineEventHandler(async (event) => {
    const { email, nombre, apellido, password, rol } = await readBody(event)
    
    const hash = await bcrypt.hash(password, 12);

    const usuario = await prisma.usuario.create({
        data: {
            email,
            nombre,
            apellido,
            password: hash,
            rol,
        },
    });

    return {
        ok: true,
        usuario
    };
});