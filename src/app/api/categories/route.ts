import { NextResponse } from "next/server";

import {
  backendMissingResponse,
  backendUnreachableResponse,
  getBackendConfig,
} from "@/lib/backend-fetch";
import type { DocumentCategory } from "@/lib/categories";

const DOCUMENT_CATEGORIES_PATH = "/api/v1/conversation/document-categories";

export type { DocumentCategory };

export const GET = async (request: Request) => {
  const { baseUrl, headers } = getBackendConfig(request);

  if (!baseUrl) {
    return backendMissingResponse();
  }

  const url = `${baseUrl}${DOCUMENT_CATEGORIES_PATH}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers,
      next: { revalidate: 0 },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch document categories",
          status: res.status,
          ...(typeof data === "object" && data !== null
            ? data
            : { body: data }),
        },
        { status: res.status >= 500 ? 502 : res.status },
      );
    }

    return NextResponse.json(data as DocumentCategory[]);
  } catch (err) {
    return backendUnreachableResponse(err);
  }
};

export const POST = async (request: Request) => {
  const { baseUrl, headers } = getBackendConfig(request);

  if (!baseUrl) {
    return backendMissingResponse();
  }

  let body: CreateDocumentCategoryBody;
  try {
    body = (await request.json()) as CreateDocumentCategoryBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, user_id, description, parent_id } = body;
  if (
    typeof name !== "string" ||
    typeof user_id !== "string" ||
    typeof description !== "string" ||
    (parent_id !== null && typeof parent_id !== "number")
  ) {
    return NextResponse.json(
      {
        error:
          "Missing or invalid fields: name, user_id, description, parent_id",
      },
      { status: 400 },
    );
  }

  const url = `${baseUrl}${DOCUMENT_CATEGORIES_PATH}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ name, user_id, description, parent_id }),
      next: { revalidate: 0 },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          error:
            (typeof data === "object" && data !== null && "error" in data
              ? (data as { error: string }).error
              : null) ?? "Failed to create document category",
          status: res.status,
          ...(typeof data === "object" && data !== null
            ? data
            : { body: data }),
        },
        { status: res.status >= 500 ? 502 : res.status },
      );
    }

    return NextResponse.json(data as DocumentCategory);
  } catch (err) {
    return backendUnreachableResponse(err);
  }
};

export type CreateDocumentCategoryBody = {
  name: string;
  user_id: string;
  description: string;
  parent_id: number | null;
};
