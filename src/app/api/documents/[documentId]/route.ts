import { NextResponse } from "next/server";

import {
  backendMissingResponse,
  backendUnreachableResponse,
  getBackendConfig,
} from "@/lib/backend-fetch";

const DOCUMENTS_PATH = "/api/v1/conversation/documents";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ documentId: string }> },
) => {
  const { baseUrl, headers } = getBackendConfig(request);

  if (!baseUrl) {
    return backendMissingResponse();
  }

  const { documentId } = await params;
  if (!documentId) {
    return NextResponse.json(
      { error: "document_id is required" },
      { status: 400 },
    );
  }

  const url = `${baseUrl}${DOCUMENTS_PATH}/${documentId}`;

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
          error: "Failed to fetch document",
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
