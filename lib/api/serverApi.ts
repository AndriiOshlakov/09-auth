import { cookies } from "next/headers";
import { FetchNotesParams, nextServer } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";

interface PostsHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotesServer = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<PostsHttpResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<PostsHttpResponse>("/notes", {
    params: { page, perPage, search, tag },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const getMeServer = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};
