/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutBento } from './components/AboutBento';
import { Consulting } from './components/Consulting';
import { StudentTools } from './components/StudentTools';
import { EssentialDocumentsChecklist } from './components/EssentialDocumentsChecklist';
import { YouTubeSection, BlogSection } from './components/ContentHub';
import { ResourcesToolkit } from './components/ResourcesToolkit';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { BlogModal } from './components/BlogModal';
import { VideoModal } from './components/VideoModal';
import { AdminModal } from './components/AdminModal';
import { ThemeProvider } from './context/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { BlogPost, ConsultingService, ConsultationBooking, WaitlistEntry } from './types';
import { INITIAL_BOOKINGS, INITIAL_WAITLIST, PERSONAL_INFO, BLOG_POSTS } from './data/siteData';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ConsultingService | undefined>(undefined);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Persistence for Bookings and Waitlist
  const [bookings, setBookings] = useState<ConsultationBooking[]>(() => {
    try {
      const saved = localStorage.getItem('gwp_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(() => {
    try {
      const saved = localStorage.getItem('gwp_waitlist');
      return saved ? JSON.parse(saved) : INITIAL_WAITLIST;
    } catch {
      return INITIAL_WAITLIST;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gwp_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.warn('Failed to save bookings to localStorage', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('gwp_waitlist', JSON.stringify(waitlist));
    } catch (e) {
      console.warn('Failed to save waitlist to localStorage', e);
    }
  }, [waitlist]);

  // Handle URL deep links from sitemap or external links (?post=..., ?section=..., ?tool=...)
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const postParam = searchParams.get('post') || searchParams.get('article');
      const sectionParam = searchParams.get('section');
      const toolParam = searchParams.get('tool');

      if (postParam) {
        const found = BLOG_POSTS.find((p) => p.id === postParam);
        if (found) {
          setSelectedPost(found);
        }
      } else if (sectionParam) {
        const targetId = sectionParam === 'stories' ? 'testimonials' : sectionParam;
        const el = document.getElementById(targetId);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 120);
        }
      } else if (toolParam) {
        const el = document.getElementById('tools');
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 120);
        }
      }
    } catch {
      // Safe fallback if window is unavailable
    }
  }, []);

  const handleOpenBooking = (_service?: ConsultingService) => {
    const consultingEl = document.getElementById('consulting');
    if (consultingEl) {
      consultingEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(PERSONAL_INFO.socials.topmate, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  const handleOpenPost = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  const handleNewBooking = (newBooking: ConsultationBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleNewWaitlist = (newEntry: WaitlistEntry) => {
    setWaitlist((prev) => [newEntry, ...prev]);
  };

  const handleUpdateBookingStatus = (id: string, status: 'confirmed' | 'pending' | 'completed' | 'cancelled') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#08090D] text-slate-900 dark:text-[#F3F4F6] relative selection:bg-indigo-500 selection:text-white transition-colors duration-300">
        {/* Global Background Ambient Grid & Radial Gradients */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-gradient pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10">
        {/* Reading Progress Indicator at top of screen */}
        <ReadingProgressBar />

        {/* Navigation Bar */}
        <Navbar
          onBookCallClick={() => handleOpenBooking()}
        />

        {/* Main Content Sections */}
        <main>
          {/* 1. Hero Section */}
          <Hero
            onBookCallClick={() => handleOpenBooking()}
            onWatchVideoClick={() => setIsVideoModalOpen(true)}
          />

          {/* 2. Bento Box About Me / Credentials */}
          <AboutBento />

          {/* 3. Consulting Services & Topmate.io Widget Replica */}
          <Consulting onOpenBookingModal={handleOpenBooking} />

          {/* 4. Interactive Student Calculators (Bavarian Formula, Monthly Cost of Living, Profile Readiness) */}
          <StudentTools onBookCallClick={() => handleOpenBooking()} />

          {/* 5. Essential Documents Checklist (APS, Blocked Account, Health Insurance, PDF Export) */}
          <EssentialDocumentsChecklist />

          {/* 6. Featured YouTube Video: Life in Germany & Tech */}
          <YouTubeSection onOpenVideoModal={() => setIsVideoModalOpen(true)} />

          {/* 6. Student Toolkit: Essential Settling & Banking Services */}
          <ResourcesToolkit />

          {/* 7. Articles & Practical Advice (Blog Guides) */}
          <BlogSection onSelectPost={handleOpenPost} />

          {/* 8. Frequently Asked Questions & Dynamic Policy Tracker */}
          <FaqSection onBookCallClick={() => handleOpenBooking()} />
        </main>

        {/* 9. Footer */}
        <Footer
          onBookCallClick={() => handleOpenBooking()}
        />
      </div>

      {/* Modals & Dialogs */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        initialService={selectedService}
        onBookingCreated={handleNewBooking}
      />

      <BlogModal
        post={selectedPost}
        onClose={handleClosePost}
        onBookCallClick={() => {
          handleClosePost();
          handleOpenBooking();
        }}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onBookCallClick={() => {
          setIsVideoModalOpen(false);
          handleOpenBooking();
        }}
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        bookings={bookings}
        waitlist={waitlist}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onDeleteBooking={handleDeleteBooking}
      />
    </div>
    </ErrorBoundary>
    </ThemeProvider>
  );
}

