export type NeedStatus =
  | "Seeking Support"
  | "Partially Supported"
  | "Fully Pledged"
  | "Received"
  | "Completed";

export type Need = {
  id: string;
  title: string;
  category: string;
  purpose: string;
  target: number;
  pledged: number;
  received: number;
  unit: string;
  status: NeedStatus;
  priority: "High" | "Medium" | "Low";
  lastVerified: string;
};

export const sampleNeeds: Need[] = [
  {
    id: "sample-books",
    title: "Updated English & STEM Books",
    category: "Books",
    purpose:
      "Sample requirement for student reference, English learning, and future-ready STEM resources.",
    target: 150,
    pledged: 0,
    received: 0,
    unit: "books",
    status: "Seeking Support",
    priority: "High",
    lastVerified: "Prototype sample",
  },
  {
    id: "sample-computers",
    title: "Digital Learning Computers",
    category: "Technology",
    purpose:
      "Sample requirement for research, digital literacy, and future public-computer access.",
    target: 10,
    pledged: 3,
    received: 0,
    unit: "computers",
    status: "Partially Supported",
    priority: "High",
    lastVerified: "Prototype sample",
  },
  {
    id: "sample-seating",
    title: "Study Tables & Chairs",
    category: "Furniture",
    purpose:
      "Sample requirement to improve comfortable study space for readers and students.",
    target: 24,
    pledged: 0,
    received: 0,
    unit: "seats",
    status: "Seeking Support",
    priority: "Medium",
    lastVerified: "Prototype sample",
  },
];

export const sampleProjects = [
  {
    title: "Book Collection Renewal",
    summary:
      "A phased sample project for identifying gaps, replacing important outdated resources, and adding high-demand books.",
    status: "Planning",
  },
  {
    title: "Digital Learning Corner",
    summary:
      "A sample smart-library project combining computers, connectivity, furniture, and digital-learning access.",
    status: "Planning",
  },
  {
    title: "Library Space Improvement",
    summary:
      "A sample project for shelving, seating, lighting, ventilation, and reader comfort.",
    status: "Discovery",
  },
];
