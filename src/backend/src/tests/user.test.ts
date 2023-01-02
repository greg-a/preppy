import { app } from "../app";
const request = require("supertest");

describe("User endpoint", () => {
  const rootURL = "/api/users";

  test("successfully create a user", async () => {
    const newUser = await request(app).post("/api/signup").send({
      name: "greg",
      password: "test123",
      email: "test@gmail.com",
    });
    expect(newUser.statusCode).toBe(200);
  });

  test("get list of all users", async () => {
    const response = await request(app).get(rootURL);
    expect(response.body.length).toBe(3);
    expect(response.statusCode).toBe(200);
  });
});
