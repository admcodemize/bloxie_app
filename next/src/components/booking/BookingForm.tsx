'use client';

import { useState, FormEvent } from 'react';
import styles from './BookingForm.module.css';

type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  date: string;
};

interface BookingFormProps {
  companySlug: string;
  slot: TimeSlot;
  onComplete: () => void;
  onCancel: () => void;
}

export default function BookingForm({ companySlug, slot, onComplete, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: Convex Mutation zum Erstellen der Buchung
      // await convex.mutation(api.bookings.create, {
      //   slotId: slot.id,
      //   customerName: formData.name,
      //   customerEmail: formData.email,
      //   customerPhone: formData.phone,
      //   notes: formData.notes,
      // });

      // Demo: Simuliere API Call
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Buchung erfolgreich! Sie erhalten eine Bestätigung per E-Mail.');
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Ihre Daten</h3>
        <div className={styles.slotInfo}>
          <strong>Gewählter Termin:</strong> {slot.date} um {slot.startTime} - {slot.endTime}
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Ihr vollständiger Name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            E-Mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="ihre@email.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Telefon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
            placeholder="+41 XX XXX XX XX"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="notes" className={styles.label}>
            Notizen (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Haben Sie besondere Wünsche oder Anmerkungen?"
            rows={4}
          />
        </div>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
            disabled={isSubmitting}
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Wird gebucht...' : 'Termin buchen'}
          </button>
        </div>
      </form>
    </div>
  );
}

