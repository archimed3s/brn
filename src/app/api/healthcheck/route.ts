import { NextResponse } from "next/server";

import {
  backendMissingResponse,
  backendUnreachableResponse,
  getBackendConfig,
} from "@/lib/backend-fetch";

const PING_PATH = "/ping";

export const GET = async (request: Request) => {
  const { baseUrl } = getBackendConfig(request);

  if (!baseUrl) {
    return backendMissingResponse();
  }

  const url = `${baseUrl}${PING_PATH}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 0 },
    });

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json(
        { error: "Backend healthcheck failed", status: res.status, body: text },
        { status: 502 },
      );
    }

    return NextResponse.json({
      status: "ok",
      backend: text.trim() || "pong",
    });
  } catch (err) {
    return backendUnreachableResponse(err);
  }
};
