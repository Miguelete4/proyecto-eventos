export default defineEventHandler(async () => {
    return await prisma.evento.findMany({
        orderBy: [{ fecha: 'asc' }, { nombre: 'asc' }],
        include: {inscrito: true} //la verdad nose si esto hay que hacerlo xd, pero por si acaso nomas
    })
})