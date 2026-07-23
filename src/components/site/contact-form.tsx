"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-primary/30 bg-secondary px-6 py-8 text-center"
      >
        <p className="font-display text-xl font-semibold">Got it.</p>
        <p className="mt-2 text-muted-foreground">
          You&apos;ll hear back within a business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="business">
            Business{" "}
            <span className="font-normal text-muted-foreground">
              (if you have one)
            </span>
          </Label>
          <Input id="business" name="business" autoComplete="organization" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-info">Email or phone</Label>
        <Input id="contact-info" name="contact" autoComplete="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">What do you need?</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="A new site, a rescue of the one you have, or just a tech question — plain words are perfect."
        />
      </div>
      {/* Honeypot — humans never see or fill this */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send it over"}
        </Button>
        <p aria-live="polite" className="text-sm text-destructive">
          {status === "error" && (
            <>
              That didn&apos;t go through. Email us instead:{" "}
              <a className="underline" href="mailto:hello@shinersolutions.com">
                hello@shinersolutions.com
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
