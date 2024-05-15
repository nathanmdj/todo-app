import { NextResponse } from "next/server"

export async function GET(request:any) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(NextResponse.json({ message: 'hello' }));
    }, 3000);
  });
}