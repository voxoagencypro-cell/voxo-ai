import { NextResponse } from "next/server";
import Retell from "retell-sdk";

const retell = new Retell({
  apiKey: process.env.RETELL_API_KEY,
});

export async function POST() {
  try {
    const agentId = process.env.NEXT_PUBLIC_RETELL_AGENT_ID;

    if (!agentId) {
      return NextResponse.json(
        { error: "Agent ID manquant" },
        { status: 500 }
      );
    }

    const webCall = await retell.call.createWebCall({
      agent_id: agentId,
    });

    return NextResponse.json({
      access_token: webCall.access_token,
    });
  } catch (error) {
    console.error("Erreur Retell :", error);

    return NextResponse.json(
      { error: "Impossible de créer l’appel Retell" },
      { status: 500 }
    );
  }
}