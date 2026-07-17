import { randomUUID } from "crypto";

import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";

import { getCourseBySlug } from "../../enrolment/courses";

export const runtime = "nodejs";

type CheckoutPayload = {
  sourceId?: string;
  courseCost?: string;
  courseName?: string;
  courseSlug?: string;
  studentName?: string;
  studentInfo?: string;
  dateOfBirth?: string;
  email?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  notes?: string;
  savedAt?: string;
};

type NotificationPayload = Required<CheckoutPayload> & {
  paymentId: string;
  receiptUrl: string | null;
};

function safeText(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildPlainTextEmail(data: NotificationPayload) {
  return [
    "New Square payment received",
    "",
    `Course: ${data.courseName}`,
    `Course cost: ${data.courseCost}`,
    `Course slug: ${data.courseSlug}`,
    `Payment id: ${data.paymentId}`,
    `Receipt URL: ${data.receiptUrl || "(not available)"}`,
    `Submitted at: ${data.savedAt}`,
    "",
    `Student name: ${data.studentName}`,
    `Student info: ${data.studentInfo}`,
    `Date of birth: ${data.dateOfBirth}`,
    `Email: ${data.email}`,
    `Emergency contact: ${data.emergencyContact}`,
    `Emergency phone: ${data.emergencyPhone}`,
    "",
    `Notes: ${data.notes || "(none)"}`,
  ].join("\n");
}

function buildHtmlEmail(data: NotificationPayload) {
  const rows: Array<[string, string]> = [
    ["Course", data.courseName],
    ["Course cost", data.courseCost],
    ["Course slug", data.courseSlug],
    ["Payment id", data.paymentId],
    ["Receipt URL", data.receiptUrl || "(not available)"],
    ["Submitted at", data.savedAt],
    ["Student name", data.studentName],
    ["Student info", data.studentInfo],
    ["Date of birth", data.dateOfBirth],
    ["Email", data.email],
    ["Emergency contact", data.emergencyContact],
    ["Emergency phone", data.emergencyPhone],
    ["Notes", data.notes || "(none)"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 10px;border:1px solid #d1d5db;background:#f9fafb;">${escapeHtml(label)}</th><td style="padding:8px 10px;border:1px solid #d1d5db;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;line-height:1.5;">
      <h2 style="margin:0 0 12px 0;">New checkout submission received</h2>
      <table style="border-collapse:collapse;font-size:14px;">${tableRows}</table>
    </div>
  `;
}

function getSquareEnvironment() {
  const mode = (process.env.SQUARE_ENVIRONMENT ?? "sandbox").trim().toLowerCase();

  if (mode === "production") {
    return { label: "production", value: SquareEnvironment.Production };
  }

  if (mode === "sandbox") {
    return { label: "sandbox", value: SquareEnvironment.Sandbox };
  }

  throw new Error('SQUARE_ENVIRONMENT must be set to "sandbox" or "production".');
}

function resolveSquareSecret(sandboxValue: string | undefined, productionValue: string | undefined, fallbackValue: string | undefined) {
  const environment = getSquareEnvironment();

  if (environment.label === "production") {
    return productionValue ?? fallbackValue ?? "";
  }

  return sandboxValue ?? fallbackValue ?? "";
}

function getSquareClient() {
  const accessToken = resolveSquareSecret(
    process.env.SQUARE_SANDBOX_ACCESS_TOKEN,
    process.env.SQUARE_PRODUCTION_ACCESS_TOKEN,
    process.env.SQUARE_ACCESS_TOKEN
  );

  if (!accessToken) {
    throw new Error("Set a Square access token before taking payments.");
  }

  const environment = getSquareEnvironment();

  return {
    client: new SquareClient({
      token: accessToken,
      environment: environment.value,
    }),
    environment: environment.label,
  };
}

function getSquareLocationId() {
  const locationId = resolveSquareSecret(
    process.env.SQUARE_SANDBOX_LOCATION_ID,
    process.env.SQUARE_PRODUCTION_LOCATION_ID,
    process.env.SQUARE_LOCATION_ID
  );

  if (!locationId) {
    throw new Error("Set a Square location ID before taking payments.");
  }

  return locationId;
}

function getSquareErrorMessage(error: unknown) {
  if (!error || typeof error !== "object") {
    return null;
  }

  const squareError = error as {
    statusCode?: number;
    message?: string;
    body?: { errors?: Array<{ category?: string; code?: string; detail?: string }> };
  };

  const firstError = squareError.body?.errors?.[0];

  if (squareError.statusCode === 401 || firstError?.code === "UNAUTHORIZED") {
    return {
      status: 401,
      message:
        "Square rejected the access token. Make sure SQUARE_ENVIRONMENT matches the token you set: use a sandbox token with SQUARE_ENVIRONMENT=sandbox, or a production token with SQUARE_ENVIRONMENT=production.",
    };
  }

  if (squareError.statusCode === 400 && firstError?.detail?.toLowerCase().includes("invalid location id")) {
    return {
      status: 400,
      message:
        "Square rejected the location ID. Use the location for the same environment as the token and app ID: sandbox values with sandbox, production values with production.",
    };
  }

  if (squareError.statusCode === 403) {
    return {
      status: 403,
      message:
        squareError.message ??
        "Square refused this request. Check that the token has checkout permissions and belongs to the selected environment.",
    };
  }

  return null;
}

async function sendNotificationEmail(data: NotificationPayload) {
  const officeEmail =
    process.env.OFFICE_EMAIL ??
    process.env.NEXT_PUBLIC_OFFICE_EMAIL ??
    "office@honeydrophouse.ca";
  const resendApiKey =
    process.env.RESEND_API_KEY ?? process.env.NEXT_PUBLIC_RESEND_API_KEY;

  if (!resendApiKey) {
    return { sent: false, skipped: true as const };
  }

  const fromAddress = process.env.CHECKOUT_FROM_EMAIL ?? "Honeydrop Checkout <onboarding@resend.dev>";
  const normalizedReplyTo = data.email.replaceAll("\r", "").replaceAll("\n", "").trim();

  const resendPayload: Record<string, unknown> = {
    from: fromAddress,
    to: [officeEmail],
    subject: `Checkout received: ${data.courseName} (${data.studentName})`,
    text: buildPlainTextEmail(data),
    html: buildHtmlEmail(data),
  };

  if (isValidEmail(normalizedReplyTo)) {
    resendPayload.reply_to = normalizedReplyTo;
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resendPayload),
  });

  if (!resendResponse.ok) {
    const failureText = await resendResponse.text();
    return {
      sent: false,
      skipped: false as const,
      error: failureText,
    };
  }

  return { sent: true, skipped: false as const };
}

export async function POST(request: Request) {
  let json: CheckoutPayload;

  try {
    json = (await request.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const normalized: Required<CheckoutPayload> = {
    sourceId: safeText(json.sourceId),
    courseCost: safeText(json.courseCost),
    courseName: safeText(json.courseName),
    courseSlug: safeText(json.courseSlug),
    studentName: safeText(json.studentName),
    studentInfo: safeText(json.studentInfo),
    dateOfBirth: safeText(json.dateOfBirth),
    email: safeText(json.email),
    emergencyContact: safeText(json.emergencyContact),
    emergencyPhone: safeText(json.emergencyPhone),
    notes: safeText(json.notes),
    savedAt: safeText(json.savedAt) || new Date().toISOString(),
  };

  if (
    !normalized.sourceId ||
    !normalized.courseCost ||
    !normalized.courseName ||
    !normalized.courseSlug ||
    !normalized.studentName ||
    !normalized.studentInfo ||
    !normalized.dateOfBirth ||
    !normalized.email ||
    !normalized.emergencyContact ||
    !normalized.emergencyPhone
  ) {
    return NextResponse.json(
      {
        error:
          "Missing required fields. Payment source, course, student name, student info, date of birth, email, emergency contact, and emergency phone are required.",
      },
      { status: 400 }
    );
  }

  const course = getCourseBySlug(normalized.courseSlug);

  if (!course) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }

  const squareConfig = getSquareClient();
  const squareLocationId = getSquareLocationId();

  try {
    const paymentResponse = await squareConfig.client.payments.create({
      sourceId: normalized.sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(course.priceCents),
        currency: "CAD",
      },
      autocomplete: true,
      locationId: squareLocationId,
      buyerEmailAddress: normalized.email,
      note: [
        `Honeydrop enrolment for ${course.name}`,
        `Student: ${normalized.studentName}`,
        `Student info: ${normalized.studentInfo}`,
        `Date of birth: ${normalized.dateOfBirth}`,
        `Emergency contact: ${normalized.emergencyContact}`,
        `Emergency phone: ${normalized.emergencyPhone}`,
        `Notes: ${normalized.notes || "(none)"}`,
      ].join(" | "),
    });

    const payment = paymentResponse.payment;

    if (!payment?.id) {
      return NextResponse.json(
        {
          error: "Square did not return a payment record.",
        },
        { status: 502 }
      );
    }

    if (payment.status && payment.status !== "COMPLETED") {
      return NextResponse.json(
        {
          error: `Square returned a payment with status ${payment.status}.`,
        },
        { status: 502 }
      );
    }

    const notification = await sendNotificationEmail({
      ...normalized,
      paymentId: payment.id,
      receiptUrl: payment.receiptUrl ?? null,
    });

    return NextResponse.json({
      message: `Square payment completed for ${course.name}.`,
      paymentId: payment.id,
      receiptUrl: payment.receiptUrl ?? null,
      squareEnvironment: squareConfig.environment,
      emailSent: notification.sent,
      emailSkipped: notification.skipped,
    });
  } catch (error) {
    const squareError = getSquareErrorMessage(error);

    if (squareError) {
      return NextResponse.json(
        {
          error: squareError.message,
        },
        { status: squareError.status }
      );
    }

    const message = error instanceof Error ? error.message : "Unable to create Square checkout.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 502 }
    );
  }
}
