// import fetchMock from "jest-fetch-mock";
// import { api } from "../src/features/api/apiSlice";
// import { Headers } from "../types";
// import { game, variant, newGame } from "../testData";
// import authReducer from "../auth";
// import { setupApiStore } from "../testUtils";
// import { actions as authActions } from "../auth";

// beforeEach((): void => {
//   fetchMock.resetMocks();
// });

// describe("ListVariants", () => {
//   const storeRef = setupApiStore(diplomacyService, { auth: authReducer });
//   fetchMock.mockResponse(JSON.stringify({}));

//   test("request is correct", () => {
//     return storeRef.store
//       .dispatch<any>(
//         diplomacyService.endpoints.listVariants.initiate(undefined)
//       )
//       .then(() => {
//         expect(fetchMock).toBeCalledTimes(1);
//         const { method, headers, url } = fetchMock.mock.calls[0][0] as Request;

//         const accept = headers.get(Headers.Accept);
//         const authorization = headers.get(Headers.Authorization);

//         expect(method).toBe("GET");
//         expect(url).toBe(`${serviceURL}Variants`);
//         expect(accept).toBe("application/json");
//         expect(authorization).toBeNull();
//       });
//   });