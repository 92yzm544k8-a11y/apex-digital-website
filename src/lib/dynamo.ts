import { ddb } from "./aws";
import { PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const CONTACT_TABLE = process.env.DYNAMODB_CONTACT_TABLE || "eryon-contact";
const ANALYTICS_TABLE = process.env.DYNAMODB_ANALYTICS_TABLE || "eryon-analytics";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  createdAt: string;
}

export async function saveContact(data: ContactSubmission) {
  await ddb.send(
    new PutCommand({
      TableName: CONTACT_TABLE,
      Item: data,
    })
  );
}

export async function getContacts(limit = 50) {
  const result = await ddb.send(
    new ScanCommand({
      TableName: CONTACT_TABLE,
      Limit: limit,
    })
  );
  return (result.Items || []) as ContactSubmission[];
}

export async function recordPageView(path: string, referrer?: string, userAgent?: string) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  await ddb.send(
    new PutCommand({
      TableName: ANALYTICS_TABLE,
      Item: {
        pk: `pageview`,
        sk: id,
        path,
        referrer: referrer || "",
        userAgent: userAgent || "",
        timestamp: new Date().toISOString(),
        date: new Date().toISOString().slice(0, 10),
      },
    })
  );
}

export async function getAnalyticsStats(days = 30) {
  const result = await ddb.send(
    new ScanCommand({
      TableName: ANALYTICS_TABLE,
    })
  );
  const items = (result.Items || []) as any[];
  const now = new Date();
  const cutoff = new Date(now.getTime() - days * 86400000).toISOString();

  const recent = items.filter((i: any) => i.timestamp >= cutoff);
  const byPath: Record<string, number> = {};
  const byDate: Record<string, number> = {};

  for (const item of recent) {
    byPath[item.path] = (byPath[item.path] || 0) + 1;
    byDate[item.date] = (byDate[item.date] || 0) + 1;
  }

  return {
    totalViews: recent.length,
    uniquePaths: Object.keys(byPath).length,
    byPath: Object.entries(byPath)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count),
    byDate: Object.entries(byDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date)),
  };
}
