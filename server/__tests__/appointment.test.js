/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const request = require("supertest");
const { app } = require("../server");

describe("Tests for Appointment APIs", () => {
  let server;

  beforeAll(() => {
    server = app.listen(3005);
  });

  afterAll((done) => {
    server.close(done);
  });

  it("should get all appointments", async () => {
    const response = await request(server).get("/api/appointments");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should create a new appointment", async () => {
    const appointmentData = {
      name: "John Doe",
      time: "12:00 PM",
    };

    const response = await request(server)
      .post("/api/appointments")
      .send(appointmentData);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(appointmentData.name);
    expect(response.body.time).toBe(appointmentData.time);
  });

  it("should not create an appointment with missing data", async () => {
    const response = await request(server).post("/api/appointments").send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Name and time are required fields.");
  });

  it("should not create an appointment with a duplicate time slot", async () => {
    const appointmentData = {
      name: "Jane Doe",
      time: "12:00 PM",
    };

    // Create an initial appointment
    await request(server).post("/api/appointments").send(appointmentData);

    // Attempt to create another appointment with the same time slot
    const response = await request(server)
      .post("/api/appointments")
      .send(appointmentData);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Time slot already booked. Try another time!"
    );
  });

  it("should delete an appointment by time", async () => {
    const appointmentData = {
      name: "Alice",
      time: "3:00 PM",
    };

    // Create an appointment to be deleted
    const createdAppointment = await request(server)
      .post("/api/appointments")
      .send(appointmentData);

    const response = await request(server).delete(
      `/api/appointments/${createdAppointment.body.time}`
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Appointment deleted successfully.");
  });
});
