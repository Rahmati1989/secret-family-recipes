const request = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig.js");

describe("server", function () {

    describe("GET /", function () {
      it("should return 200 OK", function () {
        // make a GET request to / endpoint on the server
        return request(server) // return the async call to let jest know it should wait
          .get("/")
          .then(res => {
            // assert that the HTTP status code is 200
            expect(res.status).toBe(200);
          });
      });
    });

    describe("POST /api/register", function () {
        beforeEach(async () => {
            await db("users").truncate(); // empty the table and reset the id back to 1
        });

        it("return 201 on success", async () => {
            const response = await request(server)
                .post("/api/register")
                .send({ username: "registerTest", password: "registerPass" })
                expect(response.status).toBe(201);
        });

        it('should return a property of username', function () {
            return request(server)
                .post("/api/register")
                .send({ username: "registerTest", password: "registerPass" })
                .then(res => {
                expect(res.body.username).toBe("registerTest");
                });
        });
    })

    describe("POST /api/login", function () {

        it("return 200 on success", async () => {
            const response = await request(server)
                .post("/api/login")
                .send({ username: "registerTest", password: "registerPass" })
                expect(response.status).toBe(200);
        });

        it('should return a welcome message', function () {
            return request(server)
                .post("/api/login")
                .send({ username: "registerTest", password: "registerPass" })
                .then(res => {
                expect(res.body.message).toBe("Welcome!");
                });
        });
    });

    describe("GET /api/recipes", function () {

        it("should ask to log in if no token", function () {
            return request(server)
                .get('/api/recipes')
                .then(res => {
                    expect(res.body.message).toBe( "Please log in.")
                })
        })

        it("should display recipes if token", async function () {

            const response = await request(server)
                .get("/api/recipes")
                .set("Content-type", "application/json")
                .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoicmVnaXN0ZXJUZXN0IiwiaWF0IjoxNTg4MDc5OTg5LCJleHAiOjE1ODgxNjYzODl9.A1AR_bscSDYjL8wVhE_EfdnIqJqJ89sLvkzN5RM9jIA")
                expect(response.status).toBe(200);
        })
    })

    describe("GET /api/recipes/:id", function () {

        it("should return 200 on success", async () => {
            const response = await request(server)
            .get("/api/recipes/1")
            .set("Content-type", "application/json")
            .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoicmVnaXN0ZXJUZXN0IiwiaWF0IjoxNTg4MDc5OTg5LCJleHAiOjE1ODgxNjYzODl9.A1AR_bscSDYjL8wVhE_EfdnIqJqJ89sLvkzN5RM9jIA")
            expect(response.status).toBe(200);
        })

        it("should return Scrambled Eggs as first recipe", function () {
            return request(server)
            .get("/api/recipes/1")
            .set("Content-type", "application/json")
            .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoicmVnaXN0ZXJUZXN0IiwiaWF0IjoxNTg4MDc5OTg5LCJleHAiOjE1ODgxNjYzODl9.A1AR_bscSDYjL8wVhE_EfdnIqJqJ89sLvkzN5RM9jIA")
            .then(res => {
                expect(res.body[0].title).toBe("Scrambled Eggs")
            })
        })
    })

    describe("POST /api/recipes", function () {

        it ("should return 201 on success", async () => {
            response = await request(server)
            .post("/api/recipes")
            .set("Content-type", "application/json")
            .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoicmVnaXN0ZXJUZXN0IiwiaWF0IjoxNTg4MDc5OTg5LCJleHAiOjE1ODgxNjYzODl9.A1AR_bscSDYjL8wVhE_EfdnIqJqJ89sLvkzN5RM9jIA")
            .send({
                title: "Poached Egg",
                source: "Auntie",
                ingredients: "1 egg",
                instructions: "Crack egg into boiling water, turn heat off and wait 5 min. Remove egg carefully."
            })
                expect(response.status).toBe(201)
        })

        it('should return a message', async () => {
            response = await request(server)
                .post("/api/recipes")
                .set("Content-type", "application/json")
                .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoicmVnaXN0ZXJUZXN0IiwiaWF0IjoxNTg4MDc5OTg5LCJleHAiOjE1ODgxNjYzODl9.A1AR_bscSDYjL8wVhE_EfdnIqJqJ89sLvkzN5RM9jIA")
                .send({
                    title: "Poached Egg",
                    source: "Auntie",
                    ingredients: "1 egg",
                    instructions: "Crack egg into boiling water, turn heat off and wait 5 min. Remove egg carefully."
                })
                expect(response.body.message).toBe("Recipe added successfully")
        });
    })

    describe("PUT /api/recipes/:id", function () {

        it("should return success message", async () => {
            response = await request(server)
            .put("/api/recipes/3")
            .set("Content-type", "application/json")
            .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoicmVnaXN0ZXJUZXN0IiwiaWF0IjoxNTg4MDc5OTg5LCJleHAiOjE1ODgxNjYzODl9.A1AR_bscSDYjL8wVhE_EfdnIqJqJ89sLvkzN5RM9jIA")
            .send({
                title: "EDITED Poached Egg",
                source: "Auntie",
                ingredients: "1 egg",
                instructions: "Crack egg into boiling water, turn heat off and wait 5 min. Remove egg carefully."
            })
            expect(response.body.message).toBe("Recipe updated successfully")
        })

        it("should tell user to log in if no token", async () => {
            response = await request(server)
            .put("/api/recipes/3")
            .send({
                title: "Edited Poached Egg",
                source: "Auntie",
                ingredients: "1 egg",
                instructions: "Crack egg into boiling water, turn heat off and wait 5 min. Remove egg carefully."
            })
            expect(response.body.message).toBe("Please log in.")
        })
    })

    describe("DELETE /api/recipes/:id", function () {
        // @TODO: create recipe to be deleted:
        // save id in variable to use for .delete
        it("should return success message", async () => {
            response = await request(server)
            .delete("/api/recipes/3")
            .set("Content-type", "application/json")
            .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoicmVnaXN0ZXJUZXN0IiwiaWF0IjoxNTg4MDc5OTg5LCJleHAiOjE1ODgxNjYzODl9.A1AR_bscSDYjL8wVhE_EfdnIqJqJ89sLvkzN5RM9jIA")
            expect(response.body.message).toBe("Recipe deleted successfully")
        })
    })
})