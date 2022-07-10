import api from './api';
import userStorage from '../helper/localStorage';
import { Response } from './api';
import { BookDto, BookDetailDto } from './book.dto';

const bookApi = {
  // 단일 책 조회
  async getBookById(book_id: string): Promise<Response<BookDetailDto>> {
    return await api(
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userStorage.getToken()}`,
        },
      },
      `${process.env.REACT_APP_API_URL}/books/${book_id}`
    );
  },
  // 특정 회원의 모든 책 조회
  async getAllBooks(): Promise<Response<BookDto>> {
    return await api(
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userStorage.getToken()}`,
        },
      },
      `${process.env.REACT_APP_API_URL}/books`
    );
  },
  // 특정 회원, 특정 태그의 모든 책 조회
  getBookByTag(token: string) {
    return api(
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      `${process.env.REACT_APP_API_URL}/tags`
    );
  },

  // 책 저장
  createBook(
    data: {
      book: {
        name: string;
        text: string;
      };
      tags?: { name: string }[];
    },
    token: string
  ) {
    return api(
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      },
      `${process.env.REACT_APP_API_URL}/books`
    );
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
    book_id: string
  ) {
    return api(
      {
        method: 'PATCH',
        data,
      },
      `${process.env.REACT_APP_API_URL}/books/${book_id}`
    );
  },

  // 책 삭제
  deleteBook(book_id: string) {
    return api(
      {
        method: 'DELETE',
      },
      `${process.env.REACT_APP_API_URL}/books/${book_id}`
    );
  },
};

export default bookApi;
