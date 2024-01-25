import { prisma } from "@/lib/db";
import * as bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  
  if (!email || !password) {
    return new NextResponse('E-mail and/or Password invalid.', {
      status: 400,
    });
  }
  
  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (userAlreadyExists) {
    return new NextResponse('User already exists', {
      status: 400,
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
    }
  });

  return NextResponse.json(user);
}