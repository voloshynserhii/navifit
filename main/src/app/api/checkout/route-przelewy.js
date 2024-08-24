'use server'
import { NextResponse } from "next/server";

import {
  P24,
  Order,
  Currency,
  Country,
  Language,
  NotificationRequest,
  Verification,
  Encoding,
} from "@ingameltd/node-przelewy24";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const merchantId = '285086_1111'; // you will get it once registered with P24
const posId = process.env.PRZELEWY24_POS_ID || '285086_1111';
const crcKey = process.env.PRZELEWY24_CRC_KEY || '852e8a65fa8e5104';
const apiKey = process.env.PRZELEWY24_API_KEY || '1eee9dbc54f07a9f49f179c7936e5d09';
// Initialize P24 with your credentials and sandbox mode


const p24 = new P24(merchantId, posId, apiKey, crcKey, { sandbox: true });

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { amount = 1 } = body;

      const order = {
        sessionId: "youneedyourownlogictocreatesessionids",
        amount: amount * 100,
        currency: Currency.PLN,
        description: "test order",
        email: "john.doe@example.com",
        country: Country.Poland,
        language: Language.PL,
        channel: "8192",
        urlReturn: "http://localhost:3000/",
        urlStatus: "http://localhost:3000",
        timeLimit: 20,
        encoding: Encoding.UTF8,
      };

      const transactionResult = await p24.createTransaction(order);

      // Send the payment URL back to the client

      return NextResponse.json(
        { paymentUrl: transactionResult.link },

        { headers: corsHeaders }
      );
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        { error: "Internal Server Error" },
        { headers: corsHeaders }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Method Not Allowed" },
      { headers: corsHeaders }
    );
  }
}