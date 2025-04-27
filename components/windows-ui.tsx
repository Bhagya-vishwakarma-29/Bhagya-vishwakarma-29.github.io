import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Folder, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  Search, 
  Settings, 
  Power, 
  Wifi, 
  Volume2, 
  Calendar,
  Clock,
  Sun,
  Moon,
  X,
  WifiOff,
  VolumeX,
  ChevronUp,
  ChevronDown,
  User,
  Code2,
  Monitor,
  Briefcase,
  GraduationCap,
  MapPin,
  Globe,
  Image,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Trophy,
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  XCircle,
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer
} from 'lucide-react';

interface WindowsUIProps {
  onOpenProject: (projectId: string) => void;
  onOpenContact: () => void;
}

interface SearchItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: () => void;
}

interface Wallpaper {
  id: string;
  url: string;
  name: string;
  category: string;
}

interface SnakeGame {
  snake: Array<{ x: number; y: number }>;
  food: { x: number; y: number };
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  score: number;
  isGameOver: boolean;
  highScore: number;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: number;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: Array<{
    day: string;
    temperature: number;
    condition: string;
  }>;
}

const wallpapers: Wallpaper[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGFya3xlbnwwfHwwfHx8MA%3D%3D',
    name: 'Cosmic Night',
    category: 'Space'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1431440869543-efaf3388c585?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhcmt8ZW58MHx8MHx8fDA%3D',
    name: 'Neon City',
    category: 'Urban'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1535868463750-c78d9543614f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRhcmt8ZW58MHx8MHx8fDA%3D',
    name: 'Dark Forest',
    category: 'Nature'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1744719256525-3deab6fd16ac?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Cyberpunk Alley',
    category: 'Futuristic'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1510987836583-e3fb9586c7b3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRhcmt8ZW58MHx8MHx8fDA%3D',
    name: 'Abstract Dark',
    category: 'Abstract'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1504903271097-d7e7c7f5f7ad?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRhcmt8ZW58MHx8MHx8fDA%3D',
    name: 'Mountain Night',
    category: 'Landscape'
  }
];

export const WindowsUI: React.FC<WindowsUIProps> = ({ onOpenProject, onOpenContact }) => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showShutdownMenu, setShowShutdownMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showWifiMenu, setShowWifiMenu] = useState(false);
  const [showVolumeMenu, setShowVolumeMenu] = useState(false);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showFullProfile, setShowFullProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [wifiConnected, setWifiConnected] = useState(true);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [showWallpaperMenu, setShowWallpaperMenu] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState<Wallpaper>(wallpapers[0]);
  const [wallpaperTransition, setWallpaperTransition] = useState(false);
  const [wallpaperGalleryIndex, setWallpaperGalleryIndex] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [snakeGame, setSnakeGame] = useState<SnakeGame>({
    snake: [{ x: 5, y: 5 }],
    food: { x: 10, y: 10 },
    direction: 'RIGHT',
    score: 0,
    isGameOver: false,
    highScore: 0
  });
  const gameInterval = useRef<NodeJS.Timeout>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationTimeout = useRef<NodeJS.Timeout>();
  const [showWeather, setShowWeather] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 25,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: 'Mon', temperature: 24, condition: 'sunny' },
      { day: 'Tue', temperature: 23, condition: 'cloudy' },
      { day: 'Wed', temperature: 22, condition: 'rainy' },
      { day: 'Thu', temperature: 21, condition: 'cloudy' },
      { day: 'Fri', temperature: 23, condition: 'sunny' }
    ]
  });

  const menuRefs = {
    start: useRef<HTMLDivElement>(null),
    search: useRef<HTMLDivElement>(null),
    wifi: useRef<HTMLDivElement>(null),
    volume: useRef<HTMLDivElement>(null),
    calendar: useRef<HTMLDivElement>(null),
    settings: useRef<HTMLDivElement>(null),
    shutdown: useRef<HTMLDivElement>(null),
    profile: useRef<HTMLDivElement>(null),
    wallpaper: useRef<HTMLDivElement>(null),
    weather: useRef<HTMLDivElement>(null)
  };

  const closeAllMenus = () => {
    setShowStartMenu(false);
    setShowSearchMenu(false);
    setShowWifiMenu(false);
    setShowVolumeMenu(false);
    setShowCalendarMenu(false);
    setShowSettingsMenu(false);
    setShowShutdownMenu(false);
    setShowProfileMenu(false);
    setShowFullProfile(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = Object.values(menuRefs).every(ref => 
        ref.current && !ref.current.contains(event.target as Node)
      );

      if (clickedOutside) {
        closeAllMenus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShutdown = () => {
    setIsPoweredOn(false);
    setShowShutdownMenu(false);
  };

  const handlePowerOn = () => {
    setIsPoweredOn(true);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    setShowSettingsMenu(false);
  };

  const toggleWifi = () => {
    setWifiConnected(!wifiConnected);
    setShowWifiMenu(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 80 : 0);
  };

  const adjustVolume = (increment: number) => {
    const newVolume = Math.min(100, Math.max(0, volume + increment));
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const searchItems: SearchItem[] = [
    {
      id: 'projects',
      name: 'Projects',
      icon: <Folder className="w-5 h-5" />,
      action: () => onOpenProject('projects')
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: <FileText className="w-5 h-5" />,
      action: () => onOpenProject('skills')
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: <Mail className="w-5 h-5" />,
      action: onOpenContact
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      action: () => window.open('https://github.com', '_blank')
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      action: () => window.open('https://linkedin.com', '_blank')
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      action: () => {
        setShowSettingsMenu(true);
        setShowSearchMenu(false);
      }
    }
  ];

  const filteredItems = useMemo(() => {
    if (!searchQuery) return searchItems;
    return searchItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchMenu(true);
  };

  const handleSearchItemClick = (item: SearchItem) => {
    item.action();
    setShowSearchMenu(false);
    setSearchQuery('');
  };

  const themeStyles = {
    dark: {
      background: 'bg-[#202020]',
      taskbar: 'bg-[#2d2d2d]/80',
      text: 'text-white',
      hover: 'hover:bg-white/10',
      menu: 'bg-[#2d2d2d]/80',
      input: 'bg-[#2d2d2d] text-white placeholder-gray-400',
      slider: 'bg-gray-600',
      wallpaper: 'bg-[#202020]',
    },
    light: {
      background: 'bg-[#f5f5f5]',
      taskbar: 'bg-white/80',
      text: 'text-gray-800',
      hover: 'hover:bg-gray-200/50',
      menu: 'bg-white/80',
      input: 'bg-white text-gray-800 placeholder-gray-500',
      slider: 'bg-gray-300',
      wallpaper: 'bg-[#f5f5f5]',
    }
  };

  const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

  const changeWallpaper = (wallpaper: Wallpaper) => {
    setWallpaperTransition(true);
    setTimeout(() => {
      setCurrentWallpaper(wallpaper);
      setWallpaperTransition(false);
    }, 500);
  };

  const nextWallpaper = () => {
    const nextIndex = (wallpaperGalleryIndex + 1) % wallpapers.length;
    setWallpaperGalleryIndex(nextIndex);
    changeWallpaper(wallpapers[nextIndex]);
  };

  const prevWallpaper = () => {
    const prevIndex = (wallpaperGalleryIndex - 1 + wallpapers.length) % wallpapers.length;
    setWallpaperGalleryIndex(prevIndex);
    changeWallpaper(wallpapers[prevIndex]);
  };

  const generateFood = () => {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    return { x, y };
  };

  const moveSnake = () => {
    if (snakeGame.isGameOver) return;

    setSnakeGame(prev => {
      const newSnake = [...prev.snake];
      const head = { ...newSnake[0] };

      switch (prev.direction) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Check for collisions
      if (
        head.x < 0 || head.x >= 20 ||
        head.y < 0 || head.y >= 20 ||
        newSnake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        clearInterval(gameInterval.current);
        return {
          ...prev,
          isGameOver: true,
          highScore: Math.max(prev.highScore, prev.score)
        };
      }

      newSnake.unshift(head);

      // Check if food is eaten
      if (head.x === prev.food.x && head.y === prev.food.y) {
        return {
          ...prev,
          snake: newSnake,
          food: generateFood(),
          score: prev.score + 1
        };
      }

      newSnake.pop();
      return { ...prev, snake: newSnake };
    });
  };

  const startGame = () => {
    setShowGame(true);
    setSnakeGame({
      snake: [{ x: 5, y: 5 }],
      food: generateFood(),
      direction: 'RIGHT',
      score: 0,
      isGameOver: false,
      highScore: snakeGame.highScore
    });
    gameInterval.current = setInterval(moveSnake, 200);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!showGame) return;

    setSnakeGame(prev => {
      switch (e.key) {
        case 'ArrowUp':
          if (prev.direction !== 'DOWN') return { ...prev, direction: 'UP' };
          break;
        case 'ArrowDown':
          if (prev.direction !== 'UP') return { ...prev, direction: 'DOWN' };
          break;
        case 'ArrowLeft':
          if (prev.direction !== 'RIGHT') return { ...prev, direction: 'LEFT' };
          break;
        case 'ArrowRight':
          if (prev.direction !== 'LEFT') return { ...prev, direction: 'RIGHT' };
          break;
      }
      return prev;
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameInterval.current);
    };
  }, [showGame]);

  const addNotification = (type: Notification['type'], message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: Date.now()
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationSound = (type: Notification['type']) => {
    const sounds = {
      success: '/sounds/success.mp3',
      error: '/sounds/error.mp3',
      warning: '/sounds/warning.mp3',
      info: '/sounds/info.mp3'
    };
    return sounds[type];
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-6 h-6 text-gray-400" />;
      case 'partly-cloudy': return <CloudSun className="w-6 h-6 text-gray-400" />;
      case 'rainy': return <CloudRain className="w-6 h-6 text-blue-400" />;
      case 'thunderstorm': return <CloudLightning className="w-6 h-6 text-purple-500" />;
      case 'snowy': return <CloudSnow className="w-6 h-6 text-blue-200" />;
      default: return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  if (!isPoweredOn) {
    return (
      <div className={`w-full h-full ${currentTheme.background} flex items-center justify-center`}>
        <button
          onClick={handlePowerOn}
          className={`p-4 ${currentTheme.hover} rounded-lg flex flex-col items-center gap-2`}
        >
          <Power className={`w-8 h-8 ${currentTheme.text}`} />
          <span className={currentTheme.text}>Power On</span>
        </button>
      </div>
    );
  }

  if (showFullProfile) {
    return (
      <div className={`w-full h-full ${isDarkTheme ? 'bg-gray-900' : 'bg-white'} flex flex-col`}>
        {/* Profile Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <div className={`w-20 h-20 rounded-full ${isDarkTheme ? 'bg-cyan-500' : 'bg-cyan-600'} flex items-center justify-center`}>
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Bhagya Vishwakarma</h1>
              <p className={`text-xl ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Full-Stack Developer</p>
            </div>
          </div>
          <button 
            onClick={() => setShowFullProfile(false)}
            className={`p-2 ${isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg`}
          >
            <X className={`w-6 h-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* About Section */}
            <section className="space-y-4">
              <h2 className={`text-2xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>About Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'} space-y-4`}>
                  <div className="flex items-center gap-3">
                    <Code2 className={`w-6 h-6 ${isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'}`} />
                    <h3 className={`text-lg font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Role</h3>
                  </div>
                  <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Full-Stack Developer | UI/UX Enthusiast | Problem Solver
                  </p>
                </div>
                <div className={`p-6 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'} space-y-4`}>
                  <div className="flex items-center gap-3">
                    <Briefcase className={`w-6 h-6 ${isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'}`} />
                    <h3 className={`text-lg font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Experience</h3>
                  </div>
                  <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    5+ years building web applications with a focus on user experience and performance
                  </p>
                </div>
                <div className={`p-6 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'} space-y-4`}>
                  <div className="flex items-center gap-3">
                    <GraduationCap className={`w-6 h-6 ${isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'}`} />
                    <h3 className={`text-lg font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Education</h3>
                  </div>
                  <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Computer Science Background with a passion for continuous learning
                  </p>
                </div>
                <div className={`p-6 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'} space-y-4`}>
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-6 h-6 ${isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'}`} />
                    <h3 className={`text-lg font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Location</h3>
                  </div>
                  <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Open to Remote Work | Available for Freelance Projects
                  </p>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section className="space-y-4">
              <h2 className={`text-2xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Technical Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-6 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`text-lg font-medium mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'].map((skill) => (
                      <span 
                        key={skill}
                        className={`px-3 py-1 rounded-full text-sm ${isDarkTheme ? 'text-cyan-400 bg-cyan-400/10' : 'text-cyan-600 bg-cyan-600/10'}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`p-6 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`text-lg font-medium mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL'].map((skill) => (
                      <span 
                        key={skill}
                        className={`px-3 py-1 rounded-full text-sm ${isDarkTheme ? 'text-cyan-400 bg-cyan-400/10' : 'text-cyan-600 bg-cyan-600/10'}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`p-6 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`text-lg font-medium mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Tools & Others</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Git', 'Docker', 'AWS', 'Figma', 'Agile'].map((skill) => (
                      <span 
                        key={skill}
                        className={`px-3 py-1 rounded-full text-sm ${isDarkTheme ? 'text-cyan-400 bg-cyan-400/10' : 'text-cyan-600 bg-cyan-600/10'}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="space-y-4">
              <h2 className={`text-2xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Get In Touch</h2>
              <div className="flex items-center gap-6">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-3 ${isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-full`}
                >
                  <Github className={`w-6 h-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-3 ${isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-full`}
                >
                  <Linkedin className={`w-6 h-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`} />
                </a>
                <a 
                  href="mailto:your.email@example.com" 
                  className={`p-3 ${isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-full`}
                >
                  <Mail className={`w-6 h-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`} />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-3 ${isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-full`}
                >
                  <Globe className={`w-6 h-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`} />
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${currentTheme.background} flex flex-col relative overflow-hidden`}>
      {/* Wallpaper Background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${wallpaperTransition ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${currentWallpaper.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Desktop */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-4 gap-4">
            {/* Desktop Icons */}
            <div 
              className={`flex flex-col items-center cursor-pointer ${currentTheme.hover} p-2 rounded`}
              onClick={() => onOpenProject('projects')}
            >
              <Folder className={`w-12 h-12 ${currentTheme.text} mb-1`} />
              <span className={`${currentTheme.text} text-sm text-center`}>Projects</span>
            </div>
            
            <div 
              className={`flex flex-col items-center cursor-pointer ${currentTheme.hover} p-2 rounded`}
              onClick={() => setShowFullProfile(true)}
            >
              <User className={`w-12 h-12 ${currentTheme.text} mb-1`} />
              <span className={`${currentTheme.text} text-sm text-center`}>Profile</span>
            </div>
            
            <div 
              className={`flex flex-col items-center cursor-pointer ${currentTheme.hover} p-2 rounded`}
              onClick={() => onOpenProject('skills')}
            >
              <FileText className={`w-12 h-12 ${currentTheme.text} mb-1`} />
              <span className={`${currentTheme.text} text-sm text-center`}>Skills</span>
            </div>
            
            <div 
              className={`flex flex-col items-center cursor-pointer ${currentTheme.hover} p-2 rounded`}
              onClick={onOpenContact}
            >
              <Mail className={`w-12 h-12 ${currentTheme.text} mb-1`} />
              <span className={`${currentTheme.text} text-sm text-center`}>Contact</span>
            </div>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex flex-col items-center cursor-pointer ${currentTheme.hover} p-2 rounded`}
            >
              <Github className={`w-12 h-12 ${currentTheme.text} mb-1`} />
              <span className={`${currentTheme.text} text-sm text-center`}>GitHub</span>
            </a>
            
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex flex-col items-center cursor-pointer ${currentTheme.hover} p-2 rounded`}
            >
              <Linkedin className={`w-12 h-12 ${currentTheme.text} mb-1`} />
              <span className={`${currentTheme.text} text-sm text-center`}>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Taskbar */}
        <div className={`h-12 ${currentTheme.taskbar} backdrop-blur-md flex items-center justify-between px-2`}>
          {/* Left Section - Profile and Start Menu */}
          <div className="flex items-center gap-2">
            {/* Profile Button */}
            <div className="relative" ref={menuRefs.profile}>
              <button
                onClick={() => setShowFullProfile(true)}
                className={`p-2 ${currentTheme.hover} rounded`}
              >
                <User className={`w-5 h-5 ${currentTheme.text}`} />
              </button>
            </div>

            {/* Start Menu Button */}
            <div className="relative" ref={menuRefs.start}>
              <button
                onClick={() => setShowStartMenu(!showStartMenu)}
                className={`p-2 ${currentTheme.hover} rounded`}
              >
                <Menu className={`w-5 h-5 ${currentTheme.text}`} />
              </button>
              {showStartMenu && (
                <div className={`absolute bottom-12 left-0 w-64 ${currentTheme.menu} backdrop-blur-md rounded-lg p-2`}>
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        setShowFullProfile(true);
                        setShowStartMenu(false);
                      }}
                      className={`w-full p-2 ${currentTheme.hover} rounded ${currentTheme.text} text-left flex items-center gap-2`}
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </button>
                    <button 
                      onClick={() => {
                        setShowSettingsMenu(true);
                        setShowStartMenu(false);
                      }}
                      className={`w-full p-2 ${currentTheme.hover} rounded ${currentTheme.text} text-left flex items-center gap-2`}
                    >
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </button>
                    <button 
                      onClick={() => {
                        setShowShutdownMenu(true);
                        setShowStartMenu(false);
                      }}
                      className={`w-full p-2 ${currentTheme.hover} rounded ${currentTheme.text} text-left flex items-center gap-2`}
                    >
                      <Power className="w-5 h-5" />
                      <span>Power</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="relative" ref={menuRefs.search}>
              <button
                onClick={() => setShowSearchMenu(!showSearchMenu)}
                className={`p-2 ${currentTheme.hover} rounded`}
              >
                <Search className={`w-5 h-5 ${currentTheme.text}`} />
              </button>
              {showSearchMenu && (
                <div className={`absolute bottom-12 left-0 w-96 ${currentTheme.menu} backdrop-blur-md rounded-lg p-2`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Search className={`w-5 h-5 ${currentTheme.text}`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearch}
                      placeholder="Type here to search..."
                      className={`w-full p-2 rounded ${currentTheme.input} focus:outline-none`}
                      autoFocus
                    />
                    <button 
                      onClick={() => setShowSearchMenu(false)}
                      className={`p-2 ${currentTheme.hover} rounded`}
                    >
                      <X className={`w-5 h-5 ${currentTheme.text}`} />
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {filteredItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSearchItemClick(item)}
                        className={`w-full p-2 ${currentTheme.hover} rounded ${currentTheme.text} text-left flex items-center gap-2`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </button>
                    ))}
                    {filteredItems.length === 0 && (
                      <div className={`p-2 ${currentTheme.text} text-center`}>
                        No results found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - System Tray */}
          <div className="flex items-center gap-2">
            {/* Wallpaper Button */}
            <div className="relative" ref={menuRefs.wallpaper}>
              <button
                onClick={() => setShowWallpaperMenu(!showWallpaperMenu)}
                className={`p-2 ${currentTheme.hover} rounded`}
              >
                <Image className={`w-5 h-5 ${currentTheme.text}`} />
              </button>
              {showWallpaperMenu && (
                <div className={`absolute bottom-12 right-0 w-96 ${currentTheme.menu} backdrop-blur-md rounded-lg p-4`}>
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Wallpapers</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {wallpapers.map((wallpaper) => (
                        <button
                          key={wallpaper.id}
                          onClick={() => changeWallpaper(wallpaper)}
                          className={`relative aspect-video rounded-lg overflow-hidden ${currentTheme.hover} transition-transform hover:scale-105`}
                        >
                          <img
                            src={wallpaper.url}
                            alt={wallpaper.name}
                            className="w-full h-full object-cover"
                          />
                          {currentWallpaper.id === wallpaper.id && (
                            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <div className={`w-6 h-6 rounded-full ${currentTheme.text} border-2 border-current`} />
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                            <p className={`text-xs ${currentTheme.text}`}>{wallpaper.name}</p>
                            <p className={`text-xs ${currentTheme.text} opacity-50`}>{wallpaper.category}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={prevWallpaper}
                        className={`p-2 ${currentTheme.hover} rounded-full`}
                      >
                        <ChevronLeft className={`w-5 h-5 ${currentTheme.text}`} />
                      </button>
                      <span className={`${currentTheme.text}`}>{currentWallpaper.name}</span>
                      <button
                        onClick={nextWallpaper}
                        className={`p-2 ${currentTheme.hover} rounded-full`}
                      >
                        <ChevronRight className={`w-5 h-5 ${currentTheme.text}`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Weather Button */}
            <div className="relative" ref={menuRefs.weather}>
              <button
                onClick={() => setShowWeather(!showWeather)}
                className={`p-2 ${currentTheme.hover} rounded`}
              >
                {getWeatherIcon(weatherData.condition)}
              </button>
              {showWeather && (
                <div className={`absolute bottom-12 right-0 w-64 ${currentTheme.menu} backdrop-blur-md rounded-lg p-4`}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Weather</h3>
                      <div className="flex items-center gap-2">
                        <Thermometer className={`w-5 h-5 ${currentTheme.text}`} />
                        <span className={`${currentTheme.text}`}>{weatherData.temperature}°C</span>
                      </div>
                    </div>

                    {/* Current Weather */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getWeatherIcon(weatherData.condition)}
                        <span className={`${currentTheme.text}`}>{weatherData.condition}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Droplets className={`w-4 h-4 ${currentTheme.text}`} />
                          <span className={`text-sm ${currentTheme.text}`}>{weatherData.humidity}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Wind className={`w-4 h-4 ${currentTheme.text}`} />
                          <span className={`text-sm ${currentTheme.text}`}>{weatherData.windSpeed} km/h</span>
                        </div>
                      </div>
                    </div>

                    {/* Forecast */}
                    <div className="space-y-2">
                      <h4 className={`text-sm font-medium ${currentTheme.text}`}>5-Day Forecast</h4>
                      <div className="grid grid-cols-5 gap-2">
                        {weatherData.forecast.map((day, index) => (
                          <div
                            key={index}
                            className={`flex flex-col items-center p-2 rounded-lg ${
                              currentTheme === themeStyles.dark ? 'bg-gray-800/50' : 'bg-gray-100/50'
                            }`}
                          >
                            <span className={`text-xs ${currentTheme.text}`}>{day.day}</span>
                            {getWeatherIcon(day.condition)}
                            <span className={`text-sm ${currentTheme.text}`}>{day.temperature}°</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Calendar Button */}
            <div className="relative" ref={menuRefs.calendar}>
              <button
                onClick={() => setShowCalendarMenu(!showCalendarMenu)}
                className={`p-2 ${currentTheme.hover} rounded`}
              >
                <Calendar className={`w-5 h-5 ${currentTheme.text}`} />
              </button>
              {showCalendarMenu && (
                <div className={`absolute bottom-12 right-0 w-64 ${currentTheme.menu} backdrop-blur-md rounded-lg p-2`}>
                  <div className="space-y-2">
                    <div className={`text-center ${currentTheme.text} font-semibold`}>
                      {formatDate(currentTime)}
                    </div>
                    <div className={`text-center ${currentTheme.text}`}>
                      {formatTime(currentTime)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Time Display */}
            <div className="flex items-center gap-1 px-2">
              <Clock className={`w-4 h-4 ${currentTheme.text}`} />
              <span className={`${currentTheme.text} text-sm`}>{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Menu */}
      {showSettingsMenu && (
        <div 
          className={`absolute bottom-12 right-0 w-64 ${currentTheme.menu} backdrop-blur-md rounded-lg p-2 z-50`}
          style={{ marginBottom: '48px' }}
        >
          <div className="space-y-2">
            <button 
              onClick={() => {
                toggleTheme();
                setShowSettingsMenu(false);
              }}
              className={`w-full p-2 ${currentTheme.hover} rounded ${currentTheme.text} text-left flex items-center gap-2`}
            >
              <Sun className="w-5 h-5" />
              <span>Toggle Theme</span>
            </button>
            <button 
              onClick={() => {
                setShowSettingsMenu(false);
              }}
              className={`w-full p-2 ${currentTheme.hover} rounded ${currentTheme.text} text-left flex items-center gap-2`}
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      )}

      {/* Shutdown Menu */}
      {showShutdownMenu && (
        <div 
          className={`absolute bottom-12 right-0 w-48 ${currentTheme.menu} backdrop-blur-md rounded-lg p-2 z-50`}
          style={{ marginBottom: '48px' }}
        >
          <div className="space-y-2">
            <button 
              onClick={() => {
                handleShutdown();
                setShowShutdownMenu(false);
              }}
              className={`w-full p-2 ${currentTheme.hover} rounded ${currentTheme.text} text-left flex items-center gap-2`}
            >
              <Power className="w-5 h-5" />
              <span>Shut down</span>
            </button>
            <button 
              onClick={() => setShowShutdownMenu(false)}
              className={`w-full p-2 ${currentTheme.hover} rounded ${currentTheme.text} text-left flex items-center gap-2`}
            >
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 