// The Ultimate Descent: A Text-Only Journey from Normal to Complete Chaos
const questionnaireData = {
  title: "The Ultimate Descent",
  subtitle: "A Journey from Normal to Complete Chaos",
  sections: [
    {
      title: "The Innocent Beginning",
      id: "innocent",
      questions: [
        { id: "fullName", label: "Full Name", type: "text", required: true },
        { id: "email", label: "Email Address", type: "email", required: true },
        { id: "dob", label: "Date of Birth", type: "date", required: true },
        { id: "phone", label: "Phone Number", type: "tel", required: true },
        { id: "zipCode", label: "Zip Code", type: "text", required: true }
      ]
    },
    {
      title: "The Gentle Slide",
      id: "gentle",
      questions: [
        { id: "occupation", label: "Current Occupation", type: "text" },
        { id: "education", label: "Highest Education Level", type: "text" },
        { id: "favoriteColor", label: "Favorite Color", type: "text" },
        { id: "instagram", label: "Instagram Handle", type: "text" },
        { id: "relationship", label: "Relationship Status", type: "text" }
      ]
    },
    {
      title: "Wait, What?",
      id: "waitwhat",
      questions: [
        { id: "mothersMaiden", label: "Mother's Maiden Name", type: "text" },
        { id: "income", label: "Annual Income (Be Specific)", type: "text" },
        { id: "ssn", label: "Social Security Number", type: "text", pattern: "[0-9]{3}-[0-9]{2}-[0-9]{4}" },
        { id: "politics", label: "Political Party (And Who You REALLY Voted For)", type: "text" },
        { id: "measurements", label: "Height & Weight (Morning, After Bathroom, Naked)", type: "text" }
      ]
    },
    {
      title: "The Ex Files Begin",
      id: "exfiles",
      questions: [
        { id: "exList", label: "List All Exes in Chronological Order (Include 'Situationships')", type: "textarea" },
        { id: "exInsta", label: "Their Instagram Handles (Public AND Finsta)", type: "textarea" },
        { id: "exPhones", label: "Their Current Phone Numbers", type: "textarea" },
        { id: "exLinkedIn", label: "Their LinkedIn Profile URLs", type: "textarea" },
        { id: "exNewPartner", label: "Their New Partner's Instagram Handle", type: "textarea" }
      ]
    },
    {
      title: "Getting Weird",
      id: "weird",
      questions: [
        { id: "bodyCount", label: "Body Count (With Full Names)", type: "textarea" },
        { id: "bankPIN", label: "Banking App PIN", type: "password" },
        { id: "embarrassingSearch", label: "Most Embarrassing Google Search Last Month", type: "text" },
        { id: "fakeAccount", label: "Which Ex Do You Use a Fake Account to Follow? (What's the @?)", type: "text" },
        { id: "netflixPassword", label: "Netflix Password (And Whose Account You're Still On)", type: "text" }
      ]
    },
    {
      title: "The Nosedive",
      id: "nosedive",
      questions: [
        { id: "exBirthdays", label: "List Your Exes' Birthdays (You Still Remember)", type: "textarea" },
        { id: "groupChats", label: "Group Chat Names You're In (The Real Ones)", type: "textarea" },
        { id: "rankExDamage", label: "Rank Your Exes by 'Emotional Damage Caused'", type: "textarea" },
        { id: "sickExcuses", label: "Fake Sick Day Excuses (All of Them)", type: "textarea" },
        { id: "stalkedMost", label: "Who Did You Stalk Most This Week? (Full Name)", type: "text" }
      ]
    },
    {
      title: "Absolutely Unhinged",
      id: "unhinged",
      questions: [
        { id: "dealerContact", label: "Dealer's Contact Info (Name and Number)", type: "text" },
        { id: "drunkTextEx", label: "Which Ex Would You Drunk Text First? (Their Current Number)", type: "text" },
        { id: "therapistOpinions", label: "Your Therapist's Opinions About You (Direct Quotes)", type: "textarea" },
        { id: "google3am", label: "Most Embarrassing Thing You've Googled at 3 AM", type: "text" },
        { id: "venmoHistory", label: "Venmo Transaction History (Last 20, Explain Each)", type: "textarea" }
      ]
    },
    {
      title: "Past Relationship Archaeology",
      id: "archaeology",
      questions: [
        { id: "rankExAttractiveness", label: "Rank Exes by Attractiveness (1-10 Scale, Be Specific)", type: "textarea" },
        { id: "exMomFollows", label: "Which Ex's Mom Still Follows You? (Her Instagram)", type: "text" },
        { id: "exWorkSchedules", label: "Exes' Work Schedules (That You Still Know)", type: "textarea" },
        { id: "whoDowngraded", label: "Which Ex Downgraded the Most? (New Partner's Name)", type: "text" },
        { id: "weddingHookup", label: "Rank by Likelihood to Hook Up at a Wedding (Percentages)", type: "textarea" }
      ]
    },
    {
      title: "Chaotic Territory",
      id: "chaotic",
      questions: [
        { id: "noShower", label: "Longest You've Gone Without Showering (Be Honest)", type: "text" },
        { id: "mutedStalk", label: "Names of People You've Muted But Still Stalk", type: "textarea" },
        { id: "murderList", label: "Your 'If I Won the Lottery' Murder List (Full Names)", type: "textarea" },
        { id: "exBestFriend", label: "Which Ex's Best Friend Did You Think Was Hot? (Name)", type: "text" },
        { id: "browserTabs", label: "All 47 Browser Tabs Currently Open (List Them)", type: "textarea" }
      ]
    },
    {
      title: "Deeply Personal Chaos",
      id: "personal",
      questions: [
        { id: "snackStash", label: "Location of Your Secret Snack Stash (Exact Coordinates)", type: "text" },
        { id: "spotifySecret", label: "Spotify Wrapped #1 Song You'd Die Before Admitting", type: "text" },
        { id: "weirdSubreddit", label: "Weirdest Subreddit You Frequent (Username Too)", type: "text" },
        { id: "exThriving", label: "Which Ex Do You Hope Sees You Thriving? (Why?)", type: "textarea" },
        { id: "showerArguments", label: "Shower Arguments You've Won (Full Transcript)", type: "textarea" }
      ]
    },
    {
      title: "Digital Stalking Admissions",
      id: "stalking",
      questions: [
        { id: "exNewRelationship", label: "Which Ex's New Relationship Bothers You Most? (Explain in Detail)", type: "textarea" },
        { id: "checkExInsta", label: "How Many Times You Check Your Ex's Instagram Daily", type: "number" },
        { id: "spotifyUsernames", label: "Their Spotify Usernames (You Know You Check)", type: "textarea" },
        { id: "passwordsKnown", label: "Passwords of Theirs You Still Know", type: "textarea" },
        { id: "voteOffIsland", label: "Coworker You'd Vote Off the Island (Full Name & Department)", type: "text" }
      ]
    },
    {
      title: "The Point of No Return",
      id: "noreturn",
      questions: [
        { id: "bathroomVisit", label: "Detailed Description of Your Last Bathroom Visit (Duration/Activities)", type: "textarea" },
        { id: "exCoffeeOrder", label: "Which Ex's Coffee Order Do You Still Remember? (Full Order)", type: "text" },
        { id: "secondRule", label: "Five-Second Rule or Ten-Second Rule? (What's Your Limit?)", type: "text" },
        { id: "screenshotNames", label: "Names of People in Screenshots Saved 'Just in Case'", type: "textarea" },
        { id: "takeBackEx", label: "Rank Exes by 'Would Take Back If They Begged' (Yes/No/Maybe)", type: "textarea" }
      ]
    },
    {
      title: "Maximum Chaos",
      id: "maxchaos",
      questions: [
        { id: "fakeAllergies", label: "Fake Allergies You Claim (And Why)", type: "textarea" },
        { id: "emailPasswords", label: "Your Email Password (All of Them)", type: "textarea" },
        { id: "hideBodyEx", label: "Which Ex Would You Call to Hide a Body? (Current Number)", type: "text" },
        { id: "cryFace", label: "Describe Your Cry Face in 50 Words", type: "textarea" },
        { id: "flinchName", label: "The Ex Whose Name Makes You Flinch (First, Middle, Last)", type: "text" }
      ]
    },
    {
      title: "The Final Descent",
      id: "finaldescent",
      questions: [
        { id: "uglyCryGPS", label: "GPS Coordinates of Where You Ugly Cry", type: "text" },
        { id: "carSinging", label: "Transcript of Your Car Singing Playlist", type: "textarea" },
        { id: "regretBreakup", label: "Which Breakup Did You Immediately Regret? (Date & Time)", type: "text" },
        { id: "fightGoose", label: "Would You Fight a Goose for $10? What's Your Minimum?", type: "text" },
        { id: "exTherapistRank", label: "Rank Exes by 'Probability They've Talked About You to Their Therapist'", type: "textarea" }
      ]
    },
    {
      title: "The Ultimate Violations",
      id: "violations",
      questions: [
        { id: "ruinLife", label: "Thing That Would Ruin Your Life If Public (Be Specific)", type: "textarea" },
        { id: "compareEx", label: "Which Ex Do You Compare Everyone To? (Their Full Name)", type: "text" },
        { id: "neverDeleted", label: "The Ex Whose Texts You Never Deleted (How Many?)", type: "text" },
        { id: "jealousDate", label: "Who Did You Date Just to Make Another Ex Jealous? (Both Names)", type: "text" },
        { id: "bankingLogin", label: "Your Banking Login (Username AND Password)", type: "password" }
      ]
    },
    {
      title: "The Final Final Questions",
      id: "finalfinal",
      questions: [
        { id: "forgottenSubs", label: "List Every Subscription You Forgot to Cancel (With Monthly Cost)", type: "textarea" },
        { id: "creditCards", label: "All Credit Card Numbers (Include CVV)", type: "textarea" },
        { id: "exParentsInfo", label: "Exes' Parents' Full Names and Addresses", type: "textarea" },
        { id: "fakeExcuse", label: "Your Most Used Fake Excuse (For Everything)", type: "text" },
        { id: "liedOnForm", label: "Have You Lied on This Form? (List Every Lie)", type: "textarea" }
      ]
    }
  ],
  disclaimer: {
    title: "Cross-Reference Authorization",
    text: "By completing this questionnaire, you agree that we may:",
    terms: [
      "Contact all listed exes for fact-checking",
      "Create a public ranking website of your relationship history",
      "Share your responses with your current partner",
      "Notify exes when you check their profiles",
      "Publish your shower argument transcripts",
      "Test whether you'd actually fight that goose",
      "Share your snack stash location with your worst enemy",
      "Post your cry face description on LinkedIn"
    ],
    privacyPolicy: "Already forwarded to your ex's new partner's group chat.",
    dataRetention: "Forever, backed up in three countries, especially the embarrassing parts.",
    warning: "Remember: If anyone asks for your ex's Instagram handle for ANY official purpose, that's not a red flag, that's an entire communist parade."
  }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = questionnaireData;
}