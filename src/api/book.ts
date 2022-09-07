import { BookDto, BookDetailDto, TagsDto } from './book.dto';
import http from './http'

const bookApi = {
    // 단일 책 조회
    async getBookById(book_id: string): Promise<BookDetailDto> {
        return await http.get(`/books/${book_id}`)
    },
    // 모든 책 조회: 특정 회원
    async getAllBooks(): Promise<BookDto> {
        return await http.get('/books')
    },

    // 태그 조회: 특정 회원, 모든 책
    async getTagByBook(): Promise<TagsDto> {
        return await http.get('/tags')
    },
    // 모든 책 조회: 특정 회원, 특정 태그
    async getBookByTag(url: string): Promise<BookDto> {
        return await http.get(url)
    },

    // 책 저장
    async createBook(data: {
        book: {
            name: string;
            text: string;
        };
        tags?: { name: string }[];
    }): Promise<{success: boolean}> {
        return await http.post('/books', data)
    },

    // 책 수정
    async updateBook(
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
    ): Promise<{success: boolean}> {
        return await http.patch(url, data)
    },

    // 책 삭제
    async deleteBook(url: string) {
        return await http.delete(url)
    },
};

export default bookApi;
