interface TabOption {
    id: string;
    label: string;
    title: string;
    clip: string;
  }

export const tabs: TabOption[] = [
    {
      id: "market-prediction",
      label: "Market Prediction",
      title:
        "Use AI insights for smarter business decisions and stay competitive.",
      clip: "/clips/market-prediction.mp4",
    },
    {
      id: "finance",
      label: "Finance",
      title: "Our AI models analyze financial data for confident investments.",
      clip: "/clips/finance.mp4",
    },
    {
      id: "analytics",
      label: "Analytics",
      title:
        "Transform data into insights with AI analytics that enhance decisions.",
      clip: "/clips/data-analytics.mp4",
    },
    {
      id: "content-generation",
      label: "Content Generation",
      title: "Create engaging content at scale with AI assistance.",
      clip: "/clips/content.mp4",
    },
    {
      id: "customer-support",
      label: "Customer Support",
      title: "Enhance customer experience with AI-powered support.",
      clip: "/clips/customer-support.mp4",
    },
  ];