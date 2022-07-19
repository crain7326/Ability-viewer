import { api, apiWithToken } from './api';
import userStorage from '../helper/localStorage';
import { Response } from './api';
import { BookDto, BookDetailDto } from './book.dto';

const bookApi = {
  // 단일 책 조회
  async getBookById(book_id: string): Promise<Response<BookDetailDto>> {
    return await apiWithToken({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/books/${book_id}`,
    });
  },
  // 특정 회원의 모든 책 조회
  async getAllBooks(): Promise<Response<BookDto>> {
    return await apiWithToken({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/books`,
    });
  },
  // 특정 회원, 특정 태그의 모든 책 조회
  getBookByTag() {
    return apiWithToken({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/tags`,
    });
  },

  // 책 저장
  createBook(data: {
    book: {
      name: string;
      text: string;
    };
    tags?: { name: string }[];
  }) {
    return apiWithToken({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/books`,
      data,
    });
  },

  // 책 수정
  updateBook(
    data: {
      book: {
        name: string;
        text: string;
      };
      tags?: [
        {
          name: string;
        }
      ];
    },
    url: string
  ) {
    return apiWithToken({
      method: 'PATCH',
      data,
      url,
    });
  },

  // 책 삭제
  deleteBook(url: string) {
    return apiWithToken({
      method: 'DELETE',
      url,
    });
  },
};

export default bookApi;
