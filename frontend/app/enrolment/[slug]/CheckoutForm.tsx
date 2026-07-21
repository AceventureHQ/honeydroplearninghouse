"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

type SquareEnvironment = "sandbox" | "production";

type SquareTokenizeResult = {
  status: string;
  token?: string;
  errors?: Array<{
    message?: string;
    detail?: string;
  }>;
};

type SquareCard = {
  attach(target: string): Promise<void> | void;
  tokenize(): Promise<SquareTokenizeResult>;
  destroy?: () => void;
};

type SquarePayments = {
  card(): Promise<SquareCard>;
};

declare global {
  interface Window {
    Square?: {
      payments(appId: string, locationId: string): Promise<SquarePayments>;
    };
  }
}

type CheckoutFormProps = {
  courseName: string;
  courseSlug: string;
  courseCost: string;
};

type CheckoutFormData = {
  studentName: string;
  studentInfo: string;
  dateOfBirth: string;
  email: string;
  emergencyContact: string;
  emergencyPhone: string;
  notes: string;
};

type CheckoutFormErrors = Partial<Record<keyof CheckoutFormData, string>>;

function getSquareEnvironment(): SquareEnvironment {
  const environment = (process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT ?? "sandbox")
    .trim()
    .toLowerCase();

  return environment === "production" ? "production" : "sandbox";
}

function resolveSquareValue(
  environment: SquareEnvironment,
  sandboxValue: string | undefined,
  productionValue: string | undefined,
  fallbackValue: string | undefined,
) {
  if (environment === "production") {
    return productionValue ?? fallbackValue ?? "";
  }

  return sandboxValue ?? fallbackValue ?? "";
}

function getSquareScriptUrl(environment: SquareEnvironment) {
  return environment === "production"
    ? "https://web.squarecdn.com/v1/square.js"
    : "https://sandbox.web.squarecdn.com/v1/square.js";
}

function loadSquareScript(scriptUrl: string) {
  return new Promise<void>((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("Square payments can only load in the browser."));
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${scriptUrl}"]`,
    );

    if (existingScript) {
      if (window.Square) {
        resolve();
        return;
      }

      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Unable to load Square.")),
        {
          once: true,
        },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unable to load Square."));
    document.head.appendChild(script);
  });
}

function getSquareErrorMessage(
  errors?: Array<{ message?: string; detail?: string }>,
) {
  if (!errors || errors.length === 0) {
    return "Square could not tokenize the card. Check the card details and try again.";
  }

  return errors
    .map(
      (error) =>
        error.detail ?? error.message ?? "Square could not tokenize the card.",
    )
    .join(" ");
}

const initialFormData: CheckoutFormData = {
  studentName: "",
  studentInfo: "",
  dateOfBirth: "",
  email: "",
  emergencyContact: "",
  emergencyPhone: "",
  notes: "",
};

const fields: Array<{
  label: string;
  type: string;
  name: keyof CheckoutFormData;
  placeholder: string;
}> = [
  {
    label: "Student name",
    type: "text",
    name: "studentName",
    placeholder: "Student full name",
  },
  {
    label: "Student info",
    type: "text",
    name: "studentInfo",
    placeholder: "Grade, age, or learning context",
  },
  {
    label: "Date of birth",
    type: "date",
    name: "dateOfBirth",
    placeholder: "",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Parent or learner email",
  },
  {
    label: "Emergency contact",
    type: "text",
    name: "emergencyContact",
    placeholder: "Name and relationship",
  },
  {
    label: "Emergency phone",
    type: "tel",
    name: "emergencyPhone",
    placeholder: "Phone number",
  },
];

export default function CheckoutForm({
  courseName,
  courseSlug,
  courseCost,
}: CheckoutFormProps) {
  const storageKey = `honeydrop-enrolment-${courseSlug}`;
  const squareEnvironment = getSquareEnvironment();
  const squareAppId = resolveSquareValue(
    squareEnvironment,
    process.env.NEXT_PUBLIC_SQUARE_SANDBOX_APP_ID,
    process.env.NEXT_PUBLIC_SQUARE_PRODUCTION_APP_ID,
    process.env.NEXT_PUBLIC_SQUARE_APP_ID,
  );
  const squareLocationId = resolveSquareValue(
    squareEnvironment,
    process.env.NEXT_PUBLIC_SQUARE_SANDBOX_LOCATION_ID,
    process.env.NEXT_PUBLIC_SQUARE_PRODUCTION_LOCATION_ID,
    process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
  );
  const squareScriptUrl = getSquareScriptUrl(squareEnvironment);

  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [paymentReceiptUrl, setPaymentReceiptUrl] = useState<string | null>(
    null,
  );
  const [squareReady, setSquareReady] = useState(false);
  const [squareStatus, setSquareStatus] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<CheckoutFormErrors>({});
  const cardContainerId = "square-card-container";
  const cardRef = useRef<SquareCard | null>(null);

  const validateForm = () => {
    const errors: CheckoutFormErrors = {};

    if (!formData.studentName.trim()) {
      errors.studentName = "Student name is required.";
    }

    if (!formData.studentInfo.trim()) {
      errors.studentInfo = "Student info is required.";
    }

    if (!formData.dateOfBirth.trim()) {
      errors.dateOfBirth = "Date of birth is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (!formData.emergencyContact.trim()) {
      errors.emergencyContact = "Emergency contact is required.";
    }

    if (!formData.emergencyPhone.trim()) {
      errors.emergencyPhone = "Emergency phone is required.";
    }

    return errors;
  };

  useEffect(() => {
    let isActive = true;

    async function initializeSquareCard() {
      if (!squareAppId || !squareLocationId) {
        setSquareStatus(null);
        setSquareReady(false);
        setSubmitError(
          "Set NEXT_PUBLIC_SQUARE_APP_ID and NEXT_PUBLIC_SQUARE_LOCATION_ID for the selected environment.",
        );
        return;
      }

      try {
        setSquareStatus("Loading secure Square card...");
        await loadSquareScript(squareScriptUrl);

        if (!isActive || !window.Square) {
          return;
        }

        const payments = await window.Square.payments(
          squareAppId,
          squareLocationId,
        );
        const card = await payments.card();

        if (!isActive) {
          card.destroy?.();
          return;
        }

        await card.attach(`#${cardContainerId}`);
        cardRef.current = card;
        setSquareReady(true);
        setSquareStatus("Secure card ready.");
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to initialize Square.";
        setSquareReady(false);
        setSquareStatus(null);
        setSubmitError(message);
      }
    }

    void initializeSquareCard();

    return () => {
      isActive = false;
      cardRef.current?.destroy?.();
      cardRef.current = null;
    };
  }, [squareAppId, squareLocationId, squareScriptUrl]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitError("Please fix the highlighted fields before submitting.");
      return;
    }

    if (!squareReady || !cardRef.current) {
      setSubmitError("Square card is still loading. Try again in a moment.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitMessage(null);
    setPaymentReceiptUrl(null);

    const payload = {
      ...formData,
      courseName,
      courseSlug,
      courseCost,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(storageKey, JSON.stringify(payload));
    try {
      const tokenResult = await cardRef.current.tokenize();

      if (tokenResult.status !== "OK" || !tokenResult.token) {
        throw new Error(getSquareErrorMessage(tokenResult.errors));
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          sourceId: tokenResult.token,
        }),
      });

      const responseText = await response.text();
      let result: {
        message?: string;
        error?: string;
        paymentId?: string;
        receiptUrl?: string | null;
      } = {};

      if (responseText) {
        try {
          result = JSON.parse(responseText) as typeof result;
        } catch {
          result = { error: responseText };
        }
      }

      if (!response.ok) {
        throw new Error(
          result.error ??
            response.statusText ??
            "Unable to send checkout notification right now.",
        );
      }

      setPaymentReceiptUrl(result.receiptUrl ?? null);
      setSubmitMessage(result.message ?? "Payment completed successfully.");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to send checkout notification right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <label key={field.name} className="block">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {field.label}
          </span>
          <input
            type={field.type}
            name={field.name}
            required={field.name !== "notes"}
            value={formData[field.name]}
            onChange={(event) => {
              const value = event.target.value;
              setFormData((current) => ({
                ...current,
                [field.name]: value,
              }));

              setFieldErrors((current) => ({
                ...current,
                [field.name]: undefined,
              }));
            }}
            placeholder={field.placeholder}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white"
          />
          {fieldErrors[field.name] ? (
            <p className="mt-2 text-xs font-medium text-rose-700">
              {fieldErrors[field.name]}
            </p>
          ) : null}
        </label>
      ))}

      <label className="block">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Additional notes / accommodations / IEP
        </span>
        <textarea
          name="notes"
          rows={5}
          value={formData.notes}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              notes: event.target.value,
            }))
          }
          placeholder="Anything we should know to support the learner well"
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white"
        />
      </label>

      <div className="rounded-[1.4rem] border border-slate-200/80 bg-white p-3 text-sm leading-7 text-slate-700 shadow-sm sm:p-4">
        <div className="mb-2 flex items-center justify-between gap-3 sm:mb-3">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Payment Details
          </span>
          {/* <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-amber-800/80">
            {squareEnvironment}
          </span> */}
        </div>
        <div
          id={cardContainerId}
          className="min-h-[120px] rounded-2xl border border-slate-200 bg-slate-50 p-2.5 sm:p-3"
        />
        {!squareReady ? (
          <p className="mt-3 text-xs font-medium text-slate-500">
            {squareStatus ?? "Loading secure payment fields..."}
          </p>
        ) : (
          <p className="mt-3 text-xs font-medium text-emerald-700">
            {squareStatus}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !squareReady}
        className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-slate-800"
      >
        {isSubmitting ? "Processing..." : "Pay with Square"}
      </button>

      {/* {savedAt ? (
        <div className="rounded-[1.4rem] border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-900">
          Enrolment details saved. Last updated {new Date(savedAt).toLocaleString()}.
        </div>
      ) : null} */}

      {submitMessage ? (
        <div className="rounded-[1.4rem] border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-900">
          {submitMessage}
          {paymentReceiptUrl ? (
            <div className="mt-2">
              <a
                href={paymentReceiptUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                View Square receipt
              </a>
            </div>
          ) : null}
        </div>
      ) : null}

      {submitError ? (
        <div className="rounded-[1.4rem] border border-rose-200 bg-rose-50 p-4 text-sm leading-7 text-rose-900">
          {submitError}
        </div>
      ) : null}

      <div className="rounded-[1.4rem] border border-slate-200/80 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
        Payment is completed in the browser through Square. Enter the card
        details below, then submit the form to charge the card securely.
      </div>

      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
      >
        Questions? Contact Office
      </Link>
    </form>
  );
}
