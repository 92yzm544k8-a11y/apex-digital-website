import { NextResponse } from "next/server";
import { getAnalyticsStats, getContacts } from "@/lib/dynamo";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const adminKey = process.env.ADMIN_API_KEY;

  if (adminKey && authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [analytics, contacts] = await Promise.all([
      getAnalyticsStats(30),
      getContacts(),
    ]);

    return NextResponse.json({ analytics, contacts });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to get stats" }, { status: 500 });
  }
}
