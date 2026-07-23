import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../../app";


const API_PREFIX = "/api/v1/auth";

const validUser = {
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  email: "john@example.com",
  password: "Test@1234",
  confirmPassword: "Test@1234",
};

describe("Auth API", () => {
  describe("POST /api/v1/auth/register", () => {
    it("should register a new user and return 201", async () => {
      const res = await request(app)
        .post(`${API_PREFIX}/register`)
        .send(validUser);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toBeDefined();
      expect(res.body.data.user.email).toBe("john@example.com");
      expect(res.body.data.user).not.toHaveProperty("password");
    });

    it("should return 422 when validation fails", async () => {
      const res = await request(app)
        .post(`${API_PREFIX}/register`)
        .send({ email: "invalid" });

      expect(res.status).toBe(422);
      expect(res.body.success).toBe(false);
    });

    it("should return 409 when email already exists", async () => {
      await request(app).post(`${API_PREFIX}/register`).send(validUser);

      const res = await request(app)
        .post(`${API_PREFIX}/register`)
        .send(validUser);

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
    });

    it("should return 409 when username already exists", async () => {
      await request(app).post(`${API_PREFIX}/register`).send(validUser);

      const res = await request(app)
        .post(`${API_PREFIX}/register`)
        .send({
          ...validUser,
          email: "other@example.com",
        });

      expect(res.status).toBe(409);
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      await request(app).post(`${API_PREFIX}/register`).send(validUser);
    });

    it("should login with valid credentials and return 200", async () => {
      const res = await request(app)
        .post(`${API_PREFIX}/login`)
        .send({ email: "john@example.com", password: "Test@1234" });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toBeDefined();
      expect(res.body.data.accessToken).toBeDefined();
    });

    it("should return 401 with invalid credentials", async () => {
      const res = await request(app)
        .post(`${API_PREFIX}/login`)
        .send({ email: "john@example.com", password: "WrongPass@1" });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/v1/auth/me", () => {
    it("should return current user when authenticated", async () => {
      await request(app).post(`${API_PREFIX}/register`).send(validUser);

      const loginRes = await request(app)
        .post(`${API_PREFIX}/login`)
        .send({ email: "john@example.com", password: "Test@1234" });

      const token = loginRes.body.data.accessToken;

      const res = await request(app)
        .get(`${API_PREFIX}/me`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe("john@example.com");
    });

    it("should return 401 without auth token", async () => {
      const res = await request(app).get(`${API_PREFIX}/me`);

      expect(res.status).toBe(401);
    });
  });

  describe("PATCH /api/v1/auth/profile", () => {
    it("should update profile when authenticated", async () => {
      await request(app).post(`${API_PREFIX}/register`).send(validUser);

      const loginRes = await request(app)
        .post(`${API_PREFIX}/login`)
        .send({ email: "john@example.com", password: "Test@1234" });

      const token = loginRes.body.data.accessToken;

      const res = await request(app)
        .patch(`${API_PREFIX}/profile`)
        .set("Authorization", `Bearer ${token}`)
        .send({ firstName: "Jane" });

      expect(res.status).toBe(200);
      expect(res.body.data.firstName).toBe("Jane");
    });

    it("should return 401 without auth token", async () => {
      const res = await request(app)
        .patch(`${API_PREFIX}/profile`)
        .send({ firstName: "Jane" });

      expect(res.status).toBe(401);
    });
  });

  describe("POST /api/v1/auth/logout", () => {
    it("should return 200 on logout", async () => {
      await request(app).post(`${API_PREFIX}/register`).send(validUser);

      const loginRes = await request(app)
        .post(`${API_PREFIX}/login`)
        .send({ email: "john@example.com", password: "Test@1234" });

      const token = loginRes.body.data.accessToken;

      const res = await request(app)
        .post(`${API_PREFIX}/logout`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
