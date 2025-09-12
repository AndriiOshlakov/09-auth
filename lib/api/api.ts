import axios from "axios";
import { Note, NoteTag } from "@/types/note";

export const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export interface PostsHttpResponse {
  notes: Note[];
  totalPages: number;
}

export type NoteCreateData = Pick<Note, "title" | "content" | "tag">;

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}
