import { API_BASE_URL } from "@/app/utills/api";

const DEFALUT_TIMEOUT_MS = 5000;
const DEFAULT_CONTENT_TYPE = "application/json";
const DEFAULT = "API 요청에 실패했습니다.";
const TIMEOUT = "요청 시간이 초과되었습니다.";
const UNKNOWN = "알 수 없는 오류가 발생했습니다.";
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

export async function http(
  path: string,
  options: RequestInit = {}, //fetch 옵션(method, headers, body 등)
  timeoutMS: number = DEFALUT_TIMEOUT_MS,
) {
  const controller = new AbortController(); //요청 강제 취소
  //timeoutMS만큼 지나면 강제 종료
  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMS);

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal, //abort와 연결
      headers: {
        ...(options.body && { "Content-Type": DEFAULT_CONTENT_TYPE }),
        // body가 있으면 Content-Type: application/json 추가
        // GET 요청처럼 body가 없으면 이 헤더는 넣지 않음
        ...options.headers,
        // 사용자가 직접 전달한 headers가 있으면 뒤에서 덮어씀
        // 즉, 사용자가 지정한 헤더가 우선권을 가짐
      },
      // ...options,
      // method, body, credentials 등 사용자가 전달한 fetch 옵션 적용
    });

    const contentType = res.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");
    if (!res.ok) {
      const errorBody = isJson
        ? await res.json().catch(() => {})
        : await res.text().catch(() => "");
      throw new ApiError(res.status, errorBody?.message || DEFAULT);
    }
    if (!isJson) {
      return null;
    }
    //return await res.json();
    const data = await res.json();
    return data;
  } catch (error) {
    //error의 브라우저에서 만든 에러이면서 이름이 AbortError인 경우
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

//서버에서 json규칙을 지켜서 보내면 프론트에서 json()으로 파싱가능
//지키지 않으면 text()로 받아서 수동파싱해야함
//JSON은 데이터를 적는 문법
//규칙 전체 형태는 값(value)가 하나여야 한다.
//허용되는 값 종류 객체,배열,숫자,문자열,true/false,null
//서버에서는 key는 항상 문자열이여서 ""로 감싸야함, 밸류도 문자열이면 ""로 감싸야함
//{ "key": "value" }
//{ "key": 123 }
//{"active":true}
//{"data":null}
