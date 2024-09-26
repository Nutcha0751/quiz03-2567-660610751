import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { Database, payload } from "@lib/DB";

export const GET = async (request: NextRequest) => {
  const roomId = request.nextUrl.searchParams.get("roomId");
  readDB();
  const rooms = (<Database>DB).rooms;
  const room = rooms.find((r) => r.roomId === roomId);

  if(room){
    return NextResponse.json(
    {
      ok: false,
      message: `Room is not found`,
    },
      { status: 404 }
    );
  }
  const messages = (<Database>DB).messages.filter((m) => m.roomId === roomId);
  return NextResponse.json({
    ok: true,
    messages,
  });
};


export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const data = (<Database>DB);
  //const room = data.rooms.find((r) => r.roomId === roomId);
  readDB();

  /*if(!room){
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
  }*/

  /*const messageId = nanoid();
  data.messages.push({
    roomId,
    messageId,
    messageText: body.messageText,
  });*/

  writeDB();

  return NextResponse.json({
    ok: true,
    // messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request: NextRequest) => {
  const payload = checkToken();

  if((<payload>payload)){
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  readDB();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Message is not found",
  //   },
  //   { status: 404 }
  // );

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
