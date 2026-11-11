type AlertBannerProps = {
  variant: "success" | "error";
  message: string;
};

const styles = {
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  error: "border-red-500/30 bg-red-500/10 text-red-300",
} as const;

export default function AlertBanner({ variant, message }: AlertBannerProps) {
  return (
    <div
      className={`mb-5 rounded-xl border px-4 py-3 text-sm ${styles[variant]}`}
      role={variant === "error" ? "alert" : "status"}
    >
      {message}
    </div>
  );
}
