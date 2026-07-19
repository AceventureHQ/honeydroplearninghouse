"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type CheckoutFormProps = {
  courseName: string;
  courseSlug: string;
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

const officeEmail = process.env.NEXT_PUBLIC_OFFICE_EMAIL ?? "office@honeydrophouse.ca";

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
  { label: "Student name", type: "text", name: "studentName", placeholder: "Student full name" },
  { label: "Student info", type: "text", name: "studentInfo", placeholder: "Grade, age, or learning context" },
  { label: "Date of birth", type: "date", name: "dateOfBirth", placeholder: "" },
  { label: "Email", type: "email", name: "email", placeholder: "Parent or learner email" },
  { label: "Emergency contact", type: "text", name: "emergencyContact", placeholder: "Name and relationship" },
  { label: "Emergency phone", type: "tel", name: "emergencyPhone", placeholder: "Phone number" },
];

export default function CheckoutForm({ courseName, courseSlug }: CheckoutFormProps) {
  const storageKey = `honeydrop-enrolment-${courseSlug}`;
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<CheckoutFormErrors>({});

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitError("Please fix the highlighted fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitMessage(null);

    const payload = {
      ...formData,
      courseName,
      courseSlug,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(storageKey, JSON.stringify(payload));
    setSavedAt(payload.savedAt);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to send checkout notification right now.");
      }

      setSubmitMessage(result.message ?? "Checkout received and emailed to the office.");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to send checkout notification right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
            <p className="mt-2 text-xs font-medium text-rose-700">{fieldErrors[field.name]}</p>
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-slate-800"
      >
        {isSubmitting ? "Sending..." : "Submit Checkout"}
      </button>

      {savedAt ? (
        <div className="rounded-[1.4rem] border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-900">
          Enrolment details saved. Last updated {new Date(savedAt).toLocaleString()}.
        </div>
      ) : null}

      {submitMessage ? (
        <div className="rounded-[1.4rem] border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-900">
          {submitMessage}
        </div>
      ) : null}

      {submitError ? (
        <div className="rounded-[1.4rem] border border-rose-200 bg-rose-50 p-4 text-sm leading-7 text-rose-900">
          {submitError}
        </div>
      ) : null}

      <div className="rounded-[1.4rem] border border-slate-200/80 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
        Payment options: e-transfer to
        {" "}
        {/* <a href={`mailto:${officeEmail}`} className="font-semibold text-slate-900 underline underline-offset-2">
          {officeEmail}
        </a> */}
        <a href={`mailto:honeydrop.house@gmail.com`} className="font-semibold text-slate-900 underline underline-offset-2">
          honeydrop.house@gmail.com
        </a>
        {" with a note of the course and student name, "}
        or pay in person at the office.
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
