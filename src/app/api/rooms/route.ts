import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  let total: number = 0;
  for (const room in (<any>DB).rooms) {
    total++;
  }
  return NextResponse.json({
    ok: true,
    rooms: (<any>DB).rooms,
    totalRooms: total
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();
  if (!payload){
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  const body = await request.json();
  readDB();

  /*if(room){
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${"replace this with room name"} already exists`,
      },
      { status: 400 }
    );
  }*/

  const roomId = nanoid();

  //call writeDB after modifying Database
  (<any>DB).room.push()
  writeDB();

  //DB.user.push(body);
  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
