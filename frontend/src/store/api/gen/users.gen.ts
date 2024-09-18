import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    usersControllerFindOne: build.query<
      UsersControllerFindOneResponse,
      UsersControllerFindOneArgs
    >({
      query: (queryArg) => ({ url: `/api/users/${queryArg.id}` }),
    }),
    usersControllerUpdate: build.mutation<
      UsersControllerUpdateResponse,
      UsersControllerUpdateArgs
    >({
      query: (queryArg) => ({
        url: `/api/users/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateUserDto,
      }),
    }),
    usersControllerRemove: build.mutation<
      UsersControllerRemoveResponse,
      UsersControllerRemoveArgs
    >({
      query: (queryArg) => ({
        url: `/api/users/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type UsersControllerFindOneResponse =
  /** status 200  */ CommonResponseDto & {
    data?: UserResponseDto;
  };
export type UsersControllerFindOneArgs = {
  id: string;
};
export type UsersControllerUpdateResponse =
  /** status 200  */ CommonResponseDto & {
    data?: UserResponseDto;
  };
export type UsersControllerUpdateArgs = {
  id: string;
  updateUserDto: UpdateUserDto;
};
export type UsersControllerRemoveResponse =
  /** status 200  */ CommonResponseDto & {
    data?: UserResponseDto;
  };
export type UsersControllerRemoveArgs = {
  id: string;
};
export type CommonResponseDto = {
  /** 実行結果 */
  success: boolean;
  /** レスポンス送信日時 */
  date: string;
  /** データ */
  data: object;
  /** エラー内容 */
  error: string;
};
export type UserResponseDto = {
  /** name */
  name: string;
};
export type UpdateUserDto = {
  /** Email */
  email?: string;
  /** password */
  password?: string;
  /** name */
  name?: string;
};
export const {
  useUsersControllerFindOneQuery,
  useUsersControllerUpdateMutation,
  useUsersControllerRemoveMutation,
} = injectedRtkApi;
