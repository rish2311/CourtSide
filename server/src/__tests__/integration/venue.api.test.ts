import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../../app";
import User from "../../modules/auth/model/user.model";

const AUTH_PREFIX = "/api/v1/auth";
const API_PREFIX = "/api/v1/venues";

const ownerUser = {
  firstName: "Venue",
  lastName: "Owner",
  username: "venueowner",
  email: "owner@example.com",
  password: "Test@1234",
  confirmPassword: "Test@1234",
};

const adminUser = {
  firstName: "Admin",
  lastName: "User",
  username: "adminuser",
  email: "admin@example.com",
  password: "Test@1234",
  confirmPassword: "Test@1234",
};

const validVenue = {
  name: "Central Sports Arena",
  description: "A world-class sports venue with multiple courts and premium facilities for athletes of all levels.",
  location: {
    address: "123 Sports St",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    coordinates: { lat: 19.076, lng: 72.8777 },
  },
  amenities: [
    { name: "Parking", icon: "car" },
    { name: "Shower", icon: "shower" },
  ],
  openTime: "06:00",
  closeTime: "22:00",
};

async function registerAndLogin(user: typeof ownerUser) {
  await request(app).post(`${AUTH_PREFIX}/register`).send(user);
  const loginRes = await request(app)
    .post(`${AUTH_PREFIX}/login`)
    .send({ email: user.email, password: user.password });
  return loginRes.body.data.accessToken;
}

async function createVenue(token: string) {
  const res = await request(app)
    .post(API_PREFIX)
    .set("Authorization", `Bearer ${token}`)
    .send(validVenue);
  return res.body.data;
}

describe("Venue API", () => {
  describe("POST /api/v1/venues", () => {
    it("should create a venue and return 201", async () => {
      const token = await registerAndLogin(ownerUser);

      const res = await request(app)
        .post(API_PREFIX)
        .set("Authorization", `Bearer ${token}`)
        .send(validVenue);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe("Central Sports Arena");
      expect(res.body.data.status).toBe("PENDING");
      expect(res.body.data.location.city).toBe("Mumbai");
    });

    it("should return 401 without auth", async () => {
      const res = await request(app)
        .post(API_PREFIX)
        .send(validVenue);

      expect(res.status).toBe(401);
    });

    it("should return 422 with invalid data", async () => {
      const token = await registerAndLogin(ownerUser);

      const res = await request(app)
        .post(API_PREFIX)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "X" });

      expect(res.status).toBe(422);
    });
  });

  describe("GET /api/v1/venues", () => {
    it("should list approved venues", async () => {
      const token = await registerAndLogin(ownerUser);
      await createVenue(token);

      const res = await request(app).get(API_PREFIX);

      expect(res.status).toBe(200);
      expect(res.body.data.venues).toBeDefined();
    });

    it("should search venues by city", async () => {
      const token = await registerAndLogin(ownerUser);
      await createVenue(token);

      const res = await request(app)
        .get(`${API_PREFIX}?city=Mumbai`);

      expect(res.status).toBe(200);
    });

    it("should filter by owner", async () => {
      const token = await registerAndLogin(ownerUser);
      const venue = await createVenue(token);

      const res = await request(app)
        .get(`${API_PREFIX}?owner=${venue.owner}&status=PENDING`);

      expect(res.status).toBe(200);
      expect(res.body.data.venues.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("GET /api/v1/venues/:id", () => {
    it("should return a venue by id", async () => {
      const token = await registerAndLogin(ownerUser);
      const venue = await createVenue(token);

      const res = await request(app)
        .get(`${API_PREFIX}/${venue.id}`);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("Central Sports Arena");
    });

    it("should return 404 for non-existent venue", async () => {
      const res = await request(app)
        .get(`${API_PREFIX}/507f1f77bcf86cd799439011`);

      expect(res.status).toBe(404);
    });
  });

  describe("PATCH /api/v1/venues/:id", () => {
    it("should update own venue", async () => {
      const token = await registerAndLogin(ownerUser);
      const venue = await createVenue(token);

      const res = await request(app)
        .patch(`${API_PREFIX}/${venue.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Updated Arena" });

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("Updated Arena");
    });

    it("should return 403 when updating another owner's venue", async () => {
      const token1 = await registerAndLogin(ownerUser);
      const venue = await createVenue(token1);

      const token2 = await registerAndLogin({
        ...ownerUser,
        username: "otherowner",
        email: "other@example.com",
      });

      const res = await request(app)
        .patch(`${API_PREFIX}/${venue.id}`)
        .set("Authorization", `Bearer ${token2}`)
        .send({ name: "Hacked" });

      expect(res.status).toBe(403);
    });
  });

  describe("DELETE /api/v1/venues/:id", () => {
    it("should delete own venue", async () => {
      const token = await registerAndLogin(ownerUser);
      const venue = await createVenue(token);

      const res = await request(app)
        .delete(`${API_PREFIX}/${venue.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(204);
    });
  });

  describe("PATCH /api/v1/venues/:id/status", () => {
    it("should allow admin to approve a venue", async () => {
      const token = await registerAndLogin(ownerUser);
      const venue = await createVenue(token);

      await request(app).post(`${AUTH_PREFIX}/register`).send(adminUser);

      await User.findOneAndUpdate({ email: adminUser.email }, { role: "ADMIN" });

      const loginRes = await request(app)
        .post(`${AUTH_PREFIX}/login`)
        .send({ email: adminUser.email, password: adminUser.password });
      const adminToken = loginRes.body.data.accessToken;

      const res = await request(app)
        .patch(`${API_PREFIX}/${venue.id}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "APPROVED" });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe("APPROVED");
    });

    it("should return 403 for non-admin status update", async () => {
      const token = await registerAndLogin(ownerUser);
      const venue = await createVenue(token);

      const res = await request(app)
        .patch(`${API_PREFIX}/${venue.id}/status`)
        .set("Authorization", `Bearer ${token}`)
        .send({ status: "APPROVED" });

      expect(res.status).toBe(403);
    });
  });

  describe("POST /api/v1/venues/:id/images", () => {
    it("should add images to venue", async () => {
      const token = await registerAndLogin(ownerUser);
      const venue = await createVenue(token);

      const res = await request(app)
        .post(`${API_PREFIX}/${venue.id}/images`)
        .set("Authorization", `Bearer ${token}`)
        .send({ urls: ["https://example.com/image.jpg"] });

      expect(res.status).toBe(200);
      expect(res.body.data.images).toContain("https://example.com/image.jpg");
    });
  });
});
