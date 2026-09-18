export const adminNeeds = [
  { title: "Updated English & STEM Books", category: "Books", priority: "High", status: "Seeking Support", target: "150 books", remaining: "150", verified: "Prototype sample" },
  { title: "Digital Learning Computers", category: "Technology", priority: "High", status: "Partially Supported", target: "10 computers", remaining: "7", verified: "Prototype sample" },
  { title: "Study Tables & Chairs", category: "Furniture", priority: "Medium", status: "Seeking Support", target: "24 seats", remaining: "24", verified: "Prototype sample" },
];

export const adminProjects = [
  { title: "Book Collection Renewal", status: "Planning", needs: 4, milestone: "Gap analysis", owner: "Library team" },
  { title: "Digital Learning Corner", status: "Seeking Support", needs: 5, milestone: "Equipment package", owner: "Library team" },
  { title: "Library Space Improvement", status: "Discovery", needs: 3, milestone: "Facility review", owner: "Library team" },
];

export const adminPledges = [
  { supporter: "Sample Education Foundation", need: "Digital Learning Computers", quantity: "3 computers", status: "Accepted", expected: "Oct 2026" },
  { supporter: "Sample Book Network", need: "Updated English & STEM Books", quantity: "40 books", status: "Under Review", expected: "Pending" },
  { supporter: "Sample Community Group", need: "Study Tables & Chairs", quantity: "8 seats", status: "Proposed", expected: "Nov 2026" },
];

export const adminDonations = [
  { supporter: "Sample Technology Partner", contribution: "Computer equipment", received: "3", verified: "0", status: "Under Verification", date: "Sample date" },
  { supporter: "Sample Book Partner", contribution: "English reference books", received: "25", verified: "25", status: "Verified", date: "Sample date" },
  { supporter: "Sample Community Partner", contribution: "Reading furniture", received: "6", verified: "6", status: "Allocated", date: "Sample date" },
];

export const adminPartners = [
  { name: "Sample Education Foundation", type: "Foundation", country: "International sample", recognition: "Approved sample", status: "Active" },
  { name: "Sample Technology Partner", type: "Technology", country: "International sample", recognition: "Pending", status: "Active" },
  { name: "Sample Community Group", type: "Community", country: "Sri Lanka sample", recognition: "Private", status: "Prospect" },
];

export const adminBooks = [
  { title: "Sample Biology Reference", author: "Sample Author", classCode: "570", language: "English", copies: 2, condition: "Good", review: "Current" },
  { title: "Sample Computer Fundamentals", author: "Sample Author", classCode: "004", language: "English", copies: 1, condition: "Fair", review: "Review Needed" },
  { title: "Sample Sinhala Literature", author: "Sample Author", classCode: "891", language: "Sinhala", copies: 3, condition: "Good", review: "Current" },
];

export const adminBookRequests = [
  { request: "Introductory Python", category: "ICT", language: "English", count: 12, priority: "High", alternative: "Yes", status: "Open" },
  { request: "Recent Biology references", category: "Biology", language: "English", count: 9, priority: "High", alternative: "Yes", status: "Open" },
  { request: "English grammar & writing", category: "English", language: "English", count: 15, priority: "Medium", alternative: "Yes", status: "Matching" },
];

export const adminNews = [
  { title: "Collection needs review", status: "Draft", language: "English", author: "Content Editor", updated: "Sample time" },
  { title: "Smart-library roadmap update", status: "Review", language: "English", author: "Content Editor", updated: "Sample time" },
  { title: "Prototype development started", status: "Published Sample", language: "English", author: "Admin", updated: "Sample time" },
];

export const adminMedia = [
  { name: "reading-area-sample.jpg", type: "Image", permission: "Sample approved", visibility: "Public sample" },
  { name: "computer-project-sample.jpg", type: "Image", permission: "Pending", visibility: "Private" },
  { name: "donation-evidence-sample.pdf", type: "Document", permission: "Internal", visibility: "Private" },
];

export const adminUsers = [
  { name: "Sample Library Admin", role: "Library Administrator", status: "Active", mfa: "Recommended" },
  { name: "Sample Collection Manager", role: "Collection Manager", status: "Active", mfa: "Recommended" },
  { name: "Sample Content Editor", role: "Content Editor", status: "Active", mfa: "Recommended" },
];

export const adminAudit = [
  { actor: "Sample Library Admin", action: "Updated need quantity", entity: "Digital Learning Computers", time: "Sample time" },
  { actor: "Sample Content Editor", action: "Submitted content for review", entity: "Smart-library roadmap update", time: "Sample time" },
  { actor: "Sample Library Admin", action: "Verified donation", entity: "English reference books", time: "Sample time" },
];
