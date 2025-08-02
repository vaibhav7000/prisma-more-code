"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function insertUser(email, name) {
    try {
        const response = await prisma.user.create({
            data: {
                email,
                name,
                posts: {
                    create: [{
                            title: "Ups and downs",
                            content: "Zindagi ek safar ha suhana"
                        }]
                }
            }, select: {
                id: true, email: true, name: true, posts: true
            }
        });
        console.log(`${response["id"]} ${response["email"]} ${response["name"]}`);
        console.log(response["posts"]);
    }
    catch (error) {
        console.log(error);
    }
}
async function getAllUsers() {
    try {
        const response = await prisma.user.findMany({
            take: 10,
            select: {
                id: true,
                email: true,
                name: true
            }
        });
        if (!response.length) {
            console.log("no user exist in the database");
        }
        console.log(response);
    }
    catch (error) {
    }
}
async function createCitizen(firstname, lastname, username, email, pincode, city, state, area) {
    try {
        const response = await prisma.citizen.create({
            data: {
                firstname, lastname, email, username,
                owner: {
                    create: {
                        property: {
                            create: {
                                pincode,
                                state,
                                city,
                                area
                            }
                        }
                    }
                }
            }, select: {
                firstname: true,
                lastname: true,
                username: true,
                email: true,
                owner: true,
            }
        });
        console.log(response);
    }
    catch (error) {
        console.log("error is creating citizen + owner with property");
    }
}
async function createCitizenOnly(firstname, lastname, email, username) {
    try {
        const response = await prisma["citizen"].create({
            data: {
                firstname, lastname, email, username
            }, select: {
                owner: true
            }
        });
        console.log("citizen is created");
        console.log(response);
    }
    catch (error) {
        console.log("error occured when creating the citizen");
    }
}
async function createOwner(citizenId, property) {
    try {
        const response = await prisma.owner["create"]({
            data: {
                citizenId,
                property: {
                    create: {
                        ...property
                    }
                }
            }, select: {
                citizenId: true,
                property: true
            }
        });
        console.log("successfully created owner");
        console.log(response);
    }
    catch (error) {
        console.log("error occured when creating the owner");
    }
}
async function getCitizens(take, where, select) {
    const query = {};
    if (take) {
        query["take"] = take;
    }
    if (where) {
        query["where"] = where;
    }
    if (select) {
        query["select"] = select;
    }
    try {
        const response = await prisma.citizen.findMany({
            ...query,
        });
        console.log(response);
    }
    catch (error) {
    }
}
getCitizens(10, {
    firstname: "JS"
}, {
    id: true
});
//# sourceMappingURL=index.js.map