"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

function Loggedinscreen({ }) {
  const router = useRouter();
  const [loggedintime, setloggedintime] = useState("Loading...");
  const [autologouttime, setautologouttime] = useState("Loading...");
  const [currentsystemtiming, setcurrentsystemtiming] = useState("Loading...");
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const response = await fetch("https://ad-api-backend.vercel.app/frontendfetch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const result = await response.json();

        if (response.status === 200) {
          setIsAuthenticated(true);
          setloggedintime(new Date(result.ttl * 1000).toLocaleString());
          setautologouttime(new Date(result.exp * 1000).toLocaleString());
        } else {
          setIsAuthenticated(false);
          router.push("/");
        }
      } catch (err) {
        console.error("Exception occurred or the Token Timed Out");
        setIsAuthenticated(false);
        router.push("/");
      }
    };

    handleSubmit();
  }, [router]);

  // ✅ Set system time only inside useEffect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
      });
      setcurrentsystemtiming(now);
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Welcome User!</p>
      <p>Logged in At: {loggedintime}</p>
      <p>Auto-log Out At: {autologouttime}</p>
      <p>System Timing: {currentsystemtiming}</p>
    </div>
  );
}

export default Loggedinscreen;
