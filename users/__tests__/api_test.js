const nock = require("nock");
const request = require("supertest");
const userService = require("../userService");
const userGateway = require("../userGateway");
// const app = require("../app");

// test("Should be Get User ID 1", (done) => {
//   request(app)
//     .get("/users/1")
//     .expect("Content-Type", /json/)
//     .expect(200)
//     .expect(function (res) {
//       res.body.id = 1;
//       res.body.name = "Leanne Graham";
//       res.body.username = "Bret";
//       res.body.email = "Sincere@april.biz";
//     })
//     .end(function (err, res) {
//       if (err) throw err;
//       done();
//     });
// });

test("Should be Get User ID 1 userGateway", async () => {
  nock("https://jsonplaceholder.cypress.io")
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/users/1")
    .reply(200, {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    });

  const response = await userGateway.getUser(1);
  expect(response.id).toBe(1);
  expect(response.name).toBe("Leanne Graham");
  expect(response.username).toBe("Bret");
  expect(response.email).toBe("Sincere@april.biz");
});

test("Should error Code=500", async () => {
  nock("https://jsonplaceholder.cypress.io")
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/users/1")
    .reply(500);

  const response = await userGateway.getUser(1);
  expect(response.code).toEqual(500);
});

test("should return stub user", async () => {
  jest
    .spyOn(userGateway, "getUser")
    .mockResolvedValue({ id: 1, name: "stub user" });

  const results = await userService.inquiryUser();
  expect(results.id).toBe(1);
  expect(results.name).toBe("stub user");
});

test("should return error", async () => {
  jest.spyOn(userGateway, "getUser").mockRejectedValue({ code: 500 });

  await expect(userService.inquiryUser()).rejects.toEqual({
    code: 500,
  });
});
