import type { PublicLocale } from "@/lib/i18n/config";
import type { Need } from "@/lib/sample-data";

export function localizedSampleNeeds(locale: PublicLocale): Need[] {
  if (locale === "si") {
    return [
      {
        id: "sample-books",
        title: "යාවත්කාලීන ඉංග්‍රීසි සහ STEM පොත්",
        category: "පොත්",
        purpose:
          "ශිෂ්‍ය යොමු සම්පත්, ඉංග්‍රීසි ඉගෙනීම සහ අනාගතයට ගැළපෙන STEM සම්පත් සඳහා නියැදි අවශ්‍යතාවයක්.",
        target: 150,
        pledged: 0,
        received: 0,
        unit: "පොත්",
        status: "Seeking Support",
        priority: "High",
        lastVerified: "මූලාකෘති නියැදිය",
      },
      {
        id: "sample-computers",
        title: "ඩිජිටල් ඉගෙනුම් පරිගණක",
        category: "තාක්ෂණය",
        purpose:
          "පර්යේෂණ, ඩිජිටල් සාක්ෂරතාව සහ අනාගත මහජන පරිගණක ප්‍රවේශය සඳහා නියැදි අවශ්‍යතාවයක්.",
        target: 10,
        pledged: 3,
        received: 0,
        unit: "පරිගණක",
        status: "Partially Supported",
        priority: "High",
        lastVerified: "මූලාකෘති නියැදිය",
      },
      {
        id: "sample-seating",
        title: "අධ්‍යයන මේස සහ පුටු",
        category: "ගෘහභාණ්ඩ",
        purpose:
          "පාඨකයින් සහ ශිෂ්‍යයින් සඳහා සුවපහසු අධ්‍යයන අවකාශය වැඩිදියුණු කිරීමට නියැදි අවශ්‍යතාවයක්.",
        target: 24,
        pledged: 0,
        received: 0,
        unit: "ආසන",
        status: "Seeking Support",
        priority: "Medium",
        lastVerified: "මූලාකෘති නියැදිය",
      },
    ];
  }

  if (locale === "ta") {
    return [
      {
        id: "sample-books",
        title: "புதுப்பிக்கப்பட்ட ஆங்கில மற்றும் STEM புத்தகங்கள்",
        category: "புத்தகங்கள்",
        purpose:
          "மாணவர் குறிப்பு வளங்கள், ஆங்கிலக் கற்றல் மற்றும் எதிர்காலத்திற்கேற்ற STEM வளங்களுக்கான மாதிரி தேவை.",
        target: 150,
        pledged: 0,
        received: 0,
        unit: "புத்தகங்கள்",
        status: "Seeking Support",
        priority: "High",
        lastVerified: "முன்மாதிரி மாதிரி",
      },
      {
        id: "sample-computers",
        title: "டிஜிட்டல் கற்றல் கணினிகள்",
        category: "தொழில்நுட்பம்",
        purpose:
          "ஆராய்ச்சி, டிஜிட்டல் அறிவுத்திறன் மற்றும் எதிர்கால பொது கணினி அணுகலுக்கான மாதிரி தேவை.",
        target: 10,
        pledged: 3,
        received: 0,
        unit: "கணினிகள்",
        status: "Partially Supported",
        priority: "High",
        lastVerified: "முன்மாதிரி மாதிரி",
      },
      {
        id: "sample-seating",
        title: "படிப்பு மேசைகள் மற்றும் நாற்காலிகள்",
        category: "மரச்சாமான்கள்",
        purpose:
          "வாசகர்கள் மற்றும் மாணவர்களுக்கு வசதியான படிப்பு இடத்தை மேம்படுத்துவதற்கான மாதிரி தேவை.",
        target: 24,
        pledged: 0,
        received: 0,
        unit: "இருப்பிடங்கள்",
        status: "Seeking Support",
        priority: "Medium",
        lastVerified: "முன்மாதிரி மாதிரி",
      },
    ];
  }

  return [
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
}

export function localizedSampleProjects(locale: PublicLocale) {
  if (locale === "si") {
    return [
      {
        title: "පොත් එකතුව නවීකරණය",
        summary:
          "අඩුපාඩු හඳුනාගෙන, වැදගත් පැරණි සම්පත් ප්‍රතිස්ථාපනය කර, වැඩි ඉල්ලුමක් ඇති පොත් එකතු කිරීම සඳහා අදියරගත නියැදි ව්‍යාපෘතියක්.",
        status: "සැලසුම් කිරීම",
      },
      {
        title: "ඩිජිටල් ඉගෙනුම් කෝණය",
        summary:
          "පරිගණක, සම්බන්ධතාව, ගෘහභාණ්ඩ සහ ඩිජිටල් ඉගෙනුම් ප්‍රවේශය එක් කරන නියැදි ස්මාර්ට් පුස්තකාල ව්‍යාපෘතියක්.",
        status: "සැලසුම් කිරීම",
      },
      {
        title: "පුස්තකාල අවකාශ වැඩිදියුණු කිරීම",
        summary:
          "රාක්ක, ආසන, ආලෝකය, වාතාශ්‍රය සහ පාඨක සුවපහසුව සඳහා නියැදි ව්‍යාපෘතියක්.",
        status: "සොයාබැලීම",
      },
    ];
  }

  if (locale === "ta") {
    return [
      {
        title: "புத்தகத் தொகுப்பு புதுப்பித்தல்",
        summary:
          "இடைவெளிகளை அடையாளம் கண்டு, முக்கிய பழைய வளங்களை மாற்றி, அதிக தேவை உள்ள புத்தகங்களைச் சேர்க்கும் கட்டப்படியான மாதிரி திட்டம்.",
        status: "திட்டமிடல்",
      },
      {
        title: "டிஜிட்டல் கற்றல் பகுதி",
        summary:
          "கணினிகள், இணைப்பு, மரச்சாமான்கள் மற்றும் டிஜிட்டல் கற்றல் அணுகலை இணைக்கும் மாதிரி ஸ்மார்ட் நூலக திட்டம்.",
        status: "திட்டமிடல்",
      },
      {
        title: "நூலக இட மேம்பாடு",
        summary:
          "அலமாரிகள், இருக்கைகள், விளக்கு, காற்றோட்டம் மற்றும் வாசகர் வசதியை மேம்படுத்தும் மாதிரி திட்டம்.",
        status: "ஆராய்ச்சி",
      },
    ];
  }

  return [
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
}
