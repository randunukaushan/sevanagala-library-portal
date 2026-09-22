import type { PublicLocale } from "@/lib/i18n/config";
import type { NeedStatus } from "@/lib/sample-data";

export const needCardCopy: Record<
  PublicLocale,
  {
    stillNeeded: string;
    covered: string;
    target: string;
    pledged: string;
    received: string;
    lastVerified: string;
    statuses: Record<NeedStatus, string>;
  }
> = {
  en: {
    stillNeeded: "Still needed",
    covered: "covered",
    target: "Target",
    pledged: "Pledged",
    received: "Received",
    lastVerified: "Last verified",
    statuses: {
      "Seeking Support": "Seeking Support",
      "Partially Supported": "Partially Supported",
      "Fully Pledged": "Fully Pledged",
      Received: "Received",
      Completed: "Completed",
    },
  },
  si: {
    stillNeeded: "තව අවශ්‍ය",
    covered: "සපුරා ඇත",
    target: "ඉලක්කය",
    pledged: "පොරොන්දු වූ",
    received: "ලැබුණු",
    lastVerified: "අවසන් තහවුරු කිරීම",
    statuses: {
      "Seeking Support": "සහාය අවශ්‍යයි",
      "Partially Supported": "අර්ධ වශයෙන් සහාය ලැබී ඇත",
      "Fully Pledged": "සම්පූර්ණයෙන් පොරොන්දු වී ඇත",
      Received: "ලැබී ඇත",
      Completed: "සම්පූර්ණයි",
    },
  },
  ta: {
    stillNeeded: "இன்னும் தேவை",
    covered: "நிறைவேற்றப்பட்டது",
    target: "இலக்கு",
    pledged: "உறுதியளிக்கப்பட்டது",
    received: "பெறப்பட்டது",
    lastVerified: "கடைசியாக சரிபார்க்கப்பட்டது",
    statuses: {
      "Seeking Support": "ஆதரவு தேவை",
      "Partially Supported": "பகுதியாக ஆதரிக்கப்பட்டது",
      "Fully Pledged": "முழுமையாக உறுதியளிக்கப்பட்டது",
      Received: "பெறப்பட்டது",
      Completed: "நிறைவு",
    },
  },
};
