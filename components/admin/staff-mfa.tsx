"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { signOutStaff } from "@/app/admin/actions";

export function StaffMfa() {
  const [factors, setFactors] = useState<{ id: string; name: string }[]>([]);
  const [factorId, setFactorId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    void createClient().auth.mfa.listFactors().then(({ data, error }) => {
      if (cancelled) return;
      if (error) setError("Unable to load authenticators. Sign out and try again.");
      else {
        const verified = (data?.totp ?? []).filter((factor) => factor.status === "verified");
        setFactors(verified.map((factor) => ({ id: factor.id, name: factor.friendly_name ?? "Authenticator" })));
        setFactorId(verified[0]?.id ?? "");
      }
      setBusy(false);
    }).catch(() => {
      if (!cancelled) {
        setError("Authentication service unavailable. Please try again.");
        setBusy(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  async function enroll() {
    setBusy(true);
    setError("");
    try {
      const supabase = createClient();
      const listed = await supabase.auth.mfa.listFactors();
      if (listed.error) throw listed.error;
      // Discard incomplete setups only; never remove a verified factor.
      for (const factor of listed.data.all.filter((factor) => factor.factor_type === "totp" && factor.status === "unverified")) {
        const removed = await supabase.auth.mfa.unenroll({ factorId: factor.id });
        if (removed.error) throw removed.error;
      }
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "Library staff authenticator",
        issuer: "Sevanagala Library Portal",
      });
      if (error) throw error;
      setFactorId(data.id);
      // Keep the enrollment QR only in component memory. Never log or persist it.
      setQrCode(data.totp.qr_code.startsWith("data:image/svg+xml")
        ? data.totp.qr_code
        : `data:image/svg+xml;charset=utf-8,${encodeURIComponent(data.totp.qr_code)}`);
    } catch {
      setError("Authenticator setup failed. Sign out and retry, or contact the authorised project owner.");
    } finally {
      setBusy(false);
    }
  }

  async function verify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[0-9]{6}$/.test(code) || !factorId) return;
    setBusy(true);
    setError("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code });
      if (error) throw error;
      const verified = await supabase.auth.getClaims();
      if (verified.error || verified.data?.claims.aal !== "aal2") throw new Error("MFA required");
      setQrCode("");
      setCode("");
      // Full navigation ensures server components see the refreshed Auth cookies.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/admin");
    } catch {
      setCode("");
      setError("The code could not be verified. Use a fresh code and try again.");
      setBusy(false);
    }
  }

  return (
    <>
      {error ? <p className="staff-auth-error" role="alert">{error}</p> : null}
      {busy ? <p role="status">Contacting authentication service…</p> : null}
      {!factorId ? (
        <button className="button-primary" type="button" disabled={busy || Boolean(error)} onClick={enroll}>
          Set up authenticator
        </button>
      ) : (
        <form className="staff-auth-form" onSubmit={verify}>
          {qrCode ? (
            <div>
              <p>Scan this code privately with your authenticator app. Do not share or screenshot it.</p>
              {/* Supabase enrollment QR must remain local, not pass through image optimization. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrCode} alt="Private authenticator enrollment QR code" width={240} height={240} />
            </div>
          ) : factors.length > 1 ? (
            <label>
              <span>Authenticator</span>
              <select value={factorId} onChange={(event) => setFactorId(event.target.value)} disabled={busy}>
                {factors.map((factor) => <option key={factor.id} value={factor.id}>{factor.name}</option>)}
              </select>
            </label>
          ) : null}
          <label>
            <span>Six-digit authenticator code</span>
            <input autoComplete="one-time-code" inputMode="numeric" pattern="[0-9]{6}"
              maxLength={6} required value={code} disabled={busy}
              onChange={(event) => setCode(event.target.value.replace(/[^0-9]/g, ""))} />
          </label>
          <button className="button-primary" type="submit" disabled={busy}>Verify and continue</button>
        </form>
      )}
      <form action={signOutStaff}>
        <button className="button-quiet staff-auth-back" type="submit">Sign out</button>
      </form>
      <p className="muted">Lost your authenticator? Contact the authorised project owner for identity-verified recovery. There is no public MFA bypass.</p>
    </>
  );
}
