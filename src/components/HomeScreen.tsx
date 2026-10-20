import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import confetti from 'canvas-confetti';
import schoolLogoSvg from '../assets/school-logo.svg';
import { StudentProfile, Question } from '../types';
import { SCHOOL_INFO, UNITS_DATA } from '../data/questionsData';
import { IslamicSceneDecorations } from './IslamicSceneDecorations';
import {
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  Star,
  ArrowLeft,
  Flame,
  User,
  Users,
  GraduationCap,
  Play,
  ChevronDown,
  ChevronUp,
  BarChart3,
  RotateCcw,
  Compass,
  Quote,
  Lightbulb,
  Check,
  X,
  HelpCircle,
  Copy,
  ChevronLeft,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface HomeScreenProps {
  currentStudent: StudentProfile | null;
  onStartJourney: () => void;
  onViewProgress: () => void;
  onViewCertificates: () => void;
  onOpenQuestionBank: () => void;
  onRegisterStudent: () => void;
}

// Authentic Islamic Wisdoms related to knowledge, virtue, and learning
const INSPIRATIONAL_WISDOMS = [
  {
    quote: 'مَنْ سَلَكَ طَرِيقاً يَلْتَمِسُ فِيهِ عِلْماً سَهَّلَ اللهُ لَهُ بِهِ طَرِيقاً إِلَى الجَنَّةِ',
    source: 'حديث شريف • رواه مسلم',
  },
  {
    quote: 'إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الأَخْلَاقِ',
    source: 'حديث شريف • مسند أحمد',
  },
  {
    quote: 'الطُّهُورُ شَطْرُ الإِيمَانِ، وَالحَمْدُ لِلَّهِ تَمْلأُ المِيزَانَ',
    source: 'حديث شريف • صحيح مسلم',
  },
  {
    quote: 'خَيْرُكُمْ مَنْ تَعَلَّمَ القُرْآنَ وَعَلَّمَهُ',
    source: 'حديث شريف • صحيح البخاري',
  },
  {
    quote: 'وَقُلْ رَبِّ زِدْنِي عِلْمًا',
    source: 'سورة طه • الآية 114',
  },
  {
    quote: 'العِلْمُ نُورٌ يَقْذِفُهُ اللهُ فِي قَلْبِ مَنْ يَشَاءُ',
    source: 'من أقوال السلف الصالح',
  },
];

// Animation Variants for smooth staggered entry
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 350,
      damping: 24,
    },
  },
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentStudent,
  onStartJourney,
  onViewProgress,
  onViewCertificates,
  onOpenQuestionBank,
  onRegisterStudent,
}) => {
  const [showCurriculumOverview, setShowCurriculumOverview] = useState(false);
  const [wisdomIndex, setWisdomIndex] = useState(0);
  const [copiedWisdom, setCopiedWisdom] = useState(false);

  // Quick challenge state
  const [showQuickChallenge, setShowQuickChallenge] = useState(false);
  const [quickQuestionIndex, setQuickQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  // Pool of all questions for the quick challenge
  const allQuestionsPool: Question[] = useMemo(() => {
    const list: Question[] = [];
    UNITS_DATA.forEach((unit) => {
      unit.lessons.forEach((lesson) => {
        lesson.questions.forEach((q) => {
          if (q.type === 'multiple_choice' && q.options && q.options.length > 0) {
            list.push(q);
          }
        });
      });
    });
    return list.length > 0 ? list : [UNITS_DATA[0].lessons[0].questions[0]];
  }, []);

  const quickQuestion: Question = useMemo(() => {
    return allQuestionsPool[quickQuestionIndex % allQuestionsPool.length];
  }, [allQuestionsPool, quickQuestionIndex]);

  const totalLessons = 16;
  const completedLessonsCount = currentStudent?.completedLessons.length || 0;
  const totalPoints = currentStudent?.totalPoints || 0;

  const totalStars = currentStudent
    ? Object.values(currentStudent.lessonProgress).reduce((acc, lp) => acc + (lp.stars || 0), 0)
    : 0;
  const progressPercentage = Math.round((completedLessonsCount / totalLessons) * 100);

  const handleStartClick = () => {
    sounds.playClick();
    if (!currentStudent) {
      onRegisterStudent();
    } else {
      onStartJourney();
    }
  };

  const handleProgressClick = () => {
    sounds.playClick();
    if (!currentStudent) {
      onRegisterStudent();
    } else {
      onViewProgress();
    }
  };

  const handleCertificatesClick = () => {
    sounds.playClick();
    if (!currentStudent) {
      onRegisterStudent();
    } else {
      onViewCertificates();
    }
  };

  const nextWisdom = () => {
    sounds.playClick();
    setWisdomIndex((prev) => (prev + 1) % INSPIRATIONAL_WISDOMS.length);
  };

  const handleCopyWisdom = () => {
    sounds.playClick();
    const item = INSPIRATIONAL_WISDOMS[wisdomIndex];
    navigator.clipboard.writeText(`«${item.quote}» - ${item.source}`);
    setCopiedWisdom(true);
    setTimeout(() => setCopiedWisdom(false), 2000);
  };

  const handleSelectQuickAnswer = (option: string) => {
    if (isAnswerSubmitted) return;
    sounds.playClick();
    setSelectedAnswer(option);
  };

  const handleSubmitQuickAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedAnswer === quickQuestion.correctAnswer;
    if (isCorrect) {
      sounds.playCorrect();
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#17436A', '#BCEBDD', '#F8FBFF'],
      });
    } else {
      sounds.playWrong();
    }
  };

  const handleNextQuickQuestion = () => {
    sounds.playClick();
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setQuickQuestionIndex((prev) => (prev + 1) % allQuestionsPool.length);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-[#F8FBFF] py-6 sm:py-10 px-3 sm:px-6 overflow-hidden">
      {/* Background Decor: Calm Islamic Scene & Lattice Pattern in Mint Green & Navy */}
      <IslamicSceneDecorations />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-8 text-center"
      >
        {/* ================================================================= */}
        {/* 1. SACRED BASMALA & ISLAMIC WELCOME BANNER                        */}
        {/* ================================================================= */}
        <motion.div variants={itemVariants} className="space-y-2 select-none">
          {/* Traditional Calligraphic Basmala in Amiri script */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs text-[#17436A]/50">۞</span>
            <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#BCEBDD] to-[#17436A]/30" />
            <h2 className="font-['Amiri',serif] text-xl sm:text-2xl md:text-3xl font-bold text-[#17436A] tracking-wide">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h2>
            <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#BCEBDD] to-[#17436A]/30" />
            <span className="text-xs text-[#17436A]/50">۞</span>
          </div>

          <p className="text-xs font-bold text-[#17436A]/75 tracking-wider">
            مَرْحَبًا بِكُمْ فِي رِحَابِ العِلْمِ وَالإِيمَانِ
          </p>
        </motion.div>

        {/* ================================================================= */}
        {/* 2. HERO SECTION: Official Emblem in Andalusian Islamic Arch Frame */}
        {/* ================================================================= */}
        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
          <div className="relative group">
            {/* Ambient mint halo glow */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -inset-3 bg-gradient-to-r from-[#BCEBDD]/50 via-[#BCEBDD]/30 to-[#BCEBDD]/50 rounded-[3.5rem] blur-md pointer-events-none"
            />

            {/* Rotating 8-point geometric star subtle backdrop */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
              className="absolute -inset-2 opacity-15 pointer-events-none flex items-center justify-center text-[#17436A]"
            >
              <svg width="220" height="220" viewBox="0 0 100 100" fill="currentColor">
                <polygon points="50,0 61,39 100,50 61,61 50,100 39,61 0,50 39,39" />
                <polygon points="50,0 61,39 100,50 61,61 50,100 39,61 0,50 39,39" transform="rotate(45 50 50)" opacity="0.6" />
              </svg>
            </motion.div>

            {/* Islamic Arch Medallion Frame (محراب إسلامي أنيق وبسيط) */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-[#FFFFFF] rounded-t-[3.5rem] rounded-b-3xl p-5 sm:p-7 shadow-sm border-2 border-[#BCEBDD] flex items-center justify-center cursor-pointer"
              title="شعار مدرسة المطوعة شريفة العمر الرسمية"
            >
              <div className="absolute inset-1.5 rounded-t-[3.2rem] rounded-b-2xl border border-[#BCEBDD]/60 pointer-events-none" />
              <img
                src={schoolLogoSvg}
                alt="شعار مدرسة المطوعة شريفة العمر الرسمية"
                className="w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52 object-contain select-none drop-shadow-xs"
                loading="eager"
              />
            </motion.div>
          </div>

          {/* Ministry & District Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <motion.div
              whileHover={{ scale: 1.04, y: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-1.5 bg-[#FFFFFF] text-[#17436A] border border-[#BCEBDD] px-4 py-1.5 rounded-full text-xs font-black shadow-2xs select-none"
            >
              <Star className="w-3.5 h-3.5 fill-[#BCEBDD] text-[#17436A]" />
              <span>{SCHOOL_INFO.country} • {SCHOOL_INFO.ministry}</span>
              <Star className="w-3.5 h-3.5 fill-[#BCEBDD] text-[#17436A]" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04, y: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-block bg-[#BCEBDD] text-[#17436A] px-5 py-1.5 rounded-full font-black text-xs sm:text-sm border border-[#17436A]/20 shadow-2xs select-none"
            >
              {SCHOOL_INFO.district}
            </motion.div>
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/* 3. SCHOOL NAME & COMPETITION MAJESTIC TITLES                      */}
        {/* ================================================================= */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="inline-block">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#17436A] tracking-tight leading-tight">
              {SCHOOL_INFO.schoolName}
            </h1>
            <p className="text-sm sm:text-base font-black text-[#17436A]/80 tracking-wide mt-0.5">
              - {SCHOOL_INFO.schoolType} -
            </p>
          </div>

          {/* Arabesque Geometric Divider */}
          <div className="flex items-center justify-center gap-3 py-1 opacity-70 text-[#17436A]">
            <div className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#BCEBDD]" />
            <span className="text-xs">◆</span>
            <span className="text-sm font-bold text-[#17436A] inline-block">۞</span>
            <span className="text-xs">◆</span>
            <div className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#BCEBDD]" />
          </div>

          {/* Game Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#17436A] tracking-tight leading-snug">
              رحلة التميز في التربية الإسلامية
            </h2>
            <p className="text-sm sm:text-base font-bold text-[#17436A]/90 mt-1">
              منهج {SCHOOL_INFO.grade} • {SCHOOL_INFO.term}
            </p>
          </div>

          {/* Educational Motto Banner */}
          <div className="pt-2 max-w-xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#FFFFFF] border-2 border-[#BCEBDD] rounded-2xl px-5 py-3 inline-flex items-center gap-2.5 text-xs sm:text-sm md:text-base font-black text-[#17436A] shadow-2xs w-full justify-center"
            >
              <BookOpen className="w-5 h-5 text-[#17436A] shrink-0" />
              <span>«{SCHOOL_INFO.motto}»</span>
            </motion.div>
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/* 4. STUDENT IDENTITY & PROGRESS PASSPORT BAR                       */}
        {/* ================================================================= */}
        <motion.div variants={itemVariants} className="pt-1">
          {currentStudent ? (
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="bg-[#FFFFFF] border-2 border-[#BCEBDD] rounded-3xl p-4 sm:p-5 shadow-xs text-right space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#17436A] text-[#BCEBDD] flex items-center justify-center font-black text-lg shadow-2xs relative">
                    <User className="w-6 h-6" />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#17436A]/70 block">
                      بطلة رحلة التميز الحالية
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-[#17436A]">
                      {currentStudent.name}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {currentStudent.section && (
                    <div className="bg-[#BCEBDD] text-[#17436A] px-3.5 py-1.5 rounded-xl border border-[#17436A]/20 font-black text-xs flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>الشعبة: {currentStudent.section}</span>
                    </div>
                  )}

                  <motion.button
                    onClick={onRegisterStudent}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="bg-[#FFFFFF] hover:bg-[#F8FBFF] border border-[#BCEBDD] text-[#17436A] px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-2xs cursor-pointer transition"
                  >
                    <span>(تبديل الطالب)</span>
                    <RotateCcw className="w-3.5 h-3.5 text-[#17436A]" />
                  </motion.button>
                </div>
              </div>

              {/* Quick Achievement Stats Strip */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#BCEBDD]">
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="bg-[#F8FBFF] p-2.5 rounded-2xl border border-[#BCEBDD] text-center cursor-default shadow-2xs"
                >
                  <span className="text-[10px] font-bold text-[#17436A]/75 block">النقاط</span>
                  <span className="text-sm sm:text-base font-black text-[#17436A]">{totalPoints}</span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="bg-[#F8FBFF] p-2.5 rounded-2xl border border-[#BCEBDD] text-center cursor-default shadow-2xs"
                >
                  <span className="text-[10px] font-bold text-[#17436A]/75 block">الدروس المنجزة</span>
                  <span className="text-sm sm:text-base font-black text-[#17436A]">
                    {completedLessonsCount}/16
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="bg-[#F8FBFF] p-2.5 rounded-2xl border border-[#BCEBDD] text-center cursor-default shadow-2xs"
                >
                  <span className="text-[10px] font-bold text-[#17436A]/75 block">النجوم</span>
                  <span className="text-sm sm:text-base font-black text-[#17436A] flex items-center justify-center gap-1">
                    <span>{totalStars}</span>
                    <Star className="w-3.5 h-3.5 fill-[#BCEBDD] text-[#17436A]" />
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.button
              onClick={() => {
                sounds.playClick();
                onRegisterStudent();
              }}
              whileHover={{ scale: 1.025, y: -2, boxShadow: '0 12px 24px -6px rgba(23,67,106,0.25)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="w-full bg-[#17436A] hover:bg-[#0F2D48] text-[#F8FBFF] border-2 border-[#BCEBDD] p-4 rounded-3xl font-black text-sm sm:text-base flex items-center justify-between shadow-md cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="w-10 h-10 rounded-2xl bg-[#BCEBDD] text-[#17436A] flex items-center justify-center"
                >
                  <User className="w-5 h-5" />
                </motion.div>
                <div className="text-right">
                  <span className="block text-sm sm:text-base font-black">
                    سجلي اسمكِ وشعبتكِ لبدء المغامرة
                  </span>
                  <span className="text-xs text-[#BCEBDD] font-bold">
                    لحفظ النقاط والأوسمة وإصدار شهادة التميز
                  </span>
                </div>
              </div>
              <motion.div
                animate={{ x: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-9 h-9 rounded-full bg-[#FFFFFF]/15 text-[#BCEBDD] flex items-center justify-center group-hover:translate-x-1 transition-transform"
              >
                <ArrowLeft className="w-5 h-5 stroke-[3] rtl:rotate-0" />
              </motion.div>
            </motion.button>
          )}
        </motion.div>

        {/* ================================================================= */}
        {/* 5. THE 3 PRIMARY ACTION NAVIGATION BUTTONS                         */}
        {/* ================================================================= */}
        <motion.div variants={itemVariants} className="space-y-3 pt-2">
          {/* Main Button: Navy Blue #17436A */}
          <motion.button
            onClick={handleStartClick}
            whileHover={{
              scale: 1.03,
              y: -4,
              boxShadow: '0 20px 32px -8px rgba(23,67,106,0.35)',
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            className="relative overflow-hidden w-full max-w-lg mx-auto py-4 px-6 rounded-3xl bg-[#17436A] hover:bg-[#0F2D48] text-[#F8FBFF] font-black border-2 border-[#BCEBDD] shadow-lg shadow-[#17436A]/20 flex items-center justify-between cursor-pointer group"
          >
            {/* Shimmer light sweep */}
            <motion.div
              initial={{ x: '100%' }}
              whileHover={{ x: '-100%' }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
            />

            <motion.div
              animate={{ x: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-2xl bg-[#BCEBDD]/25 text-[#BCEBDD] flex items-center justify-center shrink-0 group-hover:bg-[#BCEBDD] group-hover:text-[#17436A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 stroke-[3] rtl:rotate-0" />
            </motion.div>

            <div className="text-center px-2">
              <span className="text-xl sm:text-2xl font-black block tracking-wide">
                ابدأ الرحلة التفاعلية
              </span>
              <span className="text-xs text-[#BCEBDD] font-bold block mt-0.5">
                4 محطات إيمانية • 16 درساً • 80 سؤالاً مشوقاً
              </span>
            </div>

            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="w-10 h-10 rounded-2xl bg-[#BCEBDD]/25 text-[#BCEBDD] flex items-center justify-center shrink-0 group-hover:bg-[#BCEBDD] group-hover:text-[#17436A] transition-colors"
            >
              <Play className="w-5 h-5 fill-[#BCEBDD] group-hover:fill-[#17436A]" />
            </motion.div>
          </motion.button>

          {/* Grid of Secondary Buttons: Mint Green #BCEBDD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
            <motion.button
              onClick={handleProgressClick}
              whileHover={{
                scale: 1.035,
                y: -3,
                boxShadow: '0 10px 20px -5px rgba(23,67,106,0.18)',
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="py-3.5 px-5 rounded-2xl bg-[#BCEBDD] hover:bg-[#aee6d6] text-[#17436A] border-2 border-[#17436A]/20 font-black text-sm sm:text-base shadow-xs flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <BarChart3 className="w-5 h-5 text-[#17436A]" />
              <span>سجل تقدمي ونقاطي</span>
            </motion.button>

            <motion.button
              onClick={handleCertificatesClick}
              whileHover={{
                scale: 1.035,
                y: -3,
                boxShadow: '0 10px 20px -5px rgba(23,67,106,0.18)',
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="py-3.5 px-5 rounded-2xl bg-[#BCEBDD] hover:bg-[#aee6d6] text-[#17436A] border-2 border-[#17436A]/20 font-black text-sm sm:text-base shadow-xs flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <Award className="w-5 h-5 text-[#17436A]" />
              <span>لوحة الشرف والشهادات</span>
            </motion.button>
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/* 6. THE 4 QUEST STATIONS INTERACTIVE CARDS                         */}
        {/* ================================================================= */}
        <motion.div
          variants={itemVariants}
          className="bg-[#FFFFFF] rounded-3xl p-5 sm:p-6 shadow-xs border-2 border-[#BCEBDD] text-right space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#BCEBDD] pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#17436A] flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#17436A]" />
                <span>محطات رحلة التربية الإسلامية</span>
              </h3>
              <p className="text-xs text-[#17436A]/75 font-bold mt-0.5">
                تصفحي المحطات التعليمية الأربع وانطلقي في التحديات
              </p>
            </div>

            <motion.button
              onClick={handleStartClick}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="text-xs font-black bg-[#17436A] hover:bg-[#0F2D48] text-white px-3.5 py-1.5 rounded-xl border border-[#BCEBDD] transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <span>خريطة الرحلة</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {UNITS_DATA.map((unit) => {
              const unitDone = unit.lessons.filter((l) =>
                currentStudent?.completedLessons.includes(l.id)
              ).length;
              const isFinished = unitDone === unit.lessons.length;
              const unitStars = unit.lessons.reduce((acc, l) => {
                const prog = currentStudent?.lessonProgress[l.id];
                return acc + (prog?.stars || 0);
              }, 0);

              return (
                <motion.div
                  key={unit.id}
                  onClick={handleStartClick}
                  whileHover={{
                    scale: 1.035,
                    y: -4,
                    borderColor: '#17436A',
                    boxShadow: '0 12px 24px -6px rgba(23,67,106,0.14)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="bg-[#F8FBFF] p-4 rounded-2xl border-2 border-[#BCEBDD] cursor-pointer shadow-2xs space-y-2.5 transition-colors group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <motion.span
                      whileHover={{ scale: 1.08 }}
                      className="text-[11px] font-black text-white bg-[#17436A] px-2.5 py-0.5 rounded-lg flex items-center gap-1"
                    >
                      <span>المحطة {unit.id}</span>
                    </motion.span>

                    {isFinished ? (
                      <span className="text-[10px] font-bold text-[#17436A] bg-[#BCEBDD] px-2.5 py-0.5 rounded-full border border-[#17436A]/20 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#17436A]" />
                        مكتملة بنجاح
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-[#17436A] flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#BCEBDD] text-[#17436A]" />
                        <span>{unitStars} نجوم</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-black text-sm sm:text-base text-[#17436A] group-hover:text-[#0F2D48] transition-colors">
                      {unit.title}
                    </h4>
                    <p className="text-xs font-bold text-[#17436A]/80 mt-0.5">{unit.subtitle}</p>
                  </div>

                  {/* Progress bar inside card */}
                  <div className="space-y-1 pt-1 border-t border-[#BCEBDD]">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#17436A]/80">
                      <span>{unitDone} من 4 دروس مكتملة</span>
                      <span className="font-black text-[#17436A]">{Math.round((unitDone / 4) * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#FFFFFF] border border-[#BCEBDD] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(unitDone / 4) * 100}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-[#BCEBDD] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Subtle prompt indicator on card hover */}
                  <div className="flex items-center justify-end text-[11px] font-bold text-[#17436A] opacity-0 group-hover:opacity-100 transition-opacity gap-1 pt-0.5">
                    <span>انطلقي للمحطة</span>
                    <ArrowLeft className="w-3 h-3 rtl:rotate-0" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/* 7. PEARL OF WISDOM: Inspiring Islamic Quote in Amiri Script       */}
        {/* ================================================================= */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-[#FFFFFF] border-2 border-[#BCEBDD] rounded-3xl p-5 sm:p-6 shadow-xs text-right space-y-3 relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-[#BCEBDD]/60 pb-2.5">
            <div className="flex items-center gap-2 text-xs font-black text-[#17436A]">
              <div className="w-7 h-7 rounded-lg bg-[#BCEBDD] text-[#17436A] flex items-center justify-center shadow-2xs">
                <Quote className="w-4 h-4" />
              </div>
              <span>قبس إيماني ملهم</span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Copy Quote Button */}
              <motion.button
                onClick={handleCopyWisdom}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                title="نسخ القبس"
                className="text-[11px] font-bold text-[#17436A] hover:bg-[#BCEBDD]/30 px-2.5 py-1 rounded-lg border border-[#BCEBDD] flex items-center gap-1 transition cursor-pointer"
              >
                {copiedWisdom ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>نسخ</span>
                  </>
                )}
              </motion.button>

              {/* Next Quote Button */}
              <motion.button
                onClick={nextWisdom}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="text-[11px] font-bold text-[#17436A] hover:bg-[#BCEBDD]/30 px-2.5 py-1 rounded-lg border border-[#BCEBDD] flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>قبس آخر</span>
                <motion.div
                  animate={{ rotate: wisdomIndex * 180 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <RotateCcw className="w-3 h-3" />
                </motion.div>
              </motion.button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={wisdomIndex}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pt-2 text-center"
            >
              <p className="font-['Amiri',serif] text-base sm:text-lg md:text-xl font-bold text-[#17436A] leading-loose">
                «{INSPIRATIONAL_WISDOMS[wisdomIndex].quote}»
              </p>
              <span className="text-xs font-bold text-[#17436A]/70 block mt-2">
                {INSPIRATIONAL_WISDOMS[wisdomIndex].source}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ================================================================= */}
        {/* 8. QUICK CHALLENGE WARM-UP («تحدي اليوم السريع»)                   */}
        {/* ================================================================= */}
        <motion.div
          variants={itemVariants}
          className="bg-[#FFFFFF] rounded-3xl p-5 sm:p-6 shadow-xs border-2 border-[#BCEBDD] text-right space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#BCEBDD] pb-3">
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="w-9 h-9 rounded-xl bg-[#BCEBDD] text-[#17436A] flex items-center justify-center shadow-2xs"
              >
                <Lightbulb className="w-5 h-5" />
              </motion.div>
              <div>
                <h3 className="text-base font-black text-[#17436A]">تحدي اليوم السريع</h3>
                <p className="text-xs text-[#17436A]/75 font-semibold">اختبري معلوماتكِ في سؤال فوري خفيف</p>
              </div>
            </div>

            <motion.button
              onClick={() => {
                sounds.playClick();
                setShowQuickChallenge(!showQuickChallenge);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="text-xs font-black bg-[#BCEBDD] hover:bg-[#aee6d6] text-[#17436A] border border-[#17436A]/20 px-3.5 py-1.5 rounded-xl cursor-pointer transition shadow-2xs"
            >
              {showQuickChallenge ? 'إخفاء التحدي' : 'جرّبي السؤال'}
            </motion.button>
          </div>

          <AnimatePresence>
            {showQuickChallenge && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="space-y-4 pt-1 overflow-hidden"
              >
                <div className="bg-[#F8FBFF] p-4 sm:p-5 rounded-2xl border-2 border-[#BCEBDD] space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#17436A]">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#17436A]" />
                      <span>مجال: {quickQuestion.field}</span>
                    </div>

                    <span className="text-[11px] bg-[#BCEBDD]/50 px-2 py-0.5 rounded-md font-bold">
                      سؤال رقم {quickQuestionIndex + 1}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-black text-[#17436A] leading-relaxed">
                    {quickQuestion.prompt}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {quickQuestion.options?.map((option, idx) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = isAnswerSubmitted && option === quickQuestion.correctAnswer;
                      const isWrong = isAnswerSubmitted && isSelected && option !== quickQuestion.correctAnswer;

                      return (
                        <motion.button
                          key={idx}
                          disabled={isAnswerSubmitted}
                          onClick={() => handleSelectQuickAnswer(option)}
                          whileHover={!isAnswerSubmitted ? { scale: 1.025, x: -2 } : {}}
                          whileTap={!isAnswerSubmitted ? { scale: 0.98 } : {}}
                          transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                          className={`p-3 rounded-xl border-2 text-xs sm:text-sm font-black text-right transition-colors cursor-pointer flex items-center justify-between ${
                            isCorrect
                              ? 'bg-[#BCEBDD] border-[#17436A] text-[#17436A] shadow-xs'
                              : isWrong
                              ? 'bg-[#17436A] text-white border-[#17436A]'
                              : isSelected
                              ? 'bg-[#BCEBDD]/50 border-[#17436A] text-[#17436A] shadow-xs'
                              : 'bg-[#FFFFFF] border-[#BCEBDD] text-[#17436A] hover:border-[#17436A]'
                          }`}
                        >
                          <span>{option}</span>
                          {isCorrect && <Check className="w-4 h-4 text-[#17436A] shrink-0" />}
                          {isWrong && <X className="w-4 h-4 text-white shrink-0" />}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Submit / Continue Buttons */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                    {!isAnswerSubmitted ? (
                      <div className="flex items-center gap-2">
                        <motion.button
                          onClick={handleSubmitQuickAnswer}
                          disabled={!selectedAnswer}
                          whileHover={selectedAnswer ? { scale: 1.05 } : {}}
                          whileTap={selectedAnswer ? { scale: 0.95 } : {}}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="bg-[#17436A] hover:bg-[#0F2D48] disabled:opacity-40 text-white border border-[#BCEBDD] px-5 py-2 rounded-xl text-xs font-black transition cursor-pointer shadow-2xs"
                        >
                          تأكيد الإجابة
                        </motion.button>

                        <motion.button
                          onClick={handleNextQuickQuestion}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs font-bold text-[#17436A] hover:bg-[#BCEBDD]/30 border border-[#BCEBDD] px-3 py-2 rounded-xl transition cursor-pointer"
                        >
                          سؤال آخر
                        </motion.button>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full">
                        <span className="text-xs font-black text-[#17436A]">
                          {selectedAnswer === quickQuestion.correctAnswer
                            ? 'أحسنتِ إجابة ممتازة وذكية!'
                            : `الإجابة الصحيحة هي: ${quickQuestion.correctAnswer}`}
                        </span>

                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={handleNextQuickQuestion}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#BCEBDD] hover:bg-[#aee6d6] text-[#17436A] border border-[#17436A]/20 px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer"
                          >
                            سؤال آخر
                          </motion.button>

                          <motion.button
                            onClick={handleStartClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#17436A] hover:bg-[#0F2D48] text-white border border-[#BCEBDD] px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                          >
                            <span>تابعي في الرحلة</span>
                            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ================================================================= */}
        {/* 9. ACADEMIC SUPERVISION & PREPARATION TEAM CARD                   */}
        {/* ================================================================= */}
        <motion.div
          variants={itemVariants}
          className="bg-[#FFFFFF] rounded-3xl p-5 sm:p-6 shadow-xs border-2 border-[#BCEBDD] text-center space-y-4"
        >
          <div className="space-y-1 border-b border-[#BCEBDD] pb-3">
            <h3 className="text-base sm:text-lg font-black text-[#17436A] flex items-center justify-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#17436A]" />
              <span>فريق الإشراف والإعداد التعليمي</span>
            </h3>
            <p className="text-xs text-[#17436A]/80 font-bold">
              مدرسة المطوعة شريفة العمر - المتوسطة بنات • قسم التربية الإسلامية
            </p>
          </div>

          {/* 2x2 Grid of Team Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-right">
            {/* 1. Assistant Principal */}
            <motion.div
              whileHover={{ scale: 1.025, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="bg-[#F8FBFF] border border-[#BCEBDD] rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs"
            >
              <div>
                <span className="text-[11px] font-black text-[#17436A]/80 block">
                  المديرة المساعدة
                </span>
                <h4 className="text-sm sm:text-base font-black text-[#17436A]">
                  أ. مشاعل العنزي
                </h4>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#BCEBDD] text-[#17436A] flex items-center justify-center shrink-0 border border-[#17436A]/10 font-bold">
                <Users className="w-5 h-5" />
              </div>
            </motion.div>

            {/* 2. Technical Supervisor */}
            <motion.div
              whileHover={{ scale: 1.025, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="bg-[#F8FBFF] border border-[#BCEBDD] rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs"
            >
              <div>
                <span className="text-[11px] font-black text-[#17436A]/80 block">
                  الموجهة الفنية
                </span>
                <h4 className="text-sm sm:text-base font-black text-[#17436A]">
                  أ. ريم الظفيري
                </h4>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#BCEBDD] text-[#17436A] flex items-center justify-center shrink-0 border border-[#17436A]/10 font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
            </motion.div>

            {/* 3. Head of Department */}
            <motion.div
              whileHover={{ scale: 1.025, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="bg-[#F8FBFF] border border-[#BCEBDD] rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs"
            >
              <div>
                <span className="text-[11px] font-black text-[#17436A]/80 block">
                  رئيسة القسم
                </span>
                <h4 className="text-sm sm:text-base font-black text-[#17436A]">
                  أ. فاطمة الدوسري
                </h4>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#BCEBDD] text-[#17436A] flex items-center justify-center shrink-0 border border-[#17436A]/10 font-bold">
                <User className="w-5 h-5" />
              </div>
            </motion.div>

            {/* 4. Teacher Preparation */}
            <motion.div
              whileHover={{ scale: 1.025, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="bg-[#F8FBFF] border border-[#BCEBDD] rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs"
            >
              <div>
                <span className="text-[11px] font-black text-[#17436A]/80 block">
                  إعداد وتنفيذ المعلمة
                </span>
                <h4 className="text-sm sm:text-base font-black text-[#17436A]">
                  أ. أفراح المزعل
                </h4>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#BCEBDD] text-[#17436A] flex items-center justify-center shrink-0 border border-[#17436A]/10 font-bold">
                <Award className="w-5 h-5" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/* 10. EXPANDABLE CURRICULUM & QUESTION BANK DIRECT ACCESS           */}
        {/* ================================================================= */}
        <motion.div variants={itemVariants} className="pt-2 border-t border-[#BCEBDD]">
          <motion.button
            onClick={() => {
              sounds.playClick();
              setShowCurriculumOverview(!showCurriculumOverview);
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="bg-[#FFFFFF] hover:bg-[#F8FBFF] border-2 border-[#BCEBDD] text-[#17436A] px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-2xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#17436A]" />
            <span>
              {showCurriculumOverview
                ? 'إخفاء تفاصيل بنك الأسئلة (80 سؤالاً)'
                : 'استعراض تفاصيل المنهج وبنك الأسئلة الكامل (80 سؤالاً)'}
            </span>
            {showCurriculumOverview ? (
              <ChevronUp className="w-4 h-4 text-[#17436A]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#17436A]" />
            )}
          </motion.button>

          <AnimatePresence>
            {showCurriculumOverview && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="mt-5 space-y-4 text-right overflow-hidden"
              >
                {/* Stats Bar */}
                <div className="bg-[#FFFFFF] p-4 rounded-2xl border-2 border-[#BCEBDD] space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#17436A]">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-[#17436A]" />
                      مؤشر الإنجاز الكلي في المنهج
                    </span>
                    <span className="font-black">{progressPercentage}% مكتمل</span>
                  </div>
                  <div className="w-full h-3 bg-[#F8FBFF] border border-[#BCEBDD] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-[#BCEBDD] rounded-full"
                    />
                  </div>
                </div>

                {/* Direct Shortcut to Question Bank Modal */}
                <div className="p-4 bg-[#F8FBFF] rounded-2xl border-2 border-[#BCEBDD] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-black text-[#17436A]">بنك الأسئلة المعتمد الشامل</h4>
                    <p className="text-xs text-[#17436A]/75 font-semibold mt-0.5">
                      يحتوي على 80 سؤالاً مقسمة على مجالات العقيدة، الحديث، الفقه، السيرة، والتهذيب
                    </p>
                  </div>
                  <motion.button
                    onClick={() => {
                      sounds.playClick();
                      onOpenQuestionBank();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#17436A] hover:bg-[#0F2D48] text-white border border-[#BCEBDD] px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap shadow-2xs"
                  >
                    فتح بنك الأسئلة
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};
