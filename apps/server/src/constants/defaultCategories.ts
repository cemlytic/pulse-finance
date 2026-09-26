export interface DefaultCategoryItem {
  name: string;
  icon: string;
  colorHex: string;
  isDefault: boolean;
}

export const DEFAULT_CATEGORIES: DefaultCategoryItem[] = [
  {
    name: "Food & Dining",
    icon: "utensils",
    colorHex: "#F59E0B",
    isDefault: true,
  },
  {
    name: "Groceries",
    icon: "shopping-cart",
    colorHex: "#10B981",
    isDefault: true,
  },
  {
    name: "Transportation & Fuel",
    icon: "car",
    colorHex: "#3B82F6",
    isDefault: true,
  },
  {
    name: "Bills & Subscriptions",
    icon: "receipt",
    colorHex: "#8B5CF6",
    isDefault: true,
  },
  {
    name: "Entertainment & Social",
    icon: "film",
    colorHex: "#EC4899",
    isDefault: true,
  },
  {
    name: "Salary & Income",
    icon: "wallet",
    colorHex: "#22C55E",
    isDefault: true,
  },
  { name: "Other", icon: "tag", colorHex: "#6B7280", isDefault: true },
];
