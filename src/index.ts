import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

// we have two tables User and Post. using the client we can access both tables and perform CRUD operations on them
async function insertUser(email: string, name: string): Promise<void> {
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
        })

        console.log(`${response["id"]} ${response["email"]} ${response["name"]}`);
        console.log(response["posts"]);
    } catch (error) {
        console.log(error);
    }
}

async function getAllUsers(): Promise<void> {
    try {
        const response = await prisma.user.findMany({
            take: 10,
            select: {
                id: true,
                email: true,
                name: true
            }
        })

        if(!response.length) {
            console.log("no user exist in the database");
        }

        console.log(response);
    } catch (error) {
        
    }
}

// getAllUsers();

//insertUser("vchawla7000@gmail.com", "VC"); // creating user and directly storing its corresponding posts, make it easy to interact with the database


async function createCitizen(firstname: string, lastname: string, username: string, email: string, pincode: number, city: string, state: string, area: number): Promise<void> {
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
        })

        console.log(response);
    } catch (error) {
        console.log("error is creating citizen + owner with property");
    }
}

// createCitizen("Random", "Chawla", "RC", "vchawla7000@gmail.com", 143001, "ASR", "PB", 200);



async function createCitizenOnly(firstname: string, lastname: string, email: string, username: string): Promise<void> {
    
    try {
        const response = await prisma["citizen"].create({
            data: {
                firstname, lastname, email, username
            }, select: {
                owner: true
            }
        })

        console.log("citizen is created");
        console.log(response);
    } catch (error) {
        console.log("error occured when creating the citizen");
    }
}

// createCitizenOnly("Java","Deverloper", "javal@gmail.com", "Java123");

interface Property {
    pincode: number;
    area: number;
    city: string;
    state: string;
}

async function createOwner(citizenId: number, property: Property): Promise<void> {
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
        })

        console.log("successfully created owner")
        console.log(response);
    } catch (error) {
        console.log("error occured when creating the owner");
    }
}

// createOwner(2, {
//     pincode: 143001,
//     city: "ASR",
//     state:" PB",
//     area: 200
// });


interface CitizenWhere {
    firstname?: string;
    lastname?: string;
}


interface CitizenSelect {
    id?: boolean;
    firstname?: boolean;
    lastname?: boolean;
    username?: boolean;
    email?: boolean
}
// read

async function getCitizens(take?: number, where?: CitizenWhere, select?: CitizenSelect) {

    const query: {
        take?: number,
        where?: CitizenWhere,
        select?: CitizenSelect
    } = {};

    if(take) {
        query["take"] = take;
    }

    if(where) {
        query["where"] = where;
    }

    if(select) {
        query["select"] = select
    }

    try {
        // brings the first 10 rows / json from the table / collection
        const response = await prisma.citizen.findMany({
            ...query, 
        })

        console.log(response);
    } catch (error) {
        
    }
}

getCitizens(10,  {
    firstname: "JS"
}, {
    id: true
});


// update



