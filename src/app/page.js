"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { 
  FaSearch, 
  FaArrowsAlt, 
  FaFolder, 
  FaImages, 
  FaCheckSquare, 
  FaComments, 
  FaKeyboard, 
  FaChartLine, 
  FaStar, 
  FaClock,
  FaGamepad,
  FaCalculator,
  FaPalette,
  FaBook,
  FaPlane,
  FaCode,
  FaRocket
} from "react-icons/fa";

const components = [
  { 
    name: "autocomplete", 
    url: "/autocomplete", 
    title: "Autocomplete Search",
    description: "Smart search component with real-time suggestions and filtering",
    icon: FaSearch,
    category: "input"
  },
  { 
    name: "draganddrop", 
    url: "/draganddrop", 
    title: "Drag & Drop",
    description: "Interactive drag and drop interface for file management",
    icon: FaArrowsAlt,
    category: "interaction"
  },
  { 
    name: "file-explorer", 
    url: "/file-explorer", 
    title: "File Explorer",
    description: "Navigate through folders and files with tree structure",
    icon: FaFolder,
    category: "navigation"
  },
  { 
    name: "imagecarousal", 
    url: "/imagecarousal", 
    title: "Image Carousel",
    description: "Smooth image slider with navigation controls",
    icon: FaImages,
    category: "media"
  },
  { 
    name: "nested-checkboxes", 
    url: "/nested-checkboxes", 
    title: "Nested Checkboxes",
    description: "Hierarchical checkbox system with parent-child relationships",
    icon: FaCheckSquare,
    category: "input"
  },
  { 
    name: "nestedcomments", 
    url: "/nestedcomments", 
    title: "Nested Comments",
    description: "Reddit-style threaded comment system with replies",
    icon: FaComments,
    category: "social"
  },
  { 
    name: "otp-input", 
    url: "/otp-input", 
    title: "OTP Input",
    description: "One-time password input with auto-focus and validation",
    icon: FaKeyboard,
    category: "input"
  },
  { 
    name: "progressbar", 
    url: "/progressbar", 
    title: "Progress Bar",
    description: "Animated progress indicators for loading states",
    icon: FaChartLine,
    category: "feedback"
  },
  { 
    name: "starrating", 
    url: "/starrating", 
    title: "Star Rating",
    description: "Interactive star rating component for user feedback",
    icon: FaStar,
    category: "input"
  },
  { 
    name: "timer", 
    url: "/timer", 
    title: "Timer",
    description: "Countdown and stopwatch functionality with controls",
    icon: FaClock,
    category: "utility"
  }
];

const games = [
  { 
    name: "boardgame", 
    url: "/boardgame", 
    title: "Board Game",
    description: "Interactive board game with strategic gameplay",
    icon: FaGamepad,
    category: "strategy"
  },
  { 
    name: "calculator", 
    url: "/calculator", 
    title: "Calculator",
    description: "Full-featured calculator with advanced operations",
    icon: FaCalculator,
    category: "utility"
  },
  { 
    name: "color-matching", 
    url: "/color-matching", 
    title: "Color Matching",
    description: "Test your color perception and matching skills",
    icon: FaPalette,
    category: "puzzle"
  },
  { 
    name: "dictionary", 
    url: "/dictionary", 
    title: "Dictionary Game",
    description: "Word lookup and vocabulary building game",
    icon: FaBook,
    category: "educational"
  },
  { 
    name: "flight-game", 
    url: "/flight-game", 
    title: "Flight Game",
    description: "Navigate through obstacles in this exciting flight adventure",
    icon: FaPlane,
    category: "action"
  }
];

export default function Home() {
  const renderCard = (item, index) => {
    const IconComponent = item.icon;
    
    return (
      <Link 
        href={item.url} 
        key={item.name} 
        className={styles.card}
      >
        <div className={styles.cardIcon}>
          <IconComponent />
        </div>
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={styles.cardDescription}>{item.description}</p>
          <span className={styles.cardCategory}>{item.category}</span>
        </div>
      </Link>
    );
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <FaCode className={styles.heroIcon} />
          <h1 className={styles.heroTitle}>Frontend Component Library</h1>
          <p className={styles.heroDescription}>
            Explore my collection of interactive React components and engaging games. 
            Each component is built with modern web technologies and best practices.
          </p>
        </div>
      </header>

      {/* Components Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <FaRocket className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>UI Components</h2>
          <p className={styles.sectionDescription}>
            Reusable React components for building modern web applications
          </p>
        </div>
        <div className={styles.grid}>
          {components.map((item, index) => renderCard(item, index))}
        </div>
      </section>

      {/* Games Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <FaGamepad className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Interactive Games</h2>
          <p className={styles.sectionDescription}>
            Fun and engaging games built with React for entertainment and learning
          </p>
        </div>
        <div className={styles.grid}>
          {games.map((item, index) => renderCard(item, index))}
        </div>
      </section>
    </div>
  );
}
