import { NextResponse } from "next/server";

import {
  backendMissingResponse,
  backendUnreachableResponse,
  getBackendConfig,
} from "@/lib/backend-fetch";

const DOCUMENTS_PATH = "/api/v1/conversation/documents";

export const GET = async (request: Request) => {
  const { baseUrl, headers } = getBackendConfig(request);

  if (!baseUrl) {
    return backendMissingResponse();
  }

  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category_id");
  const parentCategoryId = searchParams.get("parent_category_id");
  const docStatus = searchParams.get("doc_status");
  const page = searchParams.get("page") ?? "1";
  const size = searchParams.get("size") ?? "50";

  const params = new URLSearchParams();
  if (categoryId != null) params.set("category_id", categoryId);
  if (parentCategoryId != null)
    params.set("parent_category_id", parentCategoryId);
  if (docStatus != null) params.set("doc_status", docStatus);
  params.set("page", page);
  params.set("size", size);

  const url = `${baseUrl}${DOCUMENTS_PATH}?${params.toString()}`;

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
          error: "Failed to fetch documents",
          status: res.status,
          ...(typeof data === "object" && data !== null
            ? data
            : { body: data }),
        },
        { status: res.status >= 500 ? 502 : res.status },
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    return backendUnreachableResponse(err);
  }
};
