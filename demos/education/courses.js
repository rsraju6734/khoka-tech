/* LearnSphere Academy — courses and instructors (sample data). Fees in Bangladeshi Taka. */
window.LS = {
  categories: [
    { id: "dev", name: "Development" }, { id: "data", name: "Data & AI" }, { id: "design", name: "Design" },
    { id: "business", name: "Business" }, { id: "language", name: "Language" }, { id: "academic", name: "Academic" }
  ],
  instructors: {
    rahim: { name: "Rahim Ahmed", initials: "RA", role: "Senior Front-end Engineer", bio: "Builds web apps for fintech start-ups and has taught beginners for six years." },
    priya: { name: "Priya Sen", initials: "PS", role: "Data Scientist", bio: "Works on forecasting models for retail and loves making statistics feel simple." },
    tanvir: { name: "Tanvir Hasan", initials: "TH", role: "Product Designer", bio: "Designs mobile apps used every day and mentors junior designers." },
    nusrat: { name: "Nusrat Jahan", initials: "NJ", role: "Communication Coach", bio: "IELTS trainer and public-speaking coach for students and professionals." },
    arif: { name: "Arif Karim", initials: "AK", role: "Growth Marketer", bio: "Has run digital marketing for e-commerce brands across South Asia." },
    mehnaz: { name: "Mehnaz Rahman", initials: "MR", role: "Mathematics Teacher", bio: "Fifteen years preparing students for SSC, HSC and admission tests." }
  },
  courses: [
    { id: "web-development", title: "Full-Stack Web Development", cat: "dev", level: "Beginner", weeks: 16, lessons: 64, hours: 120, fee: 18000, img: "c_web",
      alt: "Student working on a laptop at a desk", instructor: "rahim", mode: "Live online + recordings", start: "5 January", popular: true,
      short: "Build and deploy real websites with HTML, CSS, JavaScript, Node.js and a database.",
      outcomes: ["Build responsive websites from scratch", "Write modern JavaScript confidently", "Create a REST API with Node.js", "Deploy a full project online"],
      modules: [["Web foundations", "HTML, CSS, accessibility and responsive layouts"], ["JavaScript essentials", "Variables, functions, arrays, the DOM and events"], ["Front-end projects", "Fetching data, building interfaces, Git and GitHub"], ["Back-end with Node.js", "Express, REST APIs, authentication basics"], ["Databases", "SQL fundamentals and connecting your app"], ["Capstone project", "Plan, build and deploy your own portfolio project"]] },
    { id: "data-science", title: "Data Science with Python", cat: "data", level: "Intermediate", weeks: 12, lessons: 48, hours: 90, fee: 22000, img: "c_data",
      alt: "Analytics charts and graphs on a laptop screen", instructor: "priya", mode: "Live online + recordings", start: "12 January", popular: true,
      short: "Analyse real datasets, build charts and train your first machine-learning models.",
      outcomes: ["Clean and analyse data with pandas", "Create clear charts and dashboards", "Understand core statistics", "Train and evaluate ML models"],
      modules: [["Python for data", "Syntax, notebooks, NumPy"], ["Working with data", "pandas, cleaning, joining datasets"], ["Visualisation", "Matplotlib, Seaborn and storytelling"], ["Statistics", "Distributions, sampling and testing"], ["Machine learning", "Regression, classification, evaluation"], ["Final project", "An end-to-end analysis presented to the class"]] },
    { id: "ui-ux-design", title: "UI/UX Design Professional", cat: "design", level: "Beginner", weeks: 10, lessons: 40, hours: 70, fee: 15000, img: "c_design",
      alt: "Team reviewing designs together on a laptop", instructor: "tanvir", mode: "Hybrid: online + Dhanmondi campus", start: "8 January",
      short: "Learn research, wireframing and Figma, and finish with three portfolio case studies.",
      outcomes: ["Run simple user research", "Wireframe and prototype in Figma", "Build a small design system", "Present three case studies"],
      modules: [["Design thinking", "Problems, users and research"], ["Wireframes", "Information architecture and flows"], ["Visual design", "Type, colour, layout and components"], ["Prototyping", "Interactive prototypes and testing"], ["Portfolio", "Writing and presenting case studies"]] },
    { id: "ielts-spoken-english", title: "IELTS & Spoken English", cat: "language", level: "All levels", weeks: 8, lessons: 32, hours: 48, fee: 9500, img: "c_english",
      alt: "Teacher speaking in front of a group", instructor: "nusrat", mode: "On campus, small groups", start: "3 January", popular: true,
      short: "Speak with confidence and prepare for all four IELTS modules with weekly mock tests.",
      outcomes: ["Speak fluently in interviews", "Write Task 1 and Task 2 essays", "Improve listening and reading speed", "Sit two full mock tests"],
      modules: [["Speaking confidence", "Daily practice, pronunciation, fluency"], ["Listening & reading", "Strategies and timed practice"], ["Writing", "Task 1 reports and Task 2 essays"], ["Mock tests", "Two full tests with personal feedback"]] },
    { id: "digital-marketing", title: "Digital Marketing Bootcamp", cat: "business", level: "Intermediate", weeks: 8, lessons: 30, hours: 50, fee: 12000, img: "c_business",
      alt: "Students talking in a lecture hall", instructor: "arif", mode: "Live online + recordings", start: "15 January",
      short: "Plan campaigns across social media, search and email — and measure what works.",
      outcomes: ["Plan a marketing strategy", "Run social media and search ads", "Write content that converts", "Measure results with analytics"],
      modules: [["Strategy", "Audiences, positioning and goals"], ["Social media", "Organic content and paid campaigns"], ["Search", "SEO basics and search ads"], ["Email & content", "Newsletters and landing pages"], ["Analytics", "Tracking, reporting and improving"]] },
    { id: "hsc-mathematics", title: "HSC Higher Mathematics", cat: "academic", level: "HSC", weeks: 20, lessons: 80, hours: 110, fee: 8000, img: "c_math",
      alt: "Students in front of a chalkboard", instructor: "mehnaz", mode: "On campus + online doubt sessions", start: "6 January",
      short: "Complete HSC higher maths syllabus with weekly tests and exam-focused practice.",
      outcomes: ["Cover the full HSC syllabus", "Solve board-standard questions", "Manage time in exams", "Track progress with weekly tests"],
      modules: [["Algebra & matrices", "Matrices, determinants, linear equations"], ["Calculus", "Limits, differentiation and integration"], ["Trigonometry", "Identities, equations and applications"], ["Vectors & geometry", "Straight lines, circles and conics"], ["Revision", "Past papers and full model tests"]] }
  ]
};
