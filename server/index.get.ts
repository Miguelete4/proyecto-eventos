export default eventHandler(async() => { 
    return await prisma.usuario.findMany({orderBy: {email: 'asc'}})
})