import { api, apiWithToken } from './api';
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
    // 모든 책 조회: 특정 회원
    async getAllBooks(): Promise<Response<BookDto>> {
        return await apiWithToken({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/books`,
        });
    },

    // 태그 조회: 특정 회원, 모든 책
    getTagByBook() {
        return apiWithToken({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/tags`,
        });
    },
    // 모든 책 조회: 특정 회원, 특정 태그
    getBookByTag(url: string) {
        return apiWithToken({
            method: 'GET',
            url,
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
