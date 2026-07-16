import { NextRequest, NextResponse } from "next/server";
import { recordPageView } from "@/lib/dynamo";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path } = body;

    if (!path) {
      return NextResponse.json({ error: "Missing path" }, { status: 400 });
    }

    await recordPageView(
      path,
      request.headers.get("referer") || undefined,
      request.headers.get("user-agent") || undefined
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to record view" }, { status: 500 });
  }
}
