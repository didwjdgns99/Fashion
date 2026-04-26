import { API_BASE_URL } from "@/app/utills/api";
import { getAuthCookie } from "@/libs/services/getCookies";

const DEFALUT_TIMEOUT_MS = 5000;
const DEFAULT_CONTENT_TYPE = "application/json";
const DEFAULT = "API 요청에 실패했습니다.";
const TIMEOUT = "요청 시간이 초과되었습니다.";
const UNKNOWN = "알 수 없는 오류가 발생했습니다.";
const NEED_LOGIN = "로그인이 필요합니다.";
//message 상속
//extend Error로 stack, name 등도 상속
//extend Error 하지 않으면 에러인척 하는 객체
class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type HttpConfig = {
  authRequired?: boolean;
  timeoutMS?: number;
};

export async function http(
  path: string,
  options: RequestInit = {}, //fetch 옵션(method, headers, body 등)
  config: HttpConfig = {},
) {
  const controller = new AbortController(); //요청 강제 취소
  //timeoutMS만큼 지나면 강제 종료
  const timeout = setTimeout(() => {
    controller.abort();
  }, config.timeoutMS ?? DEFALUT_TIMEOUT_MS);

  try {
    const cookie = await getAuthCookie();
    //authReqired가 필요한데 쿠키가 없다면
    if (config.authRequired && !cookie) {
      throw new ApiError(401, NEED_LOGIN);
    }

    const isFormData = options.body instanceof FormData;

    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal, //여기서 시그날이 연결해주는 용어야? 그리고 왜  뒤에 또 signal을 붙여쓰지?
      headers: {
        ...(options.body && !isFormData
          ? { "Content-Type": DEFAULT_CONTENT_TYPE }
          : {}),
        ...(cookie ? { Cookie: cookie } : {}),
        ...options.headers,
      },
    });

    const contentType = res.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");

    // 응답 실패 처리
    if (!res.ok) {
      const errorBody = isJson
        ? await res.json().catch(() => null)
        : await res.text().catch(() => "");
      throw new ApiError(
        res.status,
        typeof errorBody === "object" && errorBody?.message
          ? errorBody.message
          : DEFAULT,
      );
    }

    if (!isJson) {
      return null;
    }

    return await res.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError(408, TIMEOUT);
    }
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, UNKNOWN);
  } finally {
    clearTimeout(timeout);
  }
}
