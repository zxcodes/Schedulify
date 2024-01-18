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
    done();
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
      id: 1,
    };

    const response = await request(server)
      .post("/api/appointments/create")
      .send(appointmentData);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(appointmentData.name);
    expect(response.body.time).toBe(appointmentData.time);
  });

  it("should not create an appointment with missing data", async () => {
    const response = await request(server)
      .post("/api/appointments/create")
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Name and time are required fields.");
  });

  it("should not create an appointment with a duplicate time slot", async () => {
    const appointmentData = {
      name: "Jane Doe",
      time: "12:00 PM",
      id: 4,
    };

    // Creating an initial appointment
    await request(server)
      .post("/api/appointments/create")
      .send(appointmentData);

    // Creating another appointment with the same time slot
    const response = await request(server)
      .post("/api/appointments/create")
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
      id: 2,
    };

    // Create an appointment to be deleted
    const createdAppointment = await request(server)
      .post("/api/appointments/create")
      .send(appointmentData);
    // Deleting the created appointment
    const response = await request(server).delete(
      `/api/appointments/delete/${createdAppointment.body.id}`
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Appointment deleted successfully.");
  });
});
