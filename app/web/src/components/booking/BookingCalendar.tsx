'use client';

import { useState } from 'react';
import { format, parseISO, startOfWeek, addDays } from 'date-fns';
import { de } from 'date-fns/locale';
import BookingForm from './BookingForm';
import styles from './BookingCalendar.module.css';

type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  date: string;
};

interface BookingCalendarProps {
  companySlug: string;
  availableSlots: TimeSlot[];
}

export default function BookingCalendar({ companySlug, availableSlots }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Gruppiere Slots nach Datum
  const slotsByDate = availableSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  // Verfügbare Daten
  const availableDates = Object.keys(slotsByDate).sort();

  // Slots für das ausgewählte Datum
  const slotsForSelectedDate = slotsByDate[selectedDate] || [];

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleBookingComplete = () => {
    setSelectedSlot(null);
    // Hier könnte man die Seite neu laden oder Slots aktualisieren
  };

  return (
    <div className={styles.container}>
      {/* Datum-Auswahl */}
      <div className={styles.dateSelection}>
        <h2 className={styles.sectionTitle}>Datum wählen</h2>
        <div className={styles.dateGrid}>
          {availableDates.map((date) => {
            const dateObj = parseISO(date);
            const isSelected = date === selectedDate;
            
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`${styles.dateButton} ${isSelected ? styles.dateButtonSelected : ''}`}
              >
                <div className={styles.dateDay}>
                  {format(dateObj, 'EEE', { locale: de })}
                </div>
                <div className={styles.dateNumber}>
                  {format(dateObj, 'd')}
                </div>
                <div className={styles.dateMonth}>
                  {format(dateObj, 'MMM', { locale: de })}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Zeit-Slots */}
      <div className={styles.timeSelection}>
        <h2 className={styles.sectionTitle}>Uhrzeit wählen</h2>
        {slotsForSelectedDate.length === 0 ? (
          <p className={styles.noSlots}>
            Keine verfügbaren Zeitslots für dieses Datum.
          </p>
        ) : (
          <div className={styles.timeGrid}>
            {slotsForSelectedDate.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              
              return (
                <button
                  key={slot.id}
                  onClick={() => handleSlotSelect(slot)}
                  className={`${styles.timeButton} ${isSelected ? styles.timeButtonSelected : ''}`}
                >
                  {slot.startTime}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Booking Formular */}
      {selectedSlot && (
        <div className={styles.formSection}>
          <BookingForm
            companySlug={companySlug}
            slot={selectedSlot}
            onComplete={handleBookingComplete}
            onCancel={() => setSelectedSlot(null)}
          />
        </div>
      )}
    </div>
  );
}

