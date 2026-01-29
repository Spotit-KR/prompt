"use client";

import React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";

interface WaitlistFormProps {
  source?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  size?: "default" | "large";
  onCountUpdate?: (count: number) => void;
  waitlistCount?: number | null;
}

export function WaitlistForm({
  source = "landing",
  className = "",
  inputClassName = "",
  buttonClassName = "",
  size = "default",
  onCountUpdate,
  waitlistCount,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage("이메일을 입력해주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("올바른 이메일 형식이 아닙니다.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: 1,
          email,
          channel: source,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setMessage(
          "사전 예약이 완료되었습니다! 출시 소식을 가장 먼저 알려드릴게요.",
        );
        setEmail("");

        // 등록 후 최신 카운트 조회
        const countResponse = await fetch(
          `${apiUrl}/api/projects/1/waiting-count`,
        );
        const countData = await countResponse.json();
        if (countData.waitingCount !== undefined && onCountUpdate) {
          onCountUpdate(countData.waitingCount);
        }
      } else {
        setStatus("error");
        setMessage(data.message || "등록 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const inputHeight = size === "large" ? "h-14" : "h-12";
  const buttonPadding = size === "large" ? "px-8" : "px-6";

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error" || status === "success") {
              setStatus("idle");
              setMessage("");
            }
          }}
          placeholder="이메일을 입력하세요"
          disabled={status === "loading"}
          className={`flex-1 ${inputHeight} px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${inputClassName}`}
        />
        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className={`${buttonPadding} ${inputHeight} text-base whitespace-nowrap transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground ${buttonClassName}`}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              등록 중...
            </>
          ) : (
            <>
              사전 예약
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>

      {/* Status Message */}
      {message && (
        <div
          className={`mt-3 flex items-start gap-2 text-sm ${
            status === "success" ? "text-green-500" : "text-red-500"
          } animate-fade-in`}
        >
          {status === "success" ? (
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          )}
          <span>{message}</span>
        </div>
      )}

      {/* Waitlist Count */}
      {/* {status !== "success" && waitlistCount !== null && waitlistCount > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          현재{" "}
          <span className="text-primary font-semibold">{waitlistCount}명</span>
          이 대기 중입니다.
        </p>
      )} */}
    </div>
  );
}
