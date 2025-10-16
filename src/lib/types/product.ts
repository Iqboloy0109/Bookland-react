import {
  BookFormat,
  BookGenre,
  BookStatus,
  BookCondition,
} from "../enums/product.enum";

export interface Book {
  _id: string;
  bookStatus: BookStatus;
  bookGenre: BookGenre;
  bookTitle: string;
  bookAuthor: string;
  bookPrice: number;
  bookQuantity: number;
  bookFormat: BookFormat;
  bookPages?: number;
  bookCondition: BookCondition;
  bookPublisher?: string;
  bookPublicationYear?: number;
  bookDescription?: string;
  bookImages: string[];
  bookViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookInquiry {
  order: string;
  page: number;
  limit: number;
  bookGenre?: BookGenre;
  bookCondition?: BookCondition;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  bookFormat?: BookFormat;
}

export interface BookInput {
  bookStatus?: BookStatus;
  bookGenre: BookGenre;
  bookTitle: string;
  bookAuthor: string;
  bookPrice: number;
  bookQuantity: number;
  bookFormat: BookFormat;
  bookPages?: number;
  bookCondition: BookCondition;
  bookImages: string[];
  bookPublisher?: string;
  bookPublicationYear?: number;
  bookDescription?: string;
  bookViews?: number;
}

export interface BookUpdateInput {
  _id: string;
  bookStatus?: BookStatus;
  bookGenre?: BookGenre;
  bookTitle?: string;
  bookAuthor?: string;
  bookPrice?: number;
  bookQuantity?: number;
  bookFormat?: BookFormat;
  bookPages?: number;
  bookCondition?: BookCondition;
  bookPublisher?: string;
  bookPublicationYear?: number;
  bookDescription?: string;
  bookImages?: string[];
  bookViews?: number;
}

export { BookFormat, BookGenre, BookCondition };
