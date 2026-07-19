import { NextResponse } from "next/server";

type CheckoutPayload = {
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

function buildPlainTextEmail(data: Required<CheckoutPayload>) {
  return [
    "New checkout submission received",
    "",
    `Course: ${data.courseName}`,
    `Course slug: ${data.courseSlug}`,
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

function buildHtmlEmail(data: Required<CheckoutPayload>) {
  const rows: Array<[string, string]> = [
    ["Course", data.courseName],
    ["Course slug", data.courseSlug],
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
        `<tr><th align=\"left\" style=\"padding:8px 10px;border:1px solid #d1d5db;background:#f9fafb;\">${escapeHtml(label)}</th><td style=\"padding:8px 10px;border:1px solid #d1d5db;\">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;line-height:1.5;">
      <h2 style="margin:0 0 12px 0;">New checkout submission received</h2>
      <table style="border-collapse:collapse;font-size:14px;">${tableRows}</table>
    </div>
  `;
}

export async function POST(request: Request) {
  const officeEmail =
    process.env.OFFICE_EMAIL ??
    process.env.NEXT_PUBLIC_OFFICE_EMAIL ??
    "honeydrop.house@gmail.com";
  const resendApiKey =
    process.env.RESEND_API_KEY ?? process.env.NEXT_PUBLIC_RESEND_API_KEY;

  if (!resendApiKey) {
    return NextResponse.json(
      {
        error:
          "Checkout was saved, but email sending is not configured yet. Set RESEND_API_KEY in frontend/.env.local and restart the dev server.",
      },
      { status: 500 }
    );
  }

  let json: CheckoutPayload;

  try {
    json = (await request.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const normalized: Required<CheckoutPayload> = {
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
    !normalized.courseName ||
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
          "Missing required fields. Course, student name, student info, date of birth, email, emergency contact, and emergency phone are required.",
      },
      { status: 400 }
    );
  }

  const fromAddress = process.env.CHECKOUT_FROM_EMAIL ?? "Honeydrop Checkout <onboarding@resend.dev>";

  const normalizedReplyTo = normalized.email
    .replaceAll("\r", "")
    .replaceAll("\n", "")
    .trim();

  const resendPayload: Record<string, unknown> = {
    from: fromAddress,
    to: [officeEmail],
    subject: `Checkout received: ${normalized.courseName} (${normalized.studentName})`,
    text: buildPlainTextEmail(normalized),
    html: buildHtmlEmail(normalized),
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
    const failureMessage = failureText.toLowerCase();

    if (resendResponse.status === 403 && failureMessage.includes("verify a domain")) {
      return NextResponse.json(
        {
          error:
            "Resend blocked this message because the From address is not using a verified domain. Verify a domain in Resend, set CHECKOUT_FROM_EMAIL to an email on that domain, then restart the dev server.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        error: `Checkout was saved, but email sending failed. ${failureText}`,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    message: `Checkout received and emailed to ${officeEmail}.`,
  });
}
