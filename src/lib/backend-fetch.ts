import { NextResponse } from "next/server";

export const getBackendConfig = (request: Request): BackendConfig => {
  const baseUrl = process.env.API_BASE_URL;
  const auth = request.headers.get("Authorization");
  const headers: HeadersInit =
    auth != null
      ? { Accept: "application/json", Authorization: auth }
      : { Accept: "application/json" };
  return { baseUrl, headers };
};

export const backendMissingResponse = () =>
  NextResponse.json(
    { error: "API_BASE_URL is not configured" },
    { status: 503 },
  );

export const backendUnreachableResponse = (err: unknown) =>
  NextResponse.json(
    {
      error: "Backend unreachable",
      details: err instanceof Error ? err.message : "Unknown error",
    },
    { status: 502 },
  );

type BackendConfig = {
  baseUrl: string | undefined;
  headers: HeadersInit;
};
