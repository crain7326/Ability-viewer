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
  tags: string[];
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
