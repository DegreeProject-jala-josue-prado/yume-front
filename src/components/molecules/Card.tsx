import React from "react";
import classNames from "classnames";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={classNames("bg-white rounded-2xl shadow p-4", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={classNames("p-2", className)}>{children}</div>;
}
