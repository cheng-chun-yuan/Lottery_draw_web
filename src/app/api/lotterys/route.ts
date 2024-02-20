import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { lotterysTable } from "@/db/schema";

const postEventRequestSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  baseTokenURI: z.string(),
  percentage: z.array(z.number()),
  link: z.string(),
});
// you can use z.infer to get the typescript type from a zod schema
type PostEventRequest = z.infer<typeof postEventRequestSchema>;

// POST /api/lotterys
/// Create Event
export async function POST(req: NextRequest) {
  console.log("POST /api/lotterys");
  const data = await req.json();
  try {
    // parse will throw an error if the data doesn't match the schema
    postEventRequestSchema.parse(data);
  } catch (error) {
    // in case of an error, we return a 400 response
    if (error instanceof z.ZodError) {
      console.error(error.errors);
    } else {
      console.error(error);
    }
    return NextResponse.json({ error: "Invalid Zod request" }, { status: 400 });
  }
  const { name, symbol, baseTokenURI, percentage, link } =
    data as PostEventRequest;
  try {
    // create event
    const [newEventId] = await db
      .insert(lotterysTable)
      .values({
        name,
        symbol,
        baseTokenURI,
        percentage,
        link,
      })
      .returning();

    return NextResponse.json({ event: newEventId }, { status: 200 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// GET /api/lotterys
/// Get All lotterys
export async function GET() {
  try {
    const dblotterys = await db.query.lotterysTable.findMany();

    const lotterysWithTransactionCount = await Promise.all(
      dblotterys.map(async (dbEvent) => {
        return {
          displayId: dbEvent.displayId,
          name: dbEvent.name,
          symbol: dbEvent.symbol,
          baseTokenURI: dbEvent.baseTokenURI,
          percentage: dbEvent.percentage,
          link: dbEvent.link,
        };
      }),
    );

    return NextResponse.json(lotterysWithTransactionCount, { status: 200 });
  } catch (error) {
    console.error("Error getting lotterys:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
