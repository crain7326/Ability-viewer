export interface BookDto {
  books: BookEntity[];
}

export interface BookEntity {
  name: string;
  updatedAt: string;
  createdAt: string;
  links: {
    book: string;
    delete: string;
  };
  tags?: {
    links: { books: string };
    name: string;
  }[];
}

export interface BookDetailDto {
  book: BookDetailEntity;
}

export interface BookDetailEntity {
  name: string;
  text: string;
  links: {
    update: string;
    delete: string;
  };
  tags: { name: string }[];
}

export interface TagsDto {
  tags: {
    name: string;
    links: {
      books: string;
    }
  }[]
}