export default eventHandler(async() => { 
    return await prisma.inscrito.findMany({
        orderBy: { email: 'asc' }
    })
})