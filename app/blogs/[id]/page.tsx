"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────────────────
interface BlogPost {
  id: number;
  title: string;
  author: string;
  publishDate: string;
  readTime: number;
  category: string;
  categoryColor: string;
  cardBg: string;
  icon: string;
  excerpt: string;
  sections: { heading: string; body: string }[];
  tags: string[];
  relatedIds: number[];
}

// ── Full Blog Data ─────────────────────────────────────────────────────────
const allBlogs: BlogPost[] = [
  // ── NEW: IDs 1–4 ──────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Flutter & Mobile Dev",
    author: "Authory Saram",
    publishDate: "October 1, 2023",
    readTime: 6,
    category: "Mobile Dev",
    categoryColor: "#38bdf8",
    cardBg: "#1a1a2e",
    icon: "📲",
    excerpt:
      "Developing with cross-platform frameworks to build elegant, high-performance mobile applications using Flutter and Dart.",
    sections: [
      {
        heading: "Why Flutter for Mobile Development?",
        body: "Flutter has rapidly emerged as one of the most popular frameworks for cross-platform mobile development, and for good reason. Built by Google, it allows developers to write a single codebase that compiles natively to Android, iOS, web, and even desktop. For student developers at BGU, this means faster iteration, unified codebases, and production-quality apps without needing two separate teams.\n\nAt GDG BGU, Flutter is the recommended framework for all new mobile projects. Over the past year, more than eight student-led projects have shipped using Flutter — ranging from campus event apps to healthcare dashboards. The learning curve is gentle, especially for students already familiar with object-oriented programming, and the widget ecosystem is rich enough to build sophisticated UIs without reinventing the wheel.",
      },
      {
        heading: "Setting Up Your Flutter Environment",
        body: "Getting started with Flutter is straightforward. Install the Flutter SDK from flutter.dev, set up either Android Studio or VS Code with the Flutter plugin, and run 'flutter doctor' to verify your environment. The CLI tool is excellent — it catches missing dependencies and guides you through fixes automatically.\n\nFor BGU students working on shared lab machines, we recommend using FVM (Flutter Version Management) to switch between Flutter versions cleanly. This avoids the common problem of one project requiring Flutter 3.10 while another needs 3.16. Our GDG setup guide, available on the community WhatsApp group, walks through FVM installation in under ten minutes.",
      },
      {
        heading: "Building Your First Widget Tree",
        body: "Everything in Flutter is a widget — from the app scaffold to a single padding value. This declarative UI model is different from the imperative approach of native Android or iOS development, but it quickly becomes intuitive. The key insight is to think of your UI as a function of state: when state changes, the widget tree re-renders accordingly.\n\nA practical first project we recommend is a campus notice board app. It uses a StatefulWidget at the root, a FutureBuilder to fetch notices from a Firebase Firestore collection, and a ListView.builder to render them. It covers state management, async data fetching, and dynamic lists — the three pillars of most real-world Flutter apps — in a manageable scope.",
      },
      {
        heading: "State Management and Beyond",
        body: "Once you've mastered StatefulWidget, the natural next step is exploring more scalable state management solutions. Provider is a great starting point — it's lightweight, officially recommended by the Flutter team, and sufficient for apps up to medium complexity. For larger projects, Riverpod and BLoC are the two most popular choices in the industry.\n\nGDG BGU runs a Flutter Study Jam every semester where we cover the Provider pattern, navigation with GoRouter, and integrating Firebase Auth and Firestore into a complete app. If you'd like to attend the next session or access our workshop recordings, join our WhatsApp community for updates.",
      },
    ],
    tags: ["Flutter", "Mobile Dev", "Dart", "Cross-Platform"],
    relatedIds: [3, 8],
  },
  {
    id: 2,
    title: "AI in Healthcare",
    author: "Annan Kager",
    publishDate: "October 8, 2023",
    readTime: 7,
    category: "AI",
    categoryColor: "#818cf8",
    cardBg: "#0f172a",
    icon: "🏥",
    excerpt:
      "Leveraging AI for predictive diagnostics and research breakthroughs in modern medicine and campus health initiatives.",
    sections: [
      {
        heading: "The Intersection of AI and Medicine",
        body: "Artificial intelligence is transforming healthcare at a pace that few industries have ever witnessed. From AI-assisted radiology that detects tumors in CT scans with accuracy rivaling experienced radiologists, to natural language processing tools that extract structured insights from unstructured clinical notes, the applications are both broad and profound.\n\nAt BGU, the Computer Science and Life Sciences departments have begun a joint research initiative exploring how machine learning models can support the campus health center. The first project — a symptom triage chatbot built on a fine-tuned language model — is currently in a pilot phase, helping students navigate appointment booking and preliminary health queries before speaking with a physician.",
      },
      {
        heading: "Predictive Diagnostics: How It Works",
        body: "Predictive diagnostic models are trained on large labeled datasets of patient records, imaging data, or genomic sequences. The model learns statistical associations between input features (symptoms, test results, demographic data) and outcomes (diagnoses, disease progression, treatment responses). Once trained and validated, these models can assist clinicians by flagging high-risk patients or suggesting differential diagnoses.\n\nA team of BGU students worked with a publicly available diabetic retinopathy dataset from Kaggle, training a convolutional neural network to classify fundus images into five severity grades. Their model achieved 87% accuracy on the test set — a result that earned them first place at the BGU Research Symposium and a presentation slot at a regional AI conference.",
      },
      {
        heading: "Ethics and Responsibility in Medical AI",
        body: "The promise of AI in healthcare comes with significant ethical responsibilities. Bias in training data can lead to models that perform well for one demographic but poorly for another — a problem with real-world consequences when deployed in clinical settings. Transparency, explainability, and rigorous validation are non-negotiable requirements for any AI system that touches patient care.\n\nGDG BGU hosted a panel discussion last semester on responsible AI in medicine, bringing together faculty from Computer Science, Biomedical Engineering, and Philosophy. The consensus: technical capability must always be paired with ethical scrutiny. Students building health-related AI projects are encouraged to include bias audits and explainability analyses as standard components of their work.",
      },
      {
        heading: "What BGU Students Are Building",
        body: "Beyond the retinopathy project, several other student teams are working at the AI-healthcare intersection. One team is building a mental health sentiment tracker that anonymously analyzes student forum posts to identify early warning signals of distress, with the aim of enabling proactive outreach by the campus counseling center. Another is developing a medication adherence reminder system using personalized NLP-generated messages.\n\nIf you're interested in contributing to any of these projects or starting your own, GDG BGU can connect you with faculty mentors and computational resources through the Google Cloud for Students program. Reach out through our WhatsApp community to learn more.",
      },
    ],
    tags: ["AI", "Healthcare", "ML", "Ethics"],
    relatedIds: [6, 10],
  },
  {
    id: 3,
    title: "Google Cloud Workshop",
    author: "Aram Negev",
    publishDate: "October 15, 2023",
    readTime: 5,
    category: "Cloud",
    categoryColor: "#4285F4",
    cardBg: "#e8f0fe",
    icon: "☁️",
    excerpt:
      "Practical applications of Google Cloud services for scalable, production-ready solutions built and tested at BGU.",
    sections: [
      {
        heading: "About the Workshop",
        body: "GDG BGU's Google Cloud Workshop is a hands-on, full-day event that takes students from zero cloud knowledge to deploying a production-ready application on Google Cloud Platform (GCP). This semester's edition drew 65 participants from four different departments — the largest turnout in the workshop's three-year history.\n\nThe day was structured in three blocks: a morning session on GCP fundamentals (IAM, Compute Engine, Cloud Storage), an afternoon deep-dive into serverless architectures with Cloud Run and Cloud Functions, and an evening capstone where teams deployed their own microservice to GCP and connected it to a frontend hosted on Firebase Hosting.",
      },
      {
        heading: "Key Services Covered",
        body: "The workshop focused on five core GCP services most relevant to student projects. Cloud Run was the star of the day — its ability to deploy containerized applications with zero server management and automatic scaling resonated strongly with students who had previously struggled with configuring and maintaining virtual machines.\n\nCloud Firestore (covered in the afternoon block) enabled participants to build a real-time collaborative note-taking app in under 90 minutes. Firebase Authentication rounded out the stack, adding Google Sign-In in fewer than 20 lines of code. By the end of the day, every team had a live URL they could share — a tangible outcome that generated significant excitement in the room.",
      },
      {
        heading: "Student Project Highlights",
        body: "The capstone session produced some genuinely impressive projects. One team built a real-time campus bus tracker using Cloud Pub/Sub and Google Maps Platform, pulling simulated GPS data through a Cloud Function and displaying live positions on a map embedded in a Flutter web app. Another team deployed a serverless REST API for a second-hand book exchange platform, with Cloud Firestore as the database and Cloud Run handling the Express.js backend.\n\nAll capstone projects were open-sourced and are available in the GDG BGU GitHub organization. The bus tracker project subsequently caught the attention of the campus administration, who are now in discussions with the team about a potential pilot deployment.",
      },
      {
        heading: "How to Access GCP for Free",
        body: "Google provides generous free-tier access to GCP, and students are eligible for additional credits through the Google Cloud for Students program. GDG BGU can facilitate access to these credits — members who attend a workshop or community meetup can apply for $300 in free GCP credits valid for 90 days, more than enough to run the services covered in the workshop at learning-scale volumes.\n\nOur next workshop is scheduled for next semester. In the meantime, we've published the full workshop curriculum, slide decks, and Qwiklabs links on our community resources page. Join our WhatsApp group for the access link and to get notified when registration opens.",
      },
    ],
    tags: ["Google Cloud", "Cloud Run", "Firebase", "Workshop"],
    relatedIds: [5, 1],
  },
  {
    id: 4,
    title: "BGU Tech Projects Showcase",
    author: "Student Projects Team",
    publishDate: "October 20, 2023",
    readTime: 4,
    category: "Showcase",
    categoryColor: "#34d399",
    cardBg: "#1e293b",
    icon: "🚀",
    excerpt:
      "Student Projects Showcase: innovative, locally-crafted creations by talented BGU developers presented at the annual showcase event.",
    sections: [
      {
        heading: "About the Showcase",
        body: "The BGU Tech Projects Showcase is GDG BGU's flagship annual event, bringing together the best student-built technology projects from across the university for a day of demonstrations, judging, and community celebration. This year's edition featured 24 projects across five categories: Mobile Apps, Web Platforms, AI & Data Science, IoT & Hardware, and Social Impact Tech.\n\nOver 300 students, faculty members, and industry guests attended the event, which was held in the BGU main auditorium and spilled over into the adjacent engineering corridor where hardware projects were demonstrated. A panel of five judges — including two alumni currently working at Google and Microsoft — evaluated projects on innovation, technical execution, real-world impact, and presentation quality.",
      },
      {
        heading: "Top Projects of the Year",
        body: "This year's Best Overall Project award went to CampusConnect — a Flutter app that integrates class schedules, campus navigation, event discovery, and peer tutoring into a single unified experience. The team of four spent six months building and iterating on the app, and it currently has over 400 active users among the student body.\n\nThe AI & Data Science category winner was a crop disease detection model trained on a dataset of 50,000 leaf images, designed to assist smallholder farmers in the region. The project was built in collaboration with the BGU Agriculture faculty and has been shortlisted for a national student innovation competition. The IoT category was won by a smart energy monitoring system that tracks power consumption across lab equipment in the engineering building in real time.",
      },
      {
        heading: "Behind the Scenes: How Teams Prepared",
        body: "Building a showcase-worthy project is a months-long endeavor. Teams that performed well this year shared a common approach: they started with a clearly defined problem, validated it with real users early, and maintained a disciplined weekly sprint rhythm throughout development.\n\nGDG BGU supported showcase participants through monthly check-in sessions where teams could present their progress, get feedback from mentors, and troubleshoot technical blockers. Teams also had access to GCP credits, Firebase support, and a shared hardware lab stocked with Raspberry Pi units, Arduino kits, and sensor components.",
      },
      {
        heading: "How to Participate Next Year",
        body: "Applications for next year's showcase will open in February. Teams of two to five students from any department are eligible to apply. There are no restrictions on technology stack or project domain — the only requirement is that the project solves a real problem and has a working prototype at the time of submission.\n\nIf you're thinking about participating, the best time to start is now. Come to a GDG BGU community meetup, share your idea, and find teammates. Some of this year's winning teams formed at exactly this kind of casual community gathering six months before the showcase. Join our WhatsApp community to stay updated on meetup schedules and showcase announcements.",
      },
    ],
    tags: ["Showcase", "Student Projects", "Innovation", "GDG"],
    relatedIds: [1, 7],
  },
  // ── EXISTING: IDs 5–10 ────────────────────────────────────────────────────
  {
    id: 5,
    title: "Demystifying Cloud Computing on Campus",
    author: "Alex Johnson",
    publishDate: "October 26, 2023",
    readTime: 5,
    category: "Cloud Computing",
    categoryColor: "#4285F4",
    cardBg: "#e8f0fe",
    icon: "☁",
    excerpt:
      "Explore how Google Cloud services are transforming the way students and faculty collaborate, store data, and build scalable applications right from the campus network.",
    sections: [
      {
        heading: "Introduction to Cloud on Campus",
        body: "Cloud computing has fundamentally changed how academic institutions operate. From storing research datasets to deploying student-built web applications, Google Cloud has become the backbone of modern campus infrastructure. At BGU, the GDG community has been at the forefront of this transformation — running workshops, hackathons, and hands-on labs to help students unlock the potential of cloud-native tools.\n\nIn this article, we take a deep dive into how three key Google Cloud services — Cloud Storage, Firebase, and App Engine — are being used by students and faculty to solve real campus challenges.",
      },
      {
        heading: "Google Cloud Storage for Research",
        body: "Research teams generate enormous volumes of data — lab recordings, satellite imagery, simulation outputs — and traditional on-premise servers often fall short. BGU's Department of Environmental Science recently migrated its entire climate research dataset (over 4TB) to Google Cloud Storage. The result? Storage costs dropped by 60%, and cross-departmental collaboration improved dramatically since team members can now access data securely from anywhere in the world.\n\nThe GDG BGU team hosted a hands-on workshop last semester showing students how to set up Cloud Storage buckets, manage IAM permissions, and automate backups using Cloud Scheduler.",
      },
      {
        heading: "Firebase for Student Projects",
        body: "Firebase has become the go-to backend for student app projects. Its real-time database, authentication layer, and serverless functions mean students can build and ship full-stack apps without needing to manage servers. Over 12 student teams used Firebase in last year's BGU Hackathon, building everything from campus event trackers to peer tutoring platforms.\n\nOne standout project — a lost-and-found app for the campus — went from prototype to production in just 48 hours, entirely on Firebase. The team processed over 200 item claims in its first month of operation.",
      },
      {
        heading: "What's Next for GDG BGU Cloud Initiatives",
        body: "Looking ahead, GDG BGU is planning to launch a Cloud Study Jam series in partnership with the Computer Science department. Students will earn Google Cloud digital badges by completing hands-on labs in Qwiklabs — a program that directly maps to industry certifications.\n\nWe're also exploring bringing BigQuery into the curriculum, particularly for data science students who work with large structured datasets. If you're interested in joining our next cloud workshop or contributing to a cloud-powered student project, reach out to us on our WhatsApp community!",
      },
    ],
    tags: ["Cloud", "Google Cloud", "Firebase", "Students"],
    relatedIds: [6, 8],
  },
  {
    id: 6,
    title: "The Future of Robotics: A Campus Perspective",
    author: "Priya Mehta",
    publishDate: "October 26, 2023",
    readTime: 7,
    category: "AI & Robotics",
    categoryColor: "#EA4335",
    cardBg: "#1a1a2e",
    icon: "🤖",
    excerpt:
      "BGU's robotics lab is pushing boundaries with AI-driven automation projects. Discover the student teams building tomorrow's machines today.",
    sections: [
      {
        heading: "Introduction to Campus Automation",
        body: "The intersection of artificial intelligence and robotics is no longer confined to research labs at elite institutions. At Birla Global University, student-led teams are actively developing autonomous systems that solve real campus problems — from robot-assisted material handling in the engineering workshop to AI-powered plant monitoring in the biology greenhouse.\n\nThis article explores the remarkable work being done by BGU's robotics community and what it signals for the future of engineering education.",
      },
      {
        heading: "Robotics in Academic Innovation",
        body: "BGU's robotics lab — equipped with Arduino kits, Raspberry Pi units, and a 3D printing station — has become a hub of innovation. Last semester, a team of five students built an autonomous cart that navigates the campus corridor using ultrasonic sensors and a camera module powered by a TensorFlow Lite model running on-device.\n\nThe project began as a semester assignment but evolved into a full research paper presented at a regional engineering conference. The team is now working on a second version with improved obstacle avoidance and a companion mobile app built with Flutter.",
      },
      {
        heading: "Stadium Operations with Tech",
        body: "One of the most visible robotics applications on campus has been in stadium operations. In partnership with the BGU sports department, a GDG-affiliated team deployed sensor arrays around the campus sports ground to track crowd density and queue lengths in real time. Data was streamed to a Firebase dashboard, allowing event staff to re-route attendees and reduce bottlenecks.\n\nThe system was tested during the annual sports fest, where it helped reduce average queue wait times by 35%. The team is now working with the administration to make it a permanent installation.",
      },
      {
        heading: "What the Future Holds",
        body: "The trajectory is clear: robotics and AI will play an increasingly central role in campus life, not just as subjects of study but as tools that improve the student experience. GDG BGU is committed to supporting this wave of innovation through workshops on ROS (Robot Operating System), embedded ML with TensorFlow Lite, and drone programming.\n\nIf you're passionate about building autonomous systems, join our next Robotics Meetup — details on our community WhatsApp group.",
      },
    ],
    tags: ["Robotics", "AI", "Automation", "ML"],
    relatedIds: [5, 8],
  },
  {
    id: 7,
    title: "Optimizing Stadium Operations with Tech",
    author: "Rohan Das",
    publishDate: "October 26, 2023",
    readTime: 6,
    category: "Campus Innovations",
    categoryColor: "#34A853",
    cardBg: "#0f172a",
    icon: "🏟",
    excerpt:
      "From smart ticketing to real-time crowd analytics, learn how GDG BGU partnered with the sports department to modernize campus events using data-driven tools.",
    sections: [
      {
        heading: "The Challenge of Campus Events",
        body: "Large campus events — sports fests, cultural nights, and annual days — bring hundreds of students, faculty, and guests together. Managing these events efficiently is a logistical challenge: ticketing, crowd flow, vendor coordination, and emergency response all need to work in sync.\n\nGDG BGU took on this challenge last year, partnering with the BGU events committee to deploy a suite of tech tools across the campus stadium.",
      },
      {
        heading: "Smart Ticketing with QR Codes",
        body: "The team built a QR-code-based ticketing system using Firebase and a lightweight Flutter app. Event organizers could generate digital tickets, and volunteers at entry points used the app to scan and validate them in real time. The system handled over 800 ticket validations in the first 30 minutes of the sports fest without a single crash.\n\nFraud prevention was a key feature — each QR code was single-use and tied to the student ID of the registrant, eliminating ticket sharing.",
      },
      {
        heading: "Real-Time Crowd Analytics",
        body: "Using a network of ESP32 microcontrollers and a custom-built web dashboard, the team monitored crowd density across six zones of the stadium. Data was refreshed every 10 seconds and displayed on a map interface accessible to event marshals via their phones.\n\nThis allowed the events team to proactively manage congestion — redirecting attendees before bottlenecks formed, rather than reacting to them after the fact.",
      },
      {
        heading: "Lessons Learned and What's Next",
        body: "The project was a massive learning experience for everyone involved. Networking edge devices reliably across an open-air venue proved harder than expected, and the team had to pivot from WiFi to a LoRa mesh network mid-deployment. But that problem-solving under pressure is exactly what GDG events are designed to cultivate.\n\nFor the upcoming annual day, the team plans to add a vendor sales tracker and an emergency alert broadcast system to the platform.",
      },
    ],
    tags: ["IoT", "Events", "Firebase", "Innovation"],
    relatedIds: [8, 9],
  },
  {
    id: 8,
    title: "From Code to Campus: Building an App",
    author: "Sara Nkosi",
    publishDate: "October 26, 2023",
    readTime: 8,
    category: "Campus Projects",
    categoryColor: "#FBBC05",
    cardBg: "#1e293b",
    icon: "📱",
    excerpt:
      "A step-by-step walkthrough of how a team of four students designed, built, and shipped a campus navigation app using Flutter and Firebase in under two months.",
    sections: [
      {
        heading: "The Idea",
        body: "Every new student at BGU faces the same challenge in their first week: the campus is large, buildings look similar, and the signage isn't always helpful. Our team of four — two developers, one designer, and one product manager — decided to fix that.\n\nWe set a goal: build and ship a campus navigation app in under two months, using only free tools and student licenses. This is the story of how we did it.",
      },
      {
        heading: "Designing the Experience",
        body: "We started with Figma, running two rounds of low-fidelity prototyping with a group of first-year students. Their feedback was eye-opening — they didn't just want a map. They wanted a way to find their next class, discover where to eat, and get walking directions with step counts.\n\nFrom those insights, we defined three core features: an interactive campus map, a class schedule integration, and a 'discover' feed for campus events. We scoped the MVP tightly — just the map and basic directions — and deferred the rest to v2.",
      },
      {
        heading: "Building with Flutter and Firebase",
        body: "We chose Flutter for cross-platform reach (both Android and iOS from a single codebase) and Firebase for our backend. The map was built using the Google Maps Flutter plugin with custom markers for each building. Firebase Firestore held our building directory and event data, and Firebase Auth handled student login via their university email.\n\nThe most technically interesting piece was the routing engine. We used the Google Directions API to generate walking paths between any two points on campus, then overlaid them on our custom map tile layer.",
      },
      {
        heading: "Shipping and What We Learned",
        body: "We soft-launched to a beta group of 50 students six weeks into development. By week eight, we had 300 active users and a 4.3-star rating on our internal feedback form. The most-used feature? The 'find a washroom' quick-action — something we added almost as a joke but turned out to be genuinely essential.\n\nThe biggest lesson: talk to your users early and often. Every hour spent in user research saved us three hours of building the wrong thing. We're now working on v2 with the schedule integration, and we've open-sourced the project on GitHub for other GDG chapters to fork.",
      },
    ],
    tags: ["Flutter", "Firebase", "App Dev", "UX"],
    relatedIds: [5, 7],
  },
  {
    id: 9,
    title: "Optimizing Innovations with Tech",
    author: "James Okafor",
    publishDate: "November 3, 2023",
    readTime: 4,
    category: "Campus Innovations",
    categoryColor: "#34A853",
    cardBg: "#e8f0fe",
    icon: "💡",
    excerpt:
      "A deep dive into the innovations brewing at BGU — from AI-powered scheduling tools to eco-friendly server infrastructure powering the campus data center.",
    sections: [
      {
        heading: "Innovation at BGU",
        body: "Birla Global University has always prioritized innovation as a core institutional value. But in recent years, that ethos has found expression in concrete, student-driven initiatives that are changing how the campus operates day-to-day.\n\nFrom the server room to the seminar hall, technology is being deployed thoughtfully and sustainably. This article profiles three standout innovations from the past academic year.",
      },
      {
        heading: "AI-Powered Scheduling",
        body: "The academic scheduling office at BGU used to spend two weeks every semester manually building the class timetable — balancing room capacity, faculty availability, and student course loads. Last year, a team of CS students built an AI scheduling assistant using constraint satisfaction algorithms that reduced that process to under four hours.\n\nThe tool is now being piloted for the upcoming semester, with the scheduling office reporting high satisfaction with the draft timetables it generates.",
      },
      {
        heading: "Eco-Friendly Server Infrastructure",
        body: "BGU's IT department recently completed a migration from aging on-premise servers to a hybrid cloud setup combining Google Cloud and energy-efficient local hardware. The result was a 40% reduction in the campus data center's power consumption and significantly improved uptime for student-facing systems like the LMS and library catalog.\n\nThe project was completed in collaboration with GDG BGU members who contributed their cloud expertise during the planning phase.",
      },
      {
        heading: "Looking Forward",
        body: "These innovations share a common thread: they were built by students and staff who identified a real problem and had the tools, support, and community to solve it. GDG BGU exists to multiply that kind of initiative — providing resources, mentorship, and a platform to showcase what the BGU community is capable of.\n\nIf you have an innovation idea, bring it to our next community meeting. We'd love to help you build it.",
      },
    ],
    tags: ["AI", "Sustainability", "Cloud", "Campus"],
    relatedIds: [7, 10],
  },
  {
    id: 10,
    title: "Intro to Machine Learning for Beginners",
    author: "Ananya Iyer",
    publishDate: "November 10, 2023",
    readTime: 10,
    category: "AI & Robotics",
    categoryColor: "#EA4335",
    cardBg: "#0f172a",
    icon: "🧠",
    excerpt:
      "No math PhD required. This beginner-friendly guide walks you through core ML concepts using real BGU research datasets and Python notebooks you can run today.",
    sections: [
      {
        heading: "What is Machine Learning?",
        body: "Machine learning is a branch of artificial intelligence where systems learn from data to make predictions or decisions — without being explicitly programmed for each task. Instead of writing rules by hand, you feed the system examples and let it figure out the patterns.\n\nIf that sounds abstract, think of spam filters. Nobody hand-coded rules for every possible spam email. Instead, engineers showed a model thousands of examples of spam and non-spam, and it learned to distinguish them on its own. That's machine learning in action.",
      },
      {
        heading: "Core Concepts You Need to Know",
        body: "Before diving into code, it helps to understand a few key terms. A dataset is the collection of examples your model learns from. Features are the input variables — in a house price model, features might include square footage, number of rooms, and location. Labels are the outputs you're predicting — in that same model, the label would be price.\n\nTraining is the process of feeding your dataset to an algorithm so it can learn the relationship between features and labels. Once trained, you evaluate the model on new data it hasn't seen before — this is called the test set — to see how well it generalizes.",
      },
      {
        heading: "Your First ML Model in Python",
        body: "The best way to learn ML is to build something. We've prepared a Google Colab notebook using a real dataset collected by BGU's Environmental Science department — daily air quality readings from sensors around campus.\n\nThe goal: predict tomorrow's air quality index based on today's temperature, humidity, and wind speed. We'll use scikit-learn's linear regression model. The notebook walks you through loading the data, splitting it into train and test sets, fitting the model, and evaluating it with mean squared error. You can run every cell in under five minutes.",
      },
      {
        heading: "Where to Go from Here",
        body: "Once you're comfortable with linear regression, the natural next steps are classification models (predicting a category, not a number), decision trees, and eventually neural networks. GDG BGU runs a monthly ML study group where members work through Google's Machine Learning Crash Course together.\n\nWe also have a curated reading list and a shared Colab workspace where you can experiment with real datasets. Join our WhatsApp community for the link and meeting schedule. The field is moving fast — the best time to start learning is right now.",
      },
    ],
    tags: ["ML", "Python", "Beginner", "AI"],
    relatedIds: [6, 9],
  },
];

const getBlogById = (id: number) => allBlogs.find((b) => b.id === id);

// ── Global Styles ──────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Google Sans', 'Segoe UI', sans-serif; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  .fade-up { animation: fadeUp 0.5s ease both; }

  .nav-link { position: relative; }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 50%; right: 50%;
    height: 2px;
    background: #1a73e8;
    transition: left 0.2s, right 0.2s;
    border-radius: 2px;
  }
  .nav-link.active::after { left: 0; right: 0; }

  .nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  @media (max-width: 580px) { .nav-inner { padding: 0 20px; } }

  .nav-links {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 4px;
  }
  @media (max-width: 640px) { .nav-links { display: none !important; } }

  .nav-cta { display: flex; align-items: center; gap: 10px; }
  .hamburger {
    display: none; background: none; border: none; cursor: pointer;
    padding: 6px; flex-direction: column; gap: 5px;
  }
  .hamburger span { display: block; width: 22px; height: 2px; background: #202124; border-radius: 2px; transition: transform 0.2s, opacity 0.2s; }

  @media (max-width: 640px) {
    .nav-cta   { display: none !important; }
    .hamburger { display: flex !important; }
  }

  .mobile-drawer {
    position: fixed; top: 64px; left: 0; right: 0;
    background: #fff; border-bottom: 1px solid #e8eaed;
    padding: 16px 20px 20px; display: flex; flex-direction: column; gap: 4px;
    z-index: 99; box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }

  .footer-inner {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
    max-width: 1200px; margin: 0 auto; padding: 32px 60px;
  }
  @media (max-width: 700px) {
    .footer-inner { flex-direction: column; align-items: center; text-align: center; padding: 28px 20px; }
  }

  .blog-detail-layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 60px;
  }
  @media (max-width: 1000px) {
    .blog-detail-layout { grid-template-columns: 1fr; padding: 36px 28px; }
    .detail-sidebar { display: none; }
  }
  @media (max-width: 580px) {
    .blog-detail-layout { padding: 24px 16px; }
  }

  .prose-section { margin-bottom: 36px; }
  .prose-section h2 {
    font-size: 22px;
    font-weight: 700;
    color: #202124;
    margin-bottom: 14px;
    line-height: 1.3;
  }
  .prose-section p {
    font-size: 16px;
    line-height: 1.85;
    color: #3c4043;
    margin-bottom: 16px;
  }

  .related-card {
    border-radius: 14px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 8px rgba(60,64,67,0.10);
    transition: box-shadow 0.25s, transform 0.25s;
    text-decoration: none;
    display: block;
  }
  .related-card:hover {
    box-shadow: 0 8px 28px rgba(60,64,67,0.16);
    transform: translateY(-3px);
  }

  .sidebar-card {
    background: #fff;
    border-radius: 16px;
    padding: 22px 20px;
    box-shadow: 0 2px 8px rgba(60,64,67,0.10);
    margin-bottom: 20px;
  }

  .recent-item {
    padding: 10px 0;
    border-bottom: 1px solid #f1f3f4;
    cursor: pointer;
    transition: color 0.15s;
    text-decoration: none;
    display: block;
  }
  .recent-item:last-child { border-bottom: none; }
  .recent-item:hover .recent-title { color: #1a73e8; }

  .tag-pill {
    display: inline-flex;
    align-items: center;
    padding: 5px 14px;
    border-radius: 20px;
    border: 1.5px solid #dadce0;
    font-size: 12px;
    font-weight: 500;
    color: #5f6368;
    background: #f8f9fa;
    text-decoration: none;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }
  .tag-pill:hover { border-color: #1a73e8; color: #1a73e8; background: #e8f0fe; }

  .reading-progress {
    position: fixed;
    top: 64px;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #1a73e8, #34A853);
    z-index: 99;
    transition: width 0.1s linear;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #1a73e8;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    padding: 8px 0;
    border: none;
    background: none;
    font-family: inherit;
    text-decoration: none;
    transition: gap 0.15s;
  }
  .back-btn:hover { gap: 10px; }

  .share-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #5f6368;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    padding: 8px 16px;
    border: 1px solid #dadce0;
    border-radius: 20px;
    background: #fff;
    font-family: inherit;
    transition: border-color 0.15s, color 0.15s;
  }
  .share-btn:hover { border-color: #1a73e8; color: #1a73e8; }

  .btn-primary { transition: background 0.2s, transform 0.15s; }
  .btn-primary:hover { background: #1558b0 !important; transform: translateY(-1px); }
`;

// ── GDG Logo ───────────────────────────────────────────────────────────────
function GDGLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, userSelect: "none" }}>
      <img src="/gdg-logo.png" alt="gdg logo" width={75} height={75} />
      <div>
        <div style={{ fontWeight: 700, fontSize: 20, lineHeight: 1, color: "#202124", letterSpacing: "-0.3px", marginTop: 7 }}>GDG</div>
        <div style={{ fontWeight: 400, fontSize: 15, color: "#5f6368", letterSpacing: "0.5px" }}>BGU Blog</div>
      </div>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "Blog"] as const;
type NavLink = (typeof NAV_LINKS)[number];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{globalStyles}</style>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "#fff", borderBottom: "1px solid #e8eaed", boxShadow: "0 1px 3px rgba(60,64,67,0.08)" }}>
        <div className="nav-inner">
          <Link href="/" style={{ textDecoration: "none" }}>
            <GDGLogo />
          </Link>
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                href={link === "Home" ? "/" : "/blogs"}
                className={`nav-link${link === "Blog" ? " active" : ""}`}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "8px 20px", fontFamily: "inherit", fontSize: 15,
                  fontWeight: link === "Blog" ? 600 : 400,
                  color: link === "Blog" ? "#1a73e8" : "#3c4043",
                  transition: "color 0.15s", textDecoration: "none",
                }}
              >
                {link}
              </Link>
            ))}
          </div>
          <div className="nav-cta">
            <button className="btn-primary" style={{ background: "#1a73e8", color: "#fff", border: "none", cursor: "pointer", padding: "8px 22px", borderRadius: 20, fontFamily: "inherit", fontSize: 14, fontWeight: 500 }}>
              Subscribe
            </button>
            <button style={{ background: "none", border: "1px solid #dadce0", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 20, fontFamily: "inherit", fontSize: 14, color: "#202124" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#e8eaed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#5f6368"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
              </div>
              Login
            </button>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-drawer">
          {NAV_LINKS.map((link) => (
            <Link
              key={link}
              href={link === "Home" ? "/" : "/blogs"}
              onClick={() => setMenuOpen(false)}
              style={{
                background: link === "Blog" ? "#e8f0fe" : "none",
                border: "none", cursor: "pointer", padding: "13px 16px",
                borderRadius: 10, fontFamily: "inherit", fontSize: 15,
                fontWeight: link === "Blog" ? 600 : 400,
                color: link === "Blog" ? "#1a73e8" : "#3c4043",
                textDecoration: "none", display: "block",
              }}
            >
              {link}
            </Link>
          ))}
          <div style={{ borderTop: "1px solid #e8eaed", marginTop: 10, paddingTop: 14, display: "flex", gap: 10 }}>
            <button style={{ flex: 1, background: "#1a73e8", color: "#fff", border: "none", cursor: "pointer", padding: "11px", borderRadius: 20, fontFamily: "inherit", fontSize: 14, fontWeight: 500 }}>Subscribe</button>
            <button style={{ flex: 1, background: "none", border: "1px solid #dadce0", cursor: "pointer", padding: "11px", borderRadius: 20, fontFamily: "inherit", fontSize: 14, color: "#202124", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#5f6368"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#f8f9fa", borderTop: "1px solid #e8eaed" }}>
      <div className="footer-inner">
        <GDGLogo />
        <div style={{ fontSize: 13, color: "#80868b", marginTop: 5 }}>© 2026 GDG BGU Blog. All rights reserved.</div>
        <div style={{ display: "flex", gap: 20, marginTop: 5 }}>
          {["Privacy", "Terms", "Contact"].map((item) => (
            <span key={item} style={{ fontSize: 13, color: "#1a73e8", cursor: "pointer", fontWeight: 500 }}>{item}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── Hero Banner ────────────────────────────────────────────────────────────
function BlogHero({ blog }: { blog: BlogPost }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #e8f0fe 0%, #fce8e6 40%, #dcfce7 100%)",
      borderBottom: "1px solid #e8eaed",
      padding: "48px 60px 40px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(26,115,232,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: "40%", width: 280, height: 280, borderRadius: "50%", background: "rgba(52,168,83,0.05)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#80868b", marginBottom: 24 }}>
          <Link href="/" style={{ color: "#1a73e8", textDecoration: "none", fontWeight: 500 }}>Home</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
          <Link href="/blogs" style={{ color: "#1a73e8", textDecoration: "none", fontWeight: 500 }}>Blog</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
          <span style={{ color: "#3c4043", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{blog.title}</span>
        </div>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: blog.categoryColor + "18", border: `1px solid ${blog.categoryColor}44`,
          borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 600,
          color: blog.categoryColor, letterSpacing: "0.5px", marginBottom: 20, textTransform: "uppercase" as const,
        }}>
          <span style={{ fontSize: 14 }}>{blog.icon}</span>
          {blog.category}
        </div>

        <h1 className="fade-up" style={{
          fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#202124",
          letterSpacing: "-0.8px", lineHeight: 1.15, marginBottom: 24, maxWidth: 800,
        }}>
          {blog.title}
        </h1>

        <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" as const }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg, #1a73e8, #34A853)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, color: "#fff", fontWeight: 700, flexShrink: 0,
            }}>
              {blog.author.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#202124" }}>{blog.author}</div>
              <div style={{ fontSize: 12, color: "#80868b" }}>Author</div>
            </div>
          </div>
          <div style={{ width: 1, height: 32, background: "#dadce0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span style={{ fontSize: 14, color: "#5f6368" }}>{blog.publishDate}</span>
          </div>
          <div style={{ width: 1, height: 32, background: "#dadce0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <span style={{ fontSize: 14, color: "#5f6368" }}>{blog.readTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Related Card ───────────────────────────────────────────────────────────
function RelatedCard({ blog }: { blog: BlogPost }) {
  return (
    <Link href={`/blogs/${blog.id}`} className="related-card">
      <div style={{ background: blog.cardBg, height: 100, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <span style={{ fontSize: 36, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.18))" }}>{blog.icon}</span>
        <span style={{
          position: "absolute", top: 10, left: 10,
          background: blog.categoryColor + "28", border: `1px solid ${blog.categoryColor}55`,
          color: blog.categoryColor, fontSize: 10, fontWeight: 600,
          padding: "2px 8px", borderRadius: 10, letterSpacing: "0.5px",
        }}>
          {blog.category}
        </span>
      </div>
      <div style={{ padding: "14px 16px 18px" }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#202124", lineHeight: 1.35, marginBottom: 6 }}>{blog.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg, #1a73e8, #34A853)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff", fontWeight: 700 }}>{blog.author.charAt(0)}</div>
          <span style={{ fontSize: 11, color: "#80868b" }}>{blog.author} · {blog.readTime} min</span>
        </div>
      </div>
    </Link>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────────────
function DetailSidebar({ currentId }: { currentId: number }) {
  const otherPosts = allBlogs.filter((b) => b.id !== currentId).slice(0, 5);

  return (
    <aside className="detail-sidebar">
      <div className="sidebar-card">
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#202124", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 3, height: 18, background: "#1a73e8", borderRadius: 2, display: "inline-block" }} />
          In this article
        </h3>
        {allBlogs.find((b) => b.id === currentId)?.sections.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: "1px solid #f1f3f4" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#1a73e8", minWidth: 18, marginTop: 1 }}>{i + 1}</span>
            <span style={{ fontSize: 13, color: "#3c4043", lineHeight: 1.4 }}>{s.heading}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-card">
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#202124", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 3, height: 18, background: "#34A853", borderRadius: 2, display: "inline-block" }} />
          More Articles
        </h3>
        {otherPosts.map((post) => (
          <Link key={post.id} href={`/blogs/${post.id}`} className="recent-item">
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1.2 }}>{post.icon}</span>
              <div>
                <div className="recent-title" style={{ fontSize: 13, fontWeight: 600, color: "#202124", lineHeight: 1.35, marginBottom: 3, transition: "color 0.15s" }}>{post.title}</div>
                <div style={{ fontSize: 11, color: "#80868b" }}>{post.publishDate} · {post.readTime} min read</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ background: "linear-gradient(135deg, #1a73e8 0%, #34A853 100%)", borderRadius: 16, padding: "22px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 24, marginBottom: 10 }}>📬</div>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Stay in the Loop</h3>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", marginBottom: 16, lineHeight: 1.5 }}>Get the latest GDG BGU articles delivered to your inbox.</p>
        <button style={{ width: "100%", background: "#fff", color: "#1a73e8", border: "none", cursor: "pointer", padding: "10px", borderRadius: 20, fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}>
          Subscribe Now
        </button>
      </div>
    </aside>
  );
}

// ── 404 State ──────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Navbar />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: "40px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>📄</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#202124", marginBottom: 12 }}>Article Not Found</h1>
        <p style={{ fontSize: 15, color: "#5f6368", marginBottom: 28, maxWidth: 400, lineHeight: 1.6 }}>The article you're looking for doesn't exist or may have been moved.</p>
        <Link href="/blogs" style={{ textDecoration: "none" }}>
          <button className="btn-primary" style={{ background: "#1a73e8", color: "#fff", border: "none", cursor: "pointer", padding: "12px 28px", borderRadius: 24, fontFamily: "inherit", fontSize: 15, fontWeight: 500 }}>
            Browse All Articles
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function BlogDetailPage() {
  const params = useParams();
  const id = Number(params?.id);
  const blog = getBlogById(id);

  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleScroll = () => {
    const el = document.documentElement;
    const scrolled = el.scrollTop;
    const total = el.scrollHeight - el.clientHeight;
    setReadProgress(total > 0 ? (scrolled / total) * 100 : 0);
  };

  if (typeof window !== "undefined") {
    window.onscroll = handleScroll;
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!blog) return <NotFound />;

  const relatedBlogs = blog.relatedIds.map(getBlogById).filter(Boolean) as BlogPost[];

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <div className="reading-progress" style={{ width: `${readProgress}%` }} />
      <Navbar />
      <BlogHero blog={blog} />

      <div className="blog-detail-layout">
        <main className="fade-up">
          <div style={{
            background: "#fff", borderRadius: 16, padding: "24px 28px",
            boxShadow: "0 2px 8px rgba(60,64,67,0.10)",
            borderLeft: `4px solid ${blog.categoryColor}`, marginBottom: 36,
          }}>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#3c4043", fontStyle: "italic", margin: 0 }}>
              {blog.excerpt}
            </p>
          </div>

          <div style={{
            background: "#fff", borderRadius: 16, padding: "36px 40px",
            boxShadow: "0 2px 8px rgba(60,64,67,0.10)", marginBottom: 32,
          }}>
            {blog.sections.map((section, idx) => (
              <div key={idx} className="prose-section">
                <h2>{section.heading}</h2>
                {section.body.split("\n\n").map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
                {idx < blog.sections.length - 1 && (
                  <div style={{ height: 1, background: "#f1f3f4", margin: "28px 0 0" }} />
                )}
              </div>
            ))}
          </div>

          <div style={{
            background: "#fff", borderRadius: 16, padding: "20px 28px",
            boxShadow: "0 2px 8px rgba(60,64,67,0.10)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap" as const, gap: 16, marginBottom: 40,
          }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#80868b", fontWeight: 500, marginRight: 4 }}>Tags:</span>
              {blog.tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
            <button className="share-btn" onClick={handleShare}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              {copied ? "Link copied!" : "Share article"}
            </button>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #e8f0fe 0%, #dcfce7 100%)",
            borderRadius: 16, padding: "28px 32px",
            display: "flex", gap: 20, alignItems: "center", marginBottom: 40, flexWrap: "wrap" as const,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg, #1a73e8, #34A853)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, color: "#fff", fontWeight: 700, flexShrink: 0,
            }}>
              {blog.author.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#1a73e8", letterSpacing: "1px", textTransform: "uppercase" as const, marginBottom: 4 }}>Written by</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#202124", marginBottom: 4 }}>{blog.author}</div>
              <div style={{ fontSize: 13, color: "#5f6368", lineHeight: 1.5 }}>
                Member of GDG BGU · Sharing insights from the BGU tech community.
              </div>
            </div>
          </div>

          {relatedBlogs.length > 0 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ width: 3, height: 22, background: "#1a73e8", borderRadius: 2, display: "inline-block" }} />
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#202124" }}>Related Articles</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
                {relatedBlogs.map((rb) => (
                  <RelatedCard key={rb.id} blog={rb} />
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid #e8eaed" }}>
            <Link href="/blogs" className="back-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </main>

        <DetailSidebar currentId={id} />
      </div>

      <Footer />
    </div>
  );
}