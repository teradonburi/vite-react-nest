import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    authControllerSignup: build.mutation<
      AuthControllerSignupResponse,
      AuthControllerSignupArgs
    >({
      query: (queryArg) => ({
        url: `/api/auth/signup`,
        method: "POST",
        body: queryArg.createUserDto,
      }),
    }),
    authControllerLogin: build.mutation<
      AuthControllerLoginResponse,
      AuthControllerLoginArgs
    >({
      query: () => ({ url: `/api/auth/login`, method: "POST" }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type AuthControllerSignupResponse = unknown;
export type AuthControllerSignupArgs = {
  createUserDto: CreateUserDto;
};
export type AuthControllerLoginResponse = unknown;
export type AuthControllerLoginArgs = void;
export type CreateUserDto = {
  /** Email */
  email: string;
  /** password */
  password: string;
  /** name */
  name: string;
};
export const {
  useAuthControllerSignupMutation,
  useAuthControllerLoginMutation,
} = injectedRtkApi;
