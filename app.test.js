const request = require("supertest");
const app = require("./app");

describe("GET /", () => {
  it("Deve retornar: Hello, CI/CD!", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello, CI/CD!");
  });
});

describe("GET /greet/:name", () => {
  it("Deve retornar uma saudação personalizada", async () => {
    const res = await request(app).get("/greet/Tarcisio");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Hello, Tarcisio!" });
  });
});

describe("GET /user/:id", () => {
  it("Deve retornar o usuário com ID", async () => {
    const res = await request(app).get("/user/5");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: "5", name: "User 5" });
  });
});

describe("POST /user", () => {
  it("Deve criar um usuário", async () => {
    const res = await request(app).post("/user").send({ name: "John" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 1, name: "John" });
  });

  it("Deve retornar erro se nome não fornecido", async () => {
    const res = await request(app).post("/user").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Name is required" });
  });
});

describe("PUT /user/:id", () => {
  it("Deve atualizar o usuário", async () => {
    const res = await request(app).put("/user/5").send({ name: "Jane" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: "5", name: "Jane" });
  });

  it("Deve retornar erro se nome não fornecido", async () => {
    const res = await request(app).put("/user/5").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Name is required" });
  });
});

describe("DELETE /user/:id", () => {
  it("Deve deletar o usuário", async () => {
    const res = await request(app).delete("/user/5");
    expect(res.statusCode).toBe(204);
  });
});
