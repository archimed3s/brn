import { NextResponse } from "next/server";

import {
  backendMissingResponse,
  backendUnreachableResponse,
  getBackendConfig,
} from "@/lib/backend-fetch";

const UPLOAD_PATH = "/api/v1/conversation/documents/upload";

export const POST = async (request: Request) => {
  const { baseUrl, headers } = getBackendConfig(request);

  if (!baseUrl) {
    return backendMissingResponse();
  }

  const url = `${baseUrl}${UPLOAD_PATH}`;

  try {
    const formData = await request.formData();
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "Failed to upload document",
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
