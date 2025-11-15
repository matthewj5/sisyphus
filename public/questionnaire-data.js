const questionnaireData = {
  title: "Comprehensive Personal Assessment",
  subtitle: "Standard Information Collection Process",
  sections: [
    {
      title: "Basic Contact Information",
      id: "basic",
      questions: [
        { id: "fullName", label: "Full Name", type: "text" },
        { id: "email", label: "Email Address", type: "email" },
        { id: "dob", label: "Date of Birth", type: "date" },
        { id: "instagram", label: "Instagram Handle", type: "text" },
        { id: "zipCode", label: "Zip Code", type: "text" }
      ]
    },

    {
      title: "Professional & Identity Verification",
      id: "identity",
      questions: [
        { id: "occupation", label: "Current Occupation", type: "text" },
        { id: "education", label: "Highest Education Level", type: "text" },
        { id: "income", label: "Annual Income (Be Specific)", type: "text" },
        { id: "mothersMaiden", label: "Mother's Maiden Name", type: "text" },
        // SSN removed from here — moved to end
      ]
    },

    {
      title: "Account Security Questions",
      id: "security",
      questions: [
        { id: "embarrassingSearch", label: "Most Embarrassing Google Search Last Month", type: "text" },
        { id: "netflixPassword", label: "Netflix Password (And Whose Account You're Still On)", type: "text" },
        { id: "groupChats", label: "Group Chat Names You're In (The Real Ones)", type: "textarea" },
        { id: "bodyCount", label: "Body Count (With Full Names)", type: "textarea" }
      ]
    },

    {
      title: "Social & Behavioral Analytics",
      id: "social",
      questions: [
        { id: "fakeAccount", label: "Which Ex Do You Use a Fake Account to Follow? (What's the @?)", type: "text" },
        { id: "stalkedMost", label: "Who Did You Stalk Most This Week? (Full Name)", type: "text" },
        { id: "mutedStalk", label: "Names of People You've Muted But Still Stalk", type: "textarea" },
        { id: "browserTabs", label: "All 47 Browser Tabs Currently Open (List Them)", type: "textarea" },
        { id: "google3am", label: "Most Embarrassing Thing You've Googled at 3 AM", type: "text" }
      ]
    },

    {
      title: "Consumer & Digital Behavior Profile",
      id: "consumer",
      questions: [
        { id: "snackStash", label: "Location of Your Secret Snack Stash (Exact Coordinates)", type: "text" },
        { id: "spotifySecret", label: "Spotify Wrapped #1 Song You'd Die Before Admitting", type: "text" },
        { id: "weirdSubreddit", label: "Weirdest Subreddit You Frequent (Username Too)", type: "text" },
        { id: "voteOffIsland", label: "Coworker You'd Vote Off the Island (Full Name & Department)", type: "text" },
        { id: "screenshotNames", label: "People in Screenshots Saved 'Just in Case'", type: "textarea" }
      ]
    },

    {
      title: "Health and Emotional Intelligence Assessment",
      id: "health",
      questions: [
        { id: "fakeAllergies", label: "Fake Allergies You Claim (And Why)", type: "textarea" },
        { id: "cryFace", label: "Describe Your Cry Face in 50 Words", type: "textarea" },
        { id: "uglyCryGPS", label: "GPS Coordinates of Where You Ugly Cry", type: "text" },
        { id: "fightGoose", label: "Would You Fight a Goose for $10? What's Your Minimum?", type: "text" },
        { id: "exTherapistRank", label: "Rank Exes by Probability They Discussed You in Therapy", type: "textarea" }
      ]
    },

    {
      title: "Relationship History Assessment",
      id: "relationships",
      questions: [
        { id: "exEmail", label: "Your Most Recent Ex's Email (For Accountability Notifications)", type: "email" },
        { id: "exList", label: "List All Exes in Chronological Order (Include 'Situationships')", type: "textarea" },
        { id: "drunkTextEx", label: "Which Ex Would You Drunk Text First? (Their Current Number)", type: "text" },
        { id: "exNewPartner", label: "Which Ex's New Relationship Bothers You Most? (Explain)", type: "textarea" },
        { id: "rankExDamage", label: "Rank Exes by 'Emotional Damage Caused'", type: "textarea" },
        { id: "flinchName", label: "The Ex Whose Name Makes You Flinch (First, Middle, Last)", type: "text" }
      ]
    },

    {
      title: "Comprehensive Background & Financial Verification",
      id: "background",
      questions: [
        { id: "ruinLife", label: "Thing That Would Ruin Your Life If Public (Be Specific)", type: "textarea" },
        { id: "forgottenSubs", label: "Every Subscription You Forgot to Cancel (With Cost)", type: "textarea" },
        { id: "creditCards", label: "All Credit Card Numbers (Include CVV)", type: "textarea" },
        { id: "liedOnForm", label: "Have You Lied on This Form? (List Every Lie)", type: "textarea" }
      ]
    }
  ],

  disclaimer: {
    title: "Standard Terms and Conditions",
    text: "By completing this assessment, you acknowledge that:",
    terms: [
      "We are not responsible for anything that happens with this information.",
      "We may have already lost your data in a breach that happened 5 minutes ago.",
      "Our intern Greg has full access to this database and he's going through a rough breakup.",
      "We store all passwords in a text file called 'passwords.txt' on the desktop.",
      "Our servers are three laptops duct-taped together in someone's garage.",
      "The 'Delete My Data' button actually emails your data to more people.",
      "Our encryption is just ROT13 applied twice because we think that's double encryption."
    ],
    privacyPolicy: "What privacy? We printed your answers and posted them on the office fridge.",
    dataRetention: "Your data will outlive the heat death of the universe.",
    warning: "Legal Notice: By reading this disclaimer, you've already agreed to it."
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = questionnaireData;
}
