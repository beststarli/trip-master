export interface Feature {
    id: string;
    name: string;
    description: string;
    type: "DOUBLE" | "LONG" | "STRING" | "BOOLEAN";
    category: string;
    status: "online" | "offline" | "testing";
    riskLevel: "low" | "medium" | "high";
    isShared: boolean;
    creator: string;
    updater: string;
    createdAt: string;
    defaultValue: string;
    remark: string;
}

export const FEATURE_CATEGORIES = [
    "User Profile",
    "Transaction",
    "Risk Control",
    "Marketing",
    "Recommendation",
];

export const FEATURE_TYPES = ["DOUBLE", "LONG", "STRING", "BOOLEAN"] as const;

export const INITIAL_FEATURES: Feature[] = [
    {
        id: "1",
        name: "user_age",
        description: "User age feature",
        type: "LONG",
        category: "User Profile",
        status: "online",
        riskLevel: "low",
        isShared: false,
        creator: "admin",
        updater: "admin",
        createdAt: "2023-03-23 15:55:39",
        defaultValue: "0",
        remark: "Extracted from user registration data",
    },
    {
        id: "2",
        name: "order_amount",
        description: "Order amount feature",
        type: "DOUBLE",
        category: "Transaction",
        status: "online",
        riskLevel: "medium",
        isShared: true,
        creator: "editor",
        updater: "admin",
        createdAt: "2023-03-23 15:27:29",
        defaultValue: "0.0",
        remark: "Total order amount in last 30 days",
    },
    {
        id: "3",
        name: "risk_score",
        description: "User risk score",
        type: "DOUBLE",
        category: "Risk Control",
        status: "testing",
        riskLevel: "high",
        isShared: false,
        creator: "admin",
        updater: "editor",
        createdAt: "2023-03-23 12:28:22",
        defaultValue: "0.5",
        remark: "Composite risk score calculated from multiple features",
    },
    {
        id: "4",
        name: "is_vip",
        description: "VIP user flag",
        type: "BOOLEAN",
        category: "User Profile",
        status: "online",
        riskLevel: "low",
        isShared: true,
        creator: "admin",
        updater: "admin",
        createdAt: "2023-03-22 10:15:00",
        defaultValue: "false",
        remark: "Whether the user is a VIP member",
    },
    {
        id: "5",
        name: "login_count",
        description: "Login count in 7 days",
        type: "LONG",
        category: "User Profile",
        status: "online",
        riskLevel: "low",
        isShared: false,
        creator: "editor",
        updater: "editor",
        createdAt: "2023-03-21 09:30:00",
        defaultValue: "0",
        remark: "Number of logins in the past 7 days",
    },
    {
        id: "6",
        name: "coupon_usage",
        description: "Coupon usage rate",
        type: "DOUBLE",
        category: "Marketing",
        status: "offline",
        riskLevel: "low",
        isShared: true,
        creator: "admin",
        updater: "admin",
        createdAt: "2023-03-20 14:20:00",
        defaultValue: "0.0",
        remark: "Coupon redemption rate for the user",
    },
    {
        id: "7",
        name: "recommend_score",
        description: "Recommendation relevance",
        type: "DOUBLE",
        category: "Recommendation",
        status: "testing",
        riskLevel: "medium",
        isShared: false,
        creator: "editor",
        updater: "admin",
        createdAt: "2023-03-19 16:45:00",
        defaultValue: "0.0",
        remark: "ML model output score for content recommendation",
    },
    {
        id: "8",
        name: "device_type",
        description: "User device type",
        type: "STRING",
        category: "User Profile",
        status: "online",
        riskLevel: "low",
        isShared: true,
        creator: "admin",
        updater: "editor",
        createdAt: "2023-03-18 11:10:00",
        defaultValue: "unknown",
        remark: "Type of device used: mobile, desktop, tablet",
    },
];
