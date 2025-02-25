import {db, NewUsers, Users, users } from '../../src/db/index';

const createUser = async (user: NewUsers) => {
    const newUser = await db.insert(users).values(user).returning()
    return newUser
}

export const POST = async (request:Request) => {
    const newUser = await request.json()
    const user = await createUser(newUser)
    return Response.json(user)
}

export const GET = async (request:Request) => {
    const allUsers = await db.select().from(users)

    return Response.json(allUsers)

}

