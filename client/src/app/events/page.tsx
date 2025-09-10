"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import {
  roboticsEvents,
  getUpcomingEvents,
  getPastEvents,
  type RoboticsEvent,
} from "../../data/events";
import { Calendar, List, MapPin, Clock, ExternalLink, X } from "lucide-react";

type ViewMode = "calendar" | "list";

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [selectedEvent, setSelectedEvent] = useState<RoboticsEvent | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pastEventsPage, setPastEventsPage] = useState(1);
  const [listViewTab, setListViewTab] = useState<"upcoming" | "past">(
    "upcoming"
  );
  const eventsPerPage = 10;

  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  // Pagination for upcoming events
  const totalUpcomingPages = Math.ceil(upcomingEvents.length / eventsPerPage);
  const startUpcomingIndex = (currentPage - 1) * eventsPerPage;
  const endUpcomingIndex = startUpcomingIndex + eventsPerPage;
  const currentUpcomingEvents = upcomingEvents.slice(
    startUpcomingIndex,
    endUpcomingIndex
  );

  // Pagination for past events
  const totalPastPages = Math.ceil(pastEvents.length / eventsPerPage);
  const startPastIndex = (pastEventsPage - 1) * eventsPerPage;
  const endPastIndex = startPastIndex + eventsPerPage;
  const currentPastEvents = pastEvents.slice(startPastIndex, endPastIndex);

  // Group events by year and month for demarcation
  const groupEventsByDate = (events: RoboticsEvent[]) => {
    const grouped: { [key: string]: RoboticsEvent[] } = {};
    events.forEach((event) => {
      const date = new Date(event.startDate);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(event);
    });
    return grouped;
  };

  // Get color based on category
  const getCategoryCalendarColor = (category: string, isPast: boolean) => {
    if (isPast) {
      return {
        backgroundColor: "#6b7280",
        borderColor: "#4b5563",
        textColor: "#ffffff",
      };
    }

    switch (category) {
      case "conference":
        return {
          backgroundColor: "#fbbf24", // Yellow
          borderColor: "#f59e0b",
          textColor: "#1f2937", // Dark text
        };
      case "expo":
        return {
          backgroundColor: "#8b5cf6", // Purple
          borderColor: "#7c3aed",
          textColor: "#ffffff",
        };
      case "summit":
        return {
          backgroundColor: "#10b981", // Green
          borderColor: "#059669",
          textColor: "#ffffff",
        };
      case "symposium":
        return {
          backgroundColor: "#f97316", // Orange
          borderColor: "#ea580c",
          textColor: "#ffffff",
        };
      default:
        return {
          backgroundColor: "#fbbf24", // Default yellow
          borderColor: "#f59e0b",
          textColor: "#1f2937",
        };
    }
  };

  // Convert events to FullCalendar format
  const calendarEvents = roboticsEvents.map((event) => {
    const colors = getCategoryCalendarColor(event.category, event.isPast);

    // For FullCalendar, end date should be the day after the actual end date (exclusive)
    const endDate = new Date(event.endDate);
    endDate.setDate(endDate.getDate()); // Add one day to make the end date inclusive
    const adjustedEndDate = endDate.toISOString().split("T")[0];
    const startDate = new Date(event.startDate);
    startDate.setDate(startDate.getDate() - 1); // Subtract one day to make the start date earlier
    const adjustedStartDate = startDate.toISOString().split("T")[0];

    return {
      id: event.id,
      title: event.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
      backgroundColor: colors.backgroundColor,
      borderColor: colors.borderColor,
      textColor: colors.textColor,
      extendedProps: {
        event: event,
        location: event.location,
      },
      allDay: true,
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event.extendedProps.event as RoboticsEvent;
    setSelectedEvent(event);
  };

  const handleListEventClick = (event: RoboticsEvent) => {
    setSelectedEvent(event);
  };

  const handleTabChange = (tab: "upcoming" | "past") => {
    setListViewTab(tab);
    // Reset pagination when switching tabs
    if (tab === "upcoming") {
      setCurrentPage(1);
    } else {
      setPastEventsPage(1);
    }
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  const formatDateRangeShort = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start.toDateString() === end.toDateString()) {
      return formatDateShort(startDate);
    }

    return `${formatDateShort(startDate)} - ${formatDateShort(endDate)}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "conference":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "expo":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "summit":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "symposium":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Background geometric accents */}
      <div className="geometric-accent"></div>
      <div className="geometric-accent"></div>

      <Navbar />

      <main className="flex justify-center">
        <div className="w-full px-4 md:w-5/6 md:px-0 lg:w-3/4 mx-auto pt-8 pb-16">
          {/* Header section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 tracking-wide">
              Robotics Events
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-6">
              Discover upcoming conferences, expos, and symposiums in the
              robotics industry. Stay connected with the global robotics
              community.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode("calendar")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                  viewMode === "calendar"
                    ? "bg-yellow-500 text-gray-800"
                    : "text-gray-300 hover:text-yellow-500"
                }`}
              >
                <Calendar className="w-4 h-4" />
                Calendar View
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                  viewMode === "list"
                    ? "bg-yellow-500 text-gray-800"
                    : "text-gray-300 hover:text-yellow-500"
                }`}
              >
                <List className="w-4 h-4" />
                List View
              </button>
            </div>
          </div>

          {/* Content Area - 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Selected Event for Mobile Multi-Month View */}
              {viewMode === "calendar" && selectedEvent && (
                <div className="lg:hidden mb-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-4 border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getCategoryColor(selectedEvent.category)}`}
                    >
                      {selectedEvent.category}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {selectedEvent.year}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {selectedEvent.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDateRangeShort(
                        selectedEvent.startDate,
                        selectedEvent.endDate
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedEvent.location.split(",").slice(0, 2).join(",")}
                    </div>
                  </div>
                </div>
              )}

              {viewMode === "calendar" ? (
                <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
                  <FullCalendar
                    plugins={[
                      dayGridPlugin,
                      multiMonthPlugin,
                      interactionPlugin,
                    ]}
                    initialView="dayGridMonth"
                    events={calendarEvents}
                    eventClick={handleEventClick}
                    height="auto"
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,multiMonthYear",
                    }}
                    views={{
                      multiMonthYear: {
                        type: "multiMonthYear",
                        multiMonthMaxColumns: 1,
                      },
                    }}
                    themeSystem="standard"
                    eventDisplay="block"
                    displayEventTime={false}
                    eventTextColor="#ffffff"
                    dayCellClassNames="hover:bg-gray-600/20"
                    eventClassNames="cursor-pointer hover:opacity-80 transition-opacity"
                    dayMaxEventRows={3}
                    moreLinkClick="popover"
                    nextDayThreshold="09:00:00"
                    timeZone="UTC"
                    eventContent={(eventInfo) => {
                      const event = eventInfo.event.extendedProps
                        .event as RoboticsEvent;
                      // Get city and country (last two parts)
                      const locationParts = event.location.split(",");
                      const location =
                        locationParts.length >= 2
                          ? `${locationParts[0].trim()}, ${locationParts[locationParts.length - 1].trim()}`
                          : event.location;

                      return (
                        <div className="text-xs leading-tight p-1">
                          <div className="font-semibold truncate text-sm">
                            {eventInfo.event.title}
                          </div>
                          <div className="opacity-90 truncate">{location}</div>
                        </div>
                      );
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Tab Interface */}
                  <div className="flex items-center gap-8">
                    <button
                      onClick={() => handleTabChange("upcoming")}
                      className={`text-lg font-semibold transition-all duration-200 border-b-2 pb-2 cursor-pointer ${
                        listViewTab === "upcoming"
                          ? "text-yellow-500 border-yellow-500"
                          : "text-gray-400 border-transparent hover:text-yellow-500"
                      }`}
                    >
                      Upcoming Events ({upcomingEvents.length})
                    </button>
                    <button
                      onClick={() => handleTabChange("past")}
                      className={`text-lg font-semibold transition-all duration-200 border-b-2 pb-2 cursor-pointer ${
                        listViewTab === "past"
                          ? "text-gray-300 border-gray-300"
                          : "text-gray-400 border-transparent hover:text-gray-300"
                      }`}
                    >
                      Past Events ({pastEvents.length})
                    </button>
                  </div>

                  {/* Tab Content */}
                  {listViewTab === "upcoming" ? (
                    <section>
                      {upcomingEvents.length > 0 ? (
                        <>
                          <div className="space-y-6">
                            {Object.entries(
                              groupEventsByDate(currentUpcomingEvents)
                            ).map(([monthKey, monthEvents]) => {
                              const [year, month] = monthKey.split("-");
                              const monthName = new Date(
                                parseInt(year),
                                parseInt(month) - 1
                              ).toLocaleDateString("en-US", {
                                month: "long",
                                year: "numeric",
                              });

                              return (
                                <div key={monthKey} className="space-y-4">
                                  {/* Month/Year Demarcation */}
                                  <div className="flex items-center gap-4">
                                    <div className="h-px bg-gradient-to-r from-yellow-500 to-transparent flex-1"></div>
                                    <h3 className="text-lg font-semibold text-yellow-400 uppercase tracking-wider px-4">
                                      {monthName}
                                    </h3>
                                    <div className="h-px bg-gradient-to-l from-yellow-500 to-transparent flex-1"></div>
                                  </div>

                                  {/* Events for this month */}
                                  {monthEvents.map((event) => (
                                    <div
                                      key={event.id}
                                      className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-yellow-500 transition-all duration-300 cursor-pointer"
                                      onClick={() =>
                                        handleListEventClick(event)
                                      }
                                    >
                                      <div className="flex flex-col sm:flex-row gap-4">
                                        {/* Date Section - Prominent */}
                                        <div className="w-full sm:w-16 lg:w-20 flex-shrink-0">
                                          <div className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-gray-800 rounded-lg p-2 text-center">
                                            <div className="text-xs font-semibold uppercase tracking-wider">
                                              {new Date(
                                                event.startDate
                                              ).toLocaleDateString("en-US", {
                                                month: "short",
                                              })}
                                            </div>
                                            <div className="text-base font-bold">
                                              {new Date(
                                                event.startDate
                                              ).getDate()}
                                            </div>
                                            <div className="text-xs font-medium">
                                              {new Date(
                                                event.startDate
                                              ).getFullYear()}
                                            </div>
                                          </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex-1">
                                          <div className="flex items-center gap-3 mb-2">
                                            <span
                                              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getCategoryColor(event.category)}`}
                                            >
                                              {event.category}
                                            </span>
                                            <span className="text-gray-400 text-sm">
                                              {event.year}
                                            </span>
                                          </div>
                                          <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">
                                            {event.title}
                                          </h3>
                                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                                            {event.shortDescription}
                                          </p>
                                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-400">
                                            <div className="flex items-center gap-1">
                                              <Clock className="w-4 h-4" />
                                              {formatDateRangeShort(
                                                event.startDate,
                                                event.endDate
                                              )}
                                            </div>
                                            <div className="flex items-center gap-1">
                                              <MapPin className="w-4 h-4" />
                                              {event.location}
                                            </div>
                                          </div>
                                        </div>

                                        {/* Action Section */}
                                        <div className="lg:w-24 flex-shrink-0 flex items-center justify-center lg:justify-end">
                                          <div className="flex items-center text-yellow-500">
                                            <span className="text-sm font-medium hidden lg:inline">
                                              View
                                            </span>
                                            <ExternalLink className="w-4 h-4 lg:ml-2" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              );
                            })}
                          </div>

                          {/* Pagination for Upcoming Events */}
                          {totalUpcomingPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-8">
                              <button
                                onClick={() =>
                                  setCurrentPage(Math.max(1, currentPage - 1))
                                }
                                disabled={currentPage === 1}
                                className="px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                Previous
                              </button>

                              <div className="flex gap-1">
                                {Array.from(
                                  { length: totalUpcomingPages },
                                  (_, i) => i + 1
                                ).map((page) => (
                                  <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-2 rounded-lg border transition-colors ${
                                      currentPage === page
                                        ? "border-yellow-500 bg-yellow-500 text-gray-900 font-semibold"
                                        : "border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                                  >
                                    {page}
                                  </button>
                                ))}
                              </div>

                              <button
                                onClick={() =>
                                  setCurrentPage(
                                    Math.min(
                                      totalUpcomingPages,
                                      currentPage + 1
                                    )
                                  )
                                }
                                disabled={currentPage === totalUpcomingPages}
                                className="px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                Next
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-12 text-gray-400">
                          <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p>No upcoming events found.</p>
                        </div>
                      )}
                    </section>
                  ) : (
                    /* Past Events Tab */
                    <section>
                      {pastEvents.length > 0 ? (
                        <>
                          <div className="space-y-6">
                            {Object.entries(
                              groupEventsByDate(currentPastEvents)
                            ).map(([monthKey, monthEvents]) => {
                              const [year, month] = monthKey.split("-");
                              const monthName = new Date(
                                parseInt(year),
                                parseInt(month) - 1
                              ).toLocaleDateString("en-US", {
                                month: "long",
                                year: "numeric",
                              });

                              return (
                                <div key={monthKey} className="space-y-4">
                                  {/* Month/Year Demarcation */}
                                  <div className="flex items-center gap-4">
                                    <div className="h-px bg-gradient-to-r from-gray-500 to-transparent flex-1"></div>
                                    <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-wider px-4">
                                      {monthName}
                                    </h3>
                                    <div className="h-px bg-gradient-to-l from-gray-500 to-transparent flex-1"></div>
                                  </div>

                                  {/* Events for this month */}
                                  {monthEvents.map((event) => (
                                    <div
                                      key={event.id}
                                      className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 rounded-xl p-6 border border-gray-600/90 hover:border-gray-500 transition-all duration-300 cursor-pointer opacity-95"
                                      onClick={() =>
                                        handleListEventClick(event)
                                      }
                                    >
                                      <div className="flex flex-col sm:flex-row gap-4">
                                        {/* Date Section - Prominent but muted for past events */}
                                        <div className="w-full sm:w-16 lg:w-20 flex-shrink-0">
                                          <div className="bg-gradient-to-br from-gray-600 to-gray-500 text-gray-200 rounded-lg p-2 text-center">
                                            <div className="text-xs font-semibold uppercase tracking-wider">
                                              {new Date(
                                                event.startDate
                                              ).toLocaleDateString("en-US", {
                                                month: "short",
                                              })}
                                            </div>
                                            <div className="text-base font-bold">
                                              {new Date(
                                                event.startDate
                                              ).getDate()}
                                            </div>
                                            <div className="text-xs font-medium">
                                              {new Date(
                                                event.startDate
                                              ).getFullYear()}
                                            </div>
                                          </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex-1">
                                          <div className="flex items-center gap-3 mb-2">
                                            <span
                                              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border opacity-60 ${getCategoryColor(event.category)}`}
                                            >
                                              {event.category}
                                            </span>
                                            <span className="text-gray-500 text-sm">
                                              {event.year}
                                            </span>
                                          </div>
                                          <h3 className="text-lg font-semibold text-gray-300 mb-2 line-clamp-1">
                                            {event.title}
                                          </h3>
                                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                            {event.shortDescription}
                                          </p>
                                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                              <Clock className="w-4 h-4" />
                                              {formatDateRangeShort(
                                                event.startDate,
                                                event.endDate
                                              )}
                                            </div>
                                            <div className="flex items-center gap-1">
                                              <MapPin className="w-4 h-4" />
                                              {event.location}
                                            </div>
                                          </div>
                                        </div>

                                        {/* Action Section */}
                                        <div className="lg:w-24 flex-shrink-0 flex items-center justify-center lg:justify-end">
                                          <div className="flex items-center text-gray-500">
                                            <span className="text-sm font-medium hidden lg:inline">
                                              View
                                            </span>
                                            <ExternalLink className="w-4 h-4 lg:ml-2" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              );
                            })}
                          </div>

                          {/* Pagination for Past Events */}
                          {totalPastPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-8">
                              <button
                                onClick={() =>
                                  setPastEventsPage(
                                    Math.max(1, pastEventsPage - 1)
                                  )
                                }
                                disabled={pastEventsPage === 1}
                                className="px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                Previous
                              </button>

                              <div className="flex gap-1">
                                {Array.from(
                                  { length: totalPastPages },
                                  (_, i) => i + 1
                                ).map((page) => (
                                  <button
                                    key={page}
                                    onClick={() => setPastEventsPage(page)}
                                    className={`px-3 py-2 rounded-lg border transition-colors ${
                                      pastEventsPage === page
                                        ? "border-gray-400 bg-gray-500 text-white font-semibold"
                                        : "border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                                  >
                                    {page}
                                  </button>
                                ))}
                              </div>

                              <button
                                onClick={() =>
                                  setPastEventsPage(
                                    Math.min(totalPastPages, pastEventsPage + 1)
                                  )
                                }
                                disabled={pastEventsPage === totalPastPages}
                                className="px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                Next
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <Calendar className="w-16 h-16 mx-auto mb-4 opacity-30" />
                          <p>No past events found.</p>
                        </div>
                      )}
                    </section>
                  )}
                </div>
              )}
            </div>

            {/* Event Details Column - Desktop */}
            <div className="lg:col-span-1 hidden lg:block">
              {selectedEvent ? (
                <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 sticky top-24">
                  {/* Header */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getCategoryColor(selectedEvent.category)}`}
                      >
                        {selectedEvent.category}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {selectedEvent.year}
                      </span>
                    </div>
                    <h2 className="text-xl mt-3 font-bold text-white leading-tight">
                      {selectedEvent.title}
                    </h2>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-6">
                    {/* Date & Location */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-gray-300">
                        <Clock className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-md leading-tight">
                            {formatDateRangeShort(
                              selectedEvent.startDate,
                              selectedEvent.endDate
                            )}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {selectedEvent.isPast
                              ? "Event completed"
                              : "Upcoming event"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-gray-300">
                        <MapPin className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {selectedEvent.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-500 mb-3">
                        About This Event
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {selectedEvent.fullDescription}
                      </p>
                    </div>

                    {/* Website Link */}
                    {selectedEvent.website && (
                      <div>
                        <a
                          href={selectedEvent.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-br from-yellow-500 to-yellow-300 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-[0_5px_15px_rgba(212,175,55,0.3)] hover:-translate-y-0.5"
                        >
                          Visit Website
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="pt-4 border-t border-gray-600">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Event Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-400">Type</p>
                          <p className="text-white capitalize">
                            {selectedEvent.category}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Year</p>
                          <p className="text-white">{selectedEvent.year}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Status</p>
                          <p
                            className={`font-medium ${selectedEvent.isPast ? "text-gray-400" : "text-green-400"}`}
                          >
                            {selectedEvent.isPast ? "Completed" : "Upcoming"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 text-center">
                  <div className="text-gray-400 mb-4">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">
                      Select an Event
                    </h3>
                    <p className="text-sm">
                      Click on any event in the {viewMode} to view detailed
                      information.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Event Details Modal */}
          {selectedEvent && (
            <div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedEvent(null)}
            >
              <div
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl border border-gray-600 w-full max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-600">
                  <h3 className="text-lg font-semibold text-white">
                    Event Details
                  </h3>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="bg-transparent border-none text-gray-300 cursor-pointer p-2 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center w-8 h-8 hover:bg-gray-600/20 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getCategoryColor(selectedEvent.category)}`}
                      >
                        {selectedEvent.category}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {selectedEvent.year}
                      </span>
                    </div>
                    <h2 className="text-xl mt-3 font-bold text-white leading-tight">
                      {selectedEvent.title}
                    </h2>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-6">
                    {/* Date & Location */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-gray-300">
                        <Clock className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-sm leading-tight">
                            {formatDateRangeShort(
                              selectedEvent.startDate,
                              selectedEvent.endDate
                            )}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {selectedEvent.isPast
                              ? "Event completed"
                              : "Upcoming event"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-gray-300">
                        <MapPin className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {selectedEvent.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-500 mb-3">
                        About This Event
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {selectedEvent.fullDescription}
                      </p>
                    </div>

                    {/* Website Link */}
                    {selectedEvent.website && (
                      <div>
                        <a
                          href={selectedEvent.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-br from-yellow-500 to-yellow-300 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-[0_5px_15px_rgba(212,175,55,0.3)] hover:-translate-y-0.5"
                        >
                          Visit Website
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="pt-4 border-t border-gray-600">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Event Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-400">Type</p>
                          <p className="text-white capitalize">
                            {selectedEvent.category}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Year</p>
                          <p className="text-white">{selectedEvent.year}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Status</p>
                          <p
                            className={`font-medium ${selectedEvent.isPast ? "text-gray-400" : "text-green-400"}`}
                          >
                            {selectedEvent.isPast ? "Completed" : "Upcoming"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
