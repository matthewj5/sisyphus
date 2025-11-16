/**
 * ARCHIVED: Full comprehensive questionnaire
 *
 * This is the complete version with all questions.
 * Currently not in use - we're using a simplified version.
 * Restore this if you want the full humorous questionnaire experience.
 */

import type { QuestionnaireSection, Question } from '../types';

// Helper function to create questions with defaults
function q(data: Partial<Question> & Pick<Question, 'id' | 'question'>): Question {
  return {
    type: 'text',
    required: true,
    ...data,
  };
}

export const fullQuestionnaireSections: QuestionnaireSection[] = [
  {
    title: "Basic Contact Information",
    id: "basic",
    questions: [
      q({ id: "fullName", question: "Full Name" }),
      q({ id: "email", question: "Email Address", type: "email" }),
      q({ id: "dob", question: "Date of Birth" }),
      q({ id: "instagram", question: "Instagram Handle" }),
      q({ id: "zipCode", question: "Zip Code" }),
    ],
  },
  {
    title: "Professional & Identity Verification",
    id: "identity",
    questions: [
      q({ id: "occupation", question: "Current Occupation" }),
      q({ id: "education", question: "Highest Education Level" }),
      q({ id: "income", question: "Annual Income (Be Specific)" }),
      q({ id: "mothersMaiden", question: "Mother's Maiden Name" }),
    ],
  },
  {
    title: "Account Security Questions",
    id: "security",
    questions: [
      q({ id: "embarrassingSearch", question: "Most Embarrassing Google Search Last Month" }),
      q({ id: "netflixPassword", question: "Netflix Password (And Whose Account You're Still On)" }),
      q({ id: "groupChats", question: "Group Chat Names You're In (The Real Ones)", type: "textarea" }),
      q({ id: "bodyCount", question: "Body Count (With Full Names)", type: "textarea" }),
    ],
  },
  {
    title: "Social & Behavioral Analytics",
    id: "social",
    questions: [
      q({ id: "fakeAccount", question: "Which Ex Do You Use a Fake Account to Follow? (What's the @?)" }),
      q({ id: "stalkedMost", question: "Who Did You Stalk Most This Week? (Full Name)" }),
      q({ id: "mutedStalk", question: "Names of People You've Muted But Still Stalk", type: "textarea" }),
      q({ id: "browserTabs", question: "All 47 Browser Tabs Currently Open (List Them)", type: "textarea" }),
      q({ id: "google3am", question: "Most Embarrassing Thing You've Googled at 3 AM" }),
    ],
  },
  {
    title: "Consumer & Digital Behavior Profile",
    id: "consumer",
    questions: [
      q({ id: "snackStash", question: "Location of Your Secret Snack Stash (Exact Coordinates)" }),
      q({ id: "spotifySecret", question: "Spotify Wrapped #1 Song You'd Die Before Admitting" }),
      q({ id: "weirdSubreddit", question: "Weirdest Subreddit You Frequent (Username Too)" }),
      q({ id: "voteOffIsland", question: "Coworker You'd Vote Off the Island (Full Name & Department)" }),
      q({ id: "screenshotNames", question: "People in Screenshots Saved 'Just in Case'", type: "textarea" }),
    ],
  },
  {
    title: "Health and Emotional Intelligence Assessment",
    id: "health",
    questions: [
      q({ id: "fakeAllergies", question: "Fake Allergies You Claim (And Why)", type: "textarea" }),
      q({ id: "cryFace", question: "Describe Your Cry Face in 50 Words", type: "textarea" }),
      q({ id: "uglyCryGPS", question: "GPS Coordinates of Where You Ugly Cry" }),
      q({ id: "fightGoose", question: "Would You Fight a Goose for $10? What's Your Minimum?" }),
      q({ id: "exTherapistRank", question: "Rank Exes by Probability They Discussed You in Therapy", type: "textarea" }),
    ],
  },
  {
    title: "Relationship History Assessment",
    id: "relationships",
    questions: [
      q({ id: "exEmail", question: "Your Most Recent Ex's Email (For Accountability Notifications)", type: "email" }),
      q({ id: "exList", question: "List All Exes in Chronological Order (Include 'Situationships')", type: "textarea" }),
      q({ id: "drunkTextEx", question: "Which Ex Would You Drunk Text First? (Their Current Number)" }),
      q({ id: "exNewPartner", question: "Which Ex's New Relationship Bothers You Most? (Explain)", type: "textarea" }),
      q({ id: "rankExDamage", question: "Rank Exes by 'Emotional Damage Caused'", type: "textarea" }),
      q({ id: "flinchName", question: "The Ex Whose Name Makes You Flinch (First, Middle, Last)" }),
    ],
  },
  {
    title: "Comprehensive Background & Financial Verification",
    id: "background",
    questions: [
      q({ id: "ruinLife", question: "Thing That Would Ruin Your Life If Public (Be Specific)", type: "textarea" }),
      q({ id: "forgottenSubs", question: "Every Subscription You Forgot to Cancel (With Cost)", type: "textarea" }),
      q({ id: "creditCards", question: "All Credit Card Numbers (Include CVV)", type: "textarea" }),
      q({ id: "liedOnForm", question: "Have You Lied on This Form? (List Every Lie)", type: "textarea" }),
    ],
  },
];

export const fullDisclaimerData = {
  title: "Standard Terms and Conditions",
  text: "By completing this assessment, you acknowledge that:",
  terms: [
    "We are not responsible for anything that happens with this information.",
    "We may have already lost your data in a breach that happened 5 minutes ago.",
    "Our intern Greg has full access to this database and he's going through a rough breakup.",
    "We store all passwords in a text file called 'passwords.txt' on the desktop.",
    "Our servers are three laptops duct-taped together in someone's garage.",
    "The 'Delete My Data' button actually emails your data to more people.",
    "Our encryption is just ROT13 applied twice because we think that's double encryption.",
  ],
  privacyPolicy: "What privacy? We printed your answers and posted them on the office fridge.",
  dataRetention: "Your data will outlive the heat death of the universe.",
  warning: "Legal Notice: By reading this disclaimer, you've already agreed to it.",
};
