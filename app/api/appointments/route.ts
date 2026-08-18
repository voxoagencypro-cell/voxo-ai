import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      company_id,
      caller_name,
      phone,
      email,
      service,
      message,
      appointment_date,
      appointment_time,
      start_at,
      end_at,
      status,
      source,
      employee_name,
    } = body;

    if (!caller_name || !service) {
      return NextResponse.json(
        { error: "Le nom et le service sont obligatoires." },
        { status: 400 }
      );
    }

    /*
     * 1. Chercher le client existant
     */
    let client = null;

    if (phone) {
      const { data: existingClient } = await supabaseAdmin
        .from("clients")
        .select("id, full_name, phone, email")
        .eq("phone", phone)
        .maybeSingle();

      client = existingClient;
    }

    /*
     * 2. Créer le client s'il n'existe pas
     */
    if (!client) {
      const { data: newClient, error: clientError } = await supabaseAdmin
        .from("clients")
        .insert({
          company_id: company_id || null,
          full_name: caller_name,
          phone: phone || null,
          email: email || null,
        })
        .select("id, full_name, phone, email")
        .single();

      if (clientError) {
        console.error("Erreur création client :", clientError);

        return NextResponse.json(
          { error: "Impossible d'enregistrer le client." },
          { status: 500 }
        );
      }

      client = newClient;
    }

    /*
     * 3. Construire les dates du rendez-vous
     */
    let appointmentStart = start_at || null;
    let appointmentEnd = end_at || null;

    if (!appointmentStart && appointment_date && appointment_time) {
      appointmentStart = `${appointment_date}T${appointment_time}`;
    }

    if (appointmentStart && !appointmentEnd) {
      const startDate = new Date(appointmentStart);

      if (!Number.isNaN(startDate.getTime())) {
        appointmentEnd = new Date(
          startDate.getTime() + 60 * 60 * 1000
        ).toISOString();
      }
    }

    /*
     * 4. Créer le rendez-vous
     */
    const { data: appointment, error: appointmentError } =
      await supabaseAdmin
        .from("appointments")
        .insert({
          company_id: company_id || null,
          client_id: client.id,
          service_name: service,
          employee_name: employee_name || null,
          notes: message || null,
          start_at: appointmentStart,
          end_at: appointmentEnd,
          status: status || "scheduled",
          source: source || "simulation",
        })
        .select()
        .single();

    if (appointmentError) {
      console.error("Erreur création rendez-vous :", appointmentError);

      return NextResponse.json(
        { error: "Impossible d'enregistrer le rendez-vous." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        appointment,
        client,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur API appointments :", error);

    return NextResponse.json(
      { error: "Requête invalide." },
      { status: 500 }
    );
  }
}