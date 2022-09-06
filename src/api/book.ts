import { api, apiWithToken } from './api';
import { Response } from './api';
import { BookDto, BookDetailDto } from './book.dto';
import http from './http'

const bookApi = {
    // 단일 책 조회
    getBookById(book_id: string): Promise<Response<BookDetailDto>> {
        return http.get(`/books/${book_id}`)
    },
    // 모든 책 조회: 특정 회원
    getAllBooks(): Promise<Response<BookDto>> {
        return http.get('/books')
    },

    // 태그 조회: 특정 회원, 모든 책
    getTagByBook() {
        return http.get('/tags')
    },
    // 모든 책 조회: 특정 회원, 특정 태그
    getBookByTag(url: string) {
        return http.get(url)
    },

    // 책 저장
    createBook(data: {
        book: {
            name: string;
            text: string;
        };
        tags?: { name: string }[];
    }) {
        return http.post('/books', data)
    },

    // 책 수정
    updateBook(
        data: {
            book: {
                name: string;
                text: string;
            };
            tags?: 
            {
                name: string;
            }[];
        },
        url: string
    ) {
        return http.patch(url, data)
    },

    // 책 삭제
    deleteBook(url: string) {
        return http.delete(url)
    },
};

export default bookApi;
