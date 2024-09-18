import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    appControllerGetHello: build.query<
      AppControllerGetHelloResponse,
      AppControllerGetHelloArgs
    >({
      query: () => ({ url: `/api` }),
    }),
    appControllerGetError: build.query<
      AppControllerGetErrorResponse,
      AppControllerGetErrorArgs
    >({
      query: () => ({ url: `/api/error` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type AppControllerGetHelloResponse =
  /** status 200  */ CommonResponseDto & {
    data?: GetHelloResponse;
  };
export type AppControllerGetHelloArgs = void;
export type AppControllerGetErrorResponse = unknown;
export type AppControllerGetErrorArgs = void;
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
export type GetHelloResponse = {
  /** メッセージ */
  message: string;
};
export const { useAppControllerGetHelloQuery, useAppControllerGetErrorQuery } =
  injectedRtkApi;
