"use client";

import { useEffect } from "react";
import { IoRefreshOutline, IoHomeOutline } from "react-icons/io5";
import Container from "@/components/layout/Container";
import Button from "@/components/common/Button";
import { ROUTES } from "@/lib/constants";

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center py-16">
        <div className="mb-8">
          <div className="bg-red-600/20 p-6 rounded-full inline-block mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold mb-2">Something Went Wrong</h1>
          <p className="text-gray-400 max-w-lg mx-auto mb-6">
            Sorry, an unexpected error has occurred. Our team has been notified.
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="mb-8 max-w-xl mx-auto">
              <div className="bg-secondary/50 rounded-lg p-4 text-left overflow-auto max-h-48 text-gray-300 text-sm">
                <p className="font-mono">{error.message}</p>
                {error.stack && (
                  <pre className="mt-2 text-xs text-gray-400 overflow-x-auto">
                    {error.stack.split("\n").slice(1, 4).join("\n")}
                  </pre>
                )}
                {error.digest && (
                  <p className="mt-2 text-xs text-gray-400">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" size="lg" leftIcon={<IoRefreshOutline />}>
            Try Again
          </Button>

          <Button
            variant="primary"
            size="lg"
            href={ROUTES.HOME}
            leftIcon={<IoHomeOutline />}
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    </Container>
  );
}
