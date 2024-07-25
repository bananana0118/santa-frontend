"use client";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import React from "react";
import { useLoading } from "@/hooks/useLoading";

export default function layout({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}
