// Request
/**
 * [Request] 회원가입
 */
export interface IRequsetRegister {
  user: {
    id: string;
    email: string;
    password: string;
  };
}

/**
 * [Request] 로그인
 */
export interface IRequestLogin {
  id: string;
  password: string;
}

/**
 * [Request] 책 저장, 책 수정
 */
export interface IRequestSaveBook {
  book: {
    name: string;
    text: string;
  };
  tags: Array<{
    name: string;
  }>;
}

// Response
/**
 * [Response] 로그인
 */
export interface IResponseLogin {
  user: {
    id: string;
    links: {
      user: string;
    };
  };
}

/**
 * [Response] 회원 기본 정보 조회
 */
export interface IResponseUsers {
  user: {
    id: string;
    email: string;
    links: {
      books: string;
      tags: string;
    };
  };
}

/**
 * [Response] 단일 책 조회
 */
export interface IResponseSingleBook {
  book: {
    name: string;
    text: string;
    tags: Array<{
      name: string;
    }>;
    links: {
      update: string;
      delete: string;
    };
  };
}

/**
 * [Response] 특정 회원의 모든 책 조회, 특정 회원, 특정 태그의 모든 책 조회
 */
export interface IResponseParticularBooks {
  books: Array<{
    name: string;
    updatedAt: string;
    createdAt: string;
    links: {
      book: string;
      delete: string;
    };
  }>;
}

/**
 * [Response] 기본 응답 결과
 */
export interface IResponse {
  success: boolean;
}
