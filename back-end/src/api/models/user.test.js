const mongoose = require("mongoose");
const  User  = require("./user");
const db = require("../../config/db1");
import 'regenerator-runtime/runtime'


const userData = {
  name: "TekLoon",
  email: "tekloon@gmail.com",
  phone: "07000000000",
  password: "TekLoon123",
};

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});


/**
 * User model
 */
describe("User model", () => {
  it("create & save user successfully", async () => {
    const validUser = new User(userData);
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.phone).toBe(userData.phone);
    expect(savedUser.salt).toBeDefined();
  });

  it("insert user successfully, but the field not defined in schema should be undefined", async () => {
    const userWithInvalidField = new User({
      ...userData,
      nickname: "Handsome TekLoon",
    });
    await userWithInvalidField.setPassword(userData.password);
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.nickname).toBeUndefined();
  });

  it("create user without required field should failed", async () => {
    const userWithoutRequiredField = new User({ name: "TekLoon" });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });
});