"use client"

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { confirmEmail } from "../lib/actions";  // you’ll write this
import { sendReferralEmail } from "../lib/actions";  // you’ll write this
import copy from "copy-to-clipboard";

export default function ConfirmPage() {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

 useEffect(() => {
    if (router.isReady) {
      const u = router.query.uuid as string | undefined;
      if (u) {
        setUuid(u);
        (async () => {
          try {
            const userInfo = await confirmEmail(u);   // get name + email
            setUser(userInfo);
            setConfirmed(true);
          } catch (e) {
            console.error(e);
            setError("Could not confirm your email.");
          }
        })();
      }
    }
  }, [router.isReady, router.query]);

  const handleResendReferral = async () => {
    if (!uuid) return;
    try {
      await sendReferralEmail(uuid);  // you’ll define this server call
      alert("Referral email sent!");
    } catch (e) {
      console.error(e);
      alert("Could not send referral email.");
    }
  };

  const handleCopyLink = () => {
    if (!uuid) return;
    const link = `https://yourapp.com/signup?referrer=${uuid}`;
    copy(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

 return (
    <div className="p-4">
      {confirmed ? (
        <>
          <h1>Email Confirmed!</h1>
          {user && (
            <p>
              Thanks for confirming your email, {user.name}! <br />
              We have you as <strong>{user.email}</strong>.
            </p>
          )}
          <p className="mt-2">
            Get one free month for every person who signs up and uses the app once 
          
          </p>
          <div className="mt-4">
            <button onClick={handleResendReferral} className="bg-blue-500 p-2 rounded text-white">
              Email me my referral link
            </button>
            <button onClick={handleCopyLink} className="bg-green-500 p-2 rounded text-white ml-2">
              {copied ? "Copied!" : "Copy referral signup link"}
            </button>
          </div>
        </>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>Confirming...</p>
      )}
    </div>
  );
}
