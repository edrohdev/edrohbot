export interface RoboticsEvent {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  startDate: string;
  endDate: string;
  year: number;
  category: "conference" | "expo" | "summit" | "symposium";
  website?: string;
  isPast: boolean;
}

export const roboticsEvents: RoboticsEvent[] = [
  // 2024 Events
  {
    id: "ces-2024",
    title: "Consumer Electronics Show (CES)",
    shortDescription:
      "World's most influential technology event showcasing latest consumer electronics and innovations.",
    fullDescription:
      "CES is the world's gathering place for all those who thrive on the business of consumer technologies. It has served as the proving ground for innovators and breakthrough technologies for 50+ years — the global stage where next-generation innovations are introduced to the marketplace.",
    location: "Las Vegas, NV, USA",
    startDate: "2024-01-09",
    endDate: "2024-01-12",
    year: 2024,
    category: "expo",
    website: "https://www.ces.tech",
    isPast: true,
  },
  {
    id: "aaai-2024",
    title: "AAAI Conference",
    shortDescription:
      "Premier conference on artificial intelligence research and applications.",
    fullDescription:
      "The Association for the Advancement of Artificial Intelligence (AAAI) Conference is one of the most prestigious venues for presenting new research results, innovative ideas and progress in AI.",
    location: "Vancouver, BC, Canada",
    startDate: "2024-02-22",
    endDate: "2024-02-27",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "icara-2024",
    title: "ICARA",
    shortDescription:
      "International Conference on Advanced Robotics and Automation.",
    fullDescription:
      "ICARA focuses on the latest developments in robotics and automation technologies, bringing together researchers, engineers, and industry professionals.",
    location: "Athens, Greece",
    startDate: "2024-02-22",
    endDate: "2024-02-24",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "icmre-2024",
    title: "ICMRE",
    shortDescription:
      "International Conference on Mechatronics and Robotics Engineering.",
    fullDescription:
      "ICMRE brings together leading academic scientists, researchers and scholars to exchange experiences and research results on mechatronics and robotics engineering.",
    location: "Milan, Italy",
    startDate: "2024-02-27",
    endDate: "2024-02-29",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "robotics-summit-2024",
    title: "Robotics Summit & Expo",
    shortDescription:
      "Leading robotics event connecting the robotics community.",
    fullDescription:
      "The Robotics Summit & Expo is designed to be an educational and networking hub for the robotics community. The event covers the latest in robotics technology, applications, and market trends.",
    location: "Boston, MA, USA",
    startDate: "2024-05-01",
    endDate: "2024-05-02",
    year: 2024,
    category: "summit",
    isPast: true,
  },
  {
    id: "automate-2024",
    title: "Automate",
    shortDescription:
      "North America's largest automation trade show and conference.",
    fullDescription:
      "Automate showcases the full spectrum of automation technologies and solutions, including robotics, machine vision, motion control, AI, and more.",
    location: "Chicago, IL, USA",
    startDate: "2024-05-06",
    endDate: "2024-05-09",
    year: 2024,
    category: "expo",
    isPast: true,
  },
  {
    id: "icra-2024",
    title: "IEEE International Conference on Robotics and Automation (ICRA)",
    shortDescription:
      "Premier international robotics conference with cutting-edge research.",
    fullDescription:
      "ICRA is IEEE Robotics and Automation Society's biggest conference and the premier international forum for robotics researchers to present their work.",
    location: "Yokohama, Japan",
    startDate: "2024-05-13",
    endDate: "2024-05-17",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "icuas-2024",
    title: "ICUAS",
    shortDescription: "International Conference on Unmanned Aircraft Systems.",
    fullDescription:
      "ICUAS is the world's largest technical conference focusing on unmanned aircraft systems (UAS), covering all aspects of UAS research and development.",
    location: "Chania, Greece",
    startDate: "2024-06-04",
    endDate: "2024-06-07",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "cvpr-2024",
    title: "CVPR",
    shortDescription: "Computer Vision and Pattern Recognition conference.",
    fullDescription:
      "CVPR is the premier annual computer vision event comprising the main conference and several co-located workshops and short courses.",
    location: "Seattle, WA, USA",
    startDate: "2024-06-17",
    endDate: "2024-06-21",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "remar-2024",
    title: "ReMar",
    shortDescription: "Robotics for Manufacturing conference.",
    fullDescription:
      "ReMar focuses on the application of robotics in manufacturing environments, showcasing the latest innovations and case studies.",
    location: "Chicago, IL, USA",
    startDate: "2024-06-24",
    endDate: "2024-06-26",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "rss-2024",
    title: "RSS (Robotics: Science and Systems)",
    shortDescription: "Premier academic conference in robotics.",
    fullDescription:
      "RSS is a single-track conference that brings together researchers working on the algorithmic and mathematical foundations of robotics.",
    location: "Delft, Netherlands",
    startDate: "2024-07-01",
    endDate: "2024-07-05",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "romoco-2024",
    title: "ROMOCO",
    shortDescription: "International Conference on Robot Motion and Control.",
    fullDescription:
      "ROMOCO focuses on theoretical and practical aspects of robot motion planning, control algorithms, and their applications.",
    location: "Poznan, Poland",
    startDate: "2024-07-02",
    endDate: "2024-07-05",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "case-2024",
    title: "CASE",
    shortDescription:
      "IEEE International Conference on Automation Science and Engineering.",
    fullDescription:
      "CASE is the flagship automation conference of the IEEE Robotics and Automation Society, focusing on automation science and engineering.",
    location: "Bari, Italy",
    startDate: "2024-08-28",
    endDate: "2024-08-30",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "icrcv-2024",
    title: "ICRCV",
    shortDescription:
      "International Conference on Robotics, Control and Vision.",
    fullDescription:
      "ICRCV brings together researchers and practitioners working on robotics, control systems, and computer vision technologies.",
    location: "Wuxi, China",
    startDate: "2024-09-20",
    endDate: "2024-09-22",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "robot-safety-2024",
    title: "International Robot Safety Conference",
    shortDescription:
      "Conference focused on robot safety standards and practices.",
    fullDescription:
      "This conference addresses critical safety considerations in robotics, covering standards, risk assessment, and safety system design.",
    location: "Cincinnati, OH, USA",
    startDate: "2024-10-01",
    endDate: "2024-10-03",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "amr-logistics-2024",
    title: "Autonomous Mobile Robots & Logistics",
    shortDescription:
      "Conference on autonomous mobile robots in logistics applications.",
    fullDescription:
      "This event focuses on the deployment and optimization of autonomous mobile robots in logistics and warehouse operations.",
    location: "Memphis, TN, USA",
    startDate: "2024-10-08",
    endDate: "2024-10-10",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "iros-2024",
    title:
      "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)",
    shortDescription:
      "Major international conference on robotics and intelligent systems.",
    fullDescription:
      "IROS is one of the largest and most impacting robotics research conferences worldwide, covering all areas of robotics and intelligent systems.",
    location: "Abu Dhabi, UAE",
    startDate: "2024-10-13",
    endDate: "2024-10-17",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "robobusiness-2024",
    title: "RoboBusiness",
    shortDescription: "Business-focused robotics conference and expo.",
    fullDescription:
      "RoboBusiness focuses on the commercial robotics market, covering business strategies, market trends, and investment opportunities.",
    location: "Santa Clara, CA, USA",
    startDate: "2024-10-15",
    endDate: "2024-10-16",
    year: 2024,
    category: "conference",
    isPast: true,
  },
  {
    id: "roscon-2024",
    title: "ROSCon",
    shortDescription: "Conference for Robot Operating System (ROS) developers.",
    fullDescription:
      "ROSCon is the premier conference for ROS developers, featuring talks, tutorials, and networking for the ROS community.",
    location: "Singapore",
    startDate: "2024-10-21",
    endDate: "2024-10-23",
    year: 2024,
    category: "conference",
    isPast: true,
  },

  // 2025 Events
  {
    id: "ces-2025",
    title: "Consumer Electronics Show (CES)",
    shortDescription:
      "World's most influential technology event showcasing latest consumer electronics and innovations.",
    fullDescription:
      "CES 2025 continues to be the world's gathering place for all those who thrive on the business of consumer technologies, featuring the latest innovations in robotics, AI, and automation.",
    location: "Las Vegas, NV, USA",
    startDate: "2025-01-07",
    endDate: "2025-01-10",
    year: 2025,
    category: "expo",
    website: "https://www.ces.tech",
    isPast: false,
  },
  {
    id: "kros-2025",
    title: "KROS Conference",
    shortDescription: "Korea Robotics Society annual conference.",
    fullDescription:
      "The KROS Conference brings together Korean and international robotics researchers to share the latest developments in robotics technology.",
    location: "Alpensia, Gangwon-do, South Korea",
    startDate: "2025-02-12",
    endDate: "2025-02-15",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "nvidia-gtc-2025",
    title: "NVIDIA GTC AI Conference",
    shortDescription: "Premier AI and deep learning conference.",
    fullDescription:
      "NVIDIA GTC showcases the latest breakthroughs in AI, deep learning, and GPU computing, with significant focus on robotics applications.",
    location: "San Jose, CA, USA",
    startDate: "2025-03-17",
    endDate: "2025-03-21",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "erf-2025",
    title: "European Robotics Forum (ERF)",
    shortDescription:
      "Europe's most influential meeting of the robotics community.",
    fullDescription:
      "ERF is the premier European event that brings together robotics researchers, entrepreneurs, and policymakers to discuss the latest trends and challenges.",
    location: "Stuttgart, Germany",
    startDate: "2025-03-25",
    endDate: "2025-03-27",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "robotics-summit-2025",
    title: "Robotics Summit and Expo",
    shortDescription:
      "Leading robotics event connecting the robotics community.",
    fullDescription:
      "The 2025 Robotics Summit & Expo continues to be an educational and networking hub for the robotics community, featuring the latest technological advances.",
    location: "Boston, MA, USA",
    startDate: "2025-04-30",
    endDate: "2025-05-01",
    year: 2025,
    category: "summit",
    isPast: false,
  },
  {
    id: "automate-2025",
    title: "Automate",
    shortDescription:
      "North America's largest automation trade show and conference.",
    fullDescription:
      "Automate 2025 showcases the full spectrum of automation technologies, with expanded focus on collaborative robotics and AI integration.",
    location: "Detroit, MI, USA",
    startDate: "2025-05-12",
    endDate: "2025-05-15",
    year: 2025,
    category: "expo",
    isPast: false,
  },
  {
    id: "icra-2025",
    title: "IEEE International Conference on Robotics and Automation (ICRA)",
    shortDescription:
      "Premier international robotics conference with cutting-edge research.",
    fullDescription:
      "ICRA 2025 continues to be the premier international forum for robotics researchers to present groundbreaking work and latest innovations.",
    location: "Atlanta, GA, USA",
    startDate: "2025-05-19",
    endDate: "2025-05-23",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "rss-2025",
    title: "RSS (Robotics: Science and Systems)",
    shortDescription: "Premier academic conference in robotics.",
    fullDescription:
      "RSS 2025 brings together researchers working on the algorithmic and mathematical foundations of robotics, fostering interdisciplinary collaboration.",
    location: "TBA",
    startDate: "2025-07-01",
    endDate: "2025-07-05",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "case-2025",
    title: "CASE",
    shortDescription:
      "IEEE International Conference on Automation Science and Engineering.",
    fullDescription:
      "CASE 2025 focuses on automation science and engineering, bridging the gap between theory and industrial applications.",
    location: "Anaheim, CA, USA",
    startDate: "2025-08-18",
    endDate: "2025-08-22",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "icdl-2025",
    title: "IEEE International Conference on Development and Learning (ICDL)",
    shortDescription:
      "Conference on developmental robotics and machine learning.",
    fullDescription:
      "ICDL explores how robots and artificial systems can develop and learn, drawing inspiration from biological development and learning.",
    location: "Prague, Czech Republic",
    startDate: "2025-09-16",
    endDate: "2025-09-19",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "humanoids-2025",
    title: "IEEE-RAS International Conference on Humanoid Robots (Humanoids)",
    shortDescription: "Premier conference on humanoid robotics.",
    fullDescription:
      "Humanoids 2025 focuses on research and development of humanoid robots, covering locomotion, manipulation, perception, and human-robot interaction.",
    location: "Seoul, South Korea",
    startDate: "2025-09-30",
    endDate: "2025-10-02",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "cbs-2025",
    title: "IEEE International Conference on Cyborg and Bionic Systems (CBS)",
    shortDescription: "Conference on cyborg and bionic systems.",
    fullDescription:
      "CBS focuses on the integration of biological and artificial systems, exploring cyborg technologies and bionic applications.",
    location: "Beijing, China",
    startDate: "2025-10-17",
    endDate: "2025-10-19",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "iros-2025",
    title:
      "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)",
    shortDescription:
      "Major international conference on robotics and intelligent systems.",
    fullDescription:
      "IROS 2025 continues to be one of the largest and most impacting robotics research conferences worldwide.",
    location: "Hangzhou, China",
    startDate: "2025-10-19",
    endDate: "2025-10-25",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "ssrr-2025",
    title:
      "IEEE International Symposium on Safety, Security, and Rescue Robotics (SSRR)",
    shortDescription:
      "Symposium on robotics for safety and rescue applications.",
    fullDescription:
      "SSRR focuses on robotics applications in safety, security, and rescue scenarios, addressing real-world challenges and solutions.",
    location: "Galway, Ireland",
    startDate: "2025-10-29",
    endDate: "2025-10-31",
    year: 2025,
    category: "symposium",
    isPast: false,
  },
  {
    id: "iccas-2025",
    title:
      "International Conference on Control, Automation and Systems (ICCAS)",
    shortDescription: "Conference on control and automation systems.",
    fullDescription:
      "ICCAS brings together researchers and practitioners in control theory, automation, and robotics systems.",
    location: "Incheon, South Korea",
    startDate: "2025-11-04",
    endDate: "2025-11-07",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "icir-2025",
    title: "IEEE International Conference on Intelligent Reality (ICIR)",
    shortDescription:
      "Conference on intelligent reality and immersive technologies.",
    fullDescription:
      "ICIR explores the intersection of AI, robotics, and immersive technologies, including VR, AR, and mixed reality applications.",
    location: "Boston, MA, USA",
    startDate: "2025-11-16",
    endDate: "2025-11-18",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "iccma-2025",
    title:
      "International Conference on Control, Mechatronics and Automation (ICCMA)",
    shortDescription: "Conference on control, mechatronics, and automation.",
    fullDescription:
      "ICCMA addresses the latest developments in control systems, mechatronic design, and automation technologies.",
    location: "Paris, France",
    startDate: "2025-11-24",
    endDate: "2025-11-26",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "isparo-2025",
    title: "International Conference on Space Robotics (iSpaRo)",
    shortDescription: "Conference on space robotics and exploration.",
    fullDescription:
      "iSpaRo focuses on robotics applications in space exploration, including planetary rovers, orbital robotics, and space manufacturing.",
    location: "Sendai, Japan",
    startDate: "2025-12-01",
    endDate: "2025-12-04",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "icar-2025",
    title: "IEEE International Conference on Advanced Robotics (ICAR)",
    shortDescription: "Conference on advanced robotics research.",
    fullDescription:
      "ICAR presents the latest research in advanced robotics, covering novel mechanisms, control strategies, and applications.",
    location: "San Juan, Argentina",
    startDate: "2025-12-02",
    endDate: "2025-12-05",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "robio-2025",
    title: "IEEE International Conference on Robotics and Biomimetics (ROBIO)",
    shortDescription: "Conference on robotics and biomimetics.",
    fullDescription:
      "ROBIO explores bio-inspired robotics and biomimetic systems, bridging biology and robotics research.",
    location: "Chengdu, China",
    startDate: "2025-12-03",
    endDate: "2025-12-07",
    year: 2025,
    category: "conference",
    isPast: false,
  },
  {
    id: "mrs-2025",
    title:
      "IEEE International Symposium on Multi-Robot and Multi-Agent Systems (MRS)",
    shortDescription: "Symposium on multi-robot systems.",
    fullDescription:
      "MRS focuses on coordination, cooperation, and control of multiple robots and autonomous agents working together.",
    location: "Singapore",
    startDate: "2025-12-04",
    endDate: "2025-12-05",
    year: 2025,
    category: "symposium",
    isPast: false,
  },
  {
    id: "robobusiness-2025",
    title: "RoboBusiness",
    shortDescription: "Business-focused robotics conference and expo.",
    fullDescription:
      "RoboBusiness 2025 continues to focus on the commercial robotics market, featuring business strategies and investment opportunities.",
    location: "Santa Clara, CA, USA",
    startDate: "2025-10-15",
    endDate: "2025-10-16",
    year: 2025,
    category: "conference",
    isPast: false,
  },

  // 2026 Events
  {
    id: "ces-2026",
    title: "Consumer Electronics Show (CES)",
    shortDescription:
      "World's most influential technology event showcasing latest consumer electronics and innovations.",
    fullDescription:
      "CES 2026 continues the tradition of showcasing revolutionary technology, with robotics and AI taking center stage.",
    location: "Las Vegas, NV, USA",
    startDate: "2026-01-06",
    endDate: "2026-01-09",
    year: 2026,
    category: "expo",
    isPast: false,
  },
  {
    id: "sii-2026",
    title: "IEEE/SICE International Symposium on System Integration (SII)",
    shortDescription: "Symposium on system integration in robotics.",
    fullDescription:
      "SII focuses on the integration of various technologies and systems in robotics, automation, and intelligent systems.",
    location: "Cancun, Mexico",
    startDate: "2026-01-11",
    endDate: "2026-01-14",
    year: 2026,
    category: "symposium",
    isPast: false,
  },
  {
    id: "hri-2026",
    title: "ACM/IEEE International Conference on Human-Robot Interaction (HRI)",
    shortDescription: "Premier conference on human-robot interaction.",
    fullDescription:
      "HRI is the premier conference for presenting research on all aspects of human-robot interaction.",
    location: "Edinburgh, United Kingdom",
    startDate: "2026-03-16",
    endDate: "2026-03-19",
    year: 2026,
    category: "conference",
    isPast: false,
  },
  {
    id: "haptics-2026",
    title: "IEEE Haptics Symposium",
    shortDescription: "Premier conference on haptic technology.",
    fullDescription:
      "The IEEE Haptics Symposium presents research on haptic technology and its applications in robotics and human-computer interaction.",
    location: "Reno, Nevada, USA",
    startDate: "2026-03-29",
    endDate: "2026-04-01",
    year: 2026,
    category: "symposium",
    isPast: false,
  },
  {
    id: "icra-2026",
    title: "IEEE International Conference on Robotics and Automation (ICRA)",
    shortDescription:
      "Premier international robotics conference with cutting-edge research.",
    fullDescription:
      "ICRA 2026 returns to Europe, showcasing the latest breakthroughs in robotics research and automation technology.",
    location: "Vienna, Austria",
    startDate: "2026-06-01",
    endDate: "2026-06-05",
    year: 2026,
    category: "conference",
    isPast: false,
  },
  {
    id: "aim-2026",
    title:
      "IEEE/ASME International Conference on Advanced Intelligent Mechatronics (AIM)",
    shortDescription: "Conference on intelligent mechatronics.",
    fullDescription:
      "AIM focuses on the integration of mechanical, electrical, and computer engineering in intelligent mechatronic systems.",
    location: "Genova, Italy",
    startDate: "2026-07-07",
    endDate: "2026-07-11",
    year: 2026,
    category: "conference",
    isPast: false,
  },
  {
    id: "biorob-2026",
    title:
      "IEEE RAS/EMBS International Conference on Biomedical Robotics and Biomechatronics (BioRob)",
    shortDescription: "Conference on biomedical robotics.",
    fullDescription:
      "BioRob focuses on robotics and biomechatronics applications in medicine, rehabilitation, and healthcare.",
    location: "Edmonton, Alberta, Canada",
    startDate: "2026-08-01",
    endDate: "2026-08-04",
    year: 2026,
    category: "conference",
    isPast: false,
  },

  // Future Events (2027 & Beyond)
  {
    id: "icra-2027",
    title: "IEEE International Conference on Robotics and Automation (ICRA)",
    shortDescription:
      "Premier international robotics conference with cutting-edge research.",
    fullDescription:
      "ICRA 2027 returns to Asia, continuing the tradition of presenting the most innovative robotics research globally.",
    location: "Seoul, South Korea",
    startDate: "2027-05-24",
    endDate: "2027-05-28",
    year: 2027,
    category: "conference",
    isPast: false,
  },
  {
    id: "icra-2028",
    title: "IEEE International Conference on Robotics and Automation (ICRA)",
    shortDescription:
      "Premier international robotics conference with cutting-edge research.",
    fullDescription:
      "ICRA 2028 ventures to Mexico, expanding the global reach of robotics research and collaboration.",
    location: "Guadalajara, Jalisco, Mexico",
    startDate: "2028-05-15",
    endDate: "2028-05-19",
    year: 2028,
    category: "conference",
    isPast: false,
  },
];

// Helper functions
export const getUpcomingEvents = (): RoboticsEvent[] => {
  const today = new Date();
  return roboticsEvents
    .filter((event) => new Date(event.startDate) >= today)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
};

export const getPastEvents = (): RoboticsEvent[] => {
  const today = new Date();
  return roboticsEvents
    .filter((event) => new Date(event.endDate) < today)
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
};

export const getEventsByYear = (year: number): RoboticsEvent[] => {
  return roboticsEvents
    .filter((event) => event.year === year)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
};

export const getAllYears = (): number[] => {
  const years = Array.from(new Set(roboticsEvents.map((event) => event.year)));
  return years.sort((a, b) => a - b);
};
