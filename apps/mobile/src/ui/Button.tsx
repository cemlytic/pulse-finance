import { ActivityIndicator, Pressable, Text } from "react-native";
import type { ReactNode } from "react";

interface ButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "social" | "danger";
  icon?: ReactNode;
}

const VARIANTS: Record<
  NonNullable<ButtonProps["variant"]>,
  { container: string; text: string; spinner: string; radius: string }
> = {
  primary: {
    container: "bg-brand-600 active:bg-brand-700",
    text: "text-white",
    spinner: "#ffffff",
    radius: "rounded-2xl",
  },
  secondary: {
    container: "bg-surface-100 border border-surface-border",
    text: "text-text-primary",
    spinner: "#f5f6fa",
    radius: "rounded-2xl",
  },
  social: {
    container: "bg-white border border-surface-border",
    text: "text-neutral-900",
    spinner: "#111111",
    radius: "rounded-full",
  },
  danger: {
    container: "bg-expense-600 active:bg-expense-700",
    text: "text-white",
    spinner: "#ffffff",
    radius: "rounded-2xl",
  },
};

export function Button({
  label,
  onPress,
  loading,
  disabled,
  variant = "primary",
  icon,
}: ButtonProps) {
  const styles = VARIANTS[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`w-full flex-row items-center justify-center gap-3 px-5 py-4 ${styles.container} ${styles.radius} ${
        disabled || loading ? "opacity-60" : ""
      }`}
    >
      {loading ? (
        <ActivityIndicator color={styles.spinner} />
      ) : (
        <>
          {icon}
          <Text className={`text-base font-semibold ${styles.text}`}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
