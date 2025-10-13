import { api } from '@/../convex/_generated/api';
import BookingCalendar from '@/components/booking/BookingCalendar';
import CompanyHeader from '@/components/booking/CompanyHeader';
import { convex } from '@/lib/convex';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

// Types (später in shared package verschieben)
type Company = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
};

type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  date: string;
};

interface BookingPageProps {
  params: Promise<{
    companySlug: string;
  }>;
}

// Statische Parameter für ISR generieren
export async function generateStaticParams() {
  try {
    const companies = await convex.query(api.companies.getPublicCompanies);
    return companies.map((company) => ({
      companySlug: company.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Metadata für SEO
export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { companySlug } = await params;
  
  try {
    const company = await convex.query(api.companies.getBySlug, { slug: companySlug });
    
    if (!company) {
      return {
        title: 'Termin buchen | Bloxie',
        description: 'Online Terminbuchung',
      };
    }

    return {
      title: `Termin buchen bei ${company.name} | Bloxie`,
      description: company.description || `Buchen Sie Ihren Termin bei ${company.name} schnell und einfach online.`,
      openGraph: {
        title: `Termin buchen bei ${company.name}`,
        description: company.description || 'Online Terminbuchung',
        type: 'website',
        ...(company.logo && { images: [company.logo] }),
      },
    };
  } catch (error) {
    return {
      title: 'Termin buchen | Bloxie',
      description: 'Online Terminbuchung',
    };
  }
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { companySlug } = await params;

  // Company Daten laden
  let company: Company | null = null;
  let availableSlots: TimeSlot[] = [];

  try {
    company = await convex.query(api.companies.getBySlug, { slug: companySlug });
    
    if (!company) {
      notFound();
    }

    // Verfügbare Slots für die nächsten 30 Tage laden
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    availableSlots = await convex.query(api.bookings.getAvailableSlots, {
      companySlug,
      startDate,
      endDate,
    });

  } catch (error) {
    console.error('Error loading booking data:', error);
    notFound();
  }

  return (
    <div className={styles.container}>
      <CompanyHeader company={company} />
      
      <main className={styles.main}>
        <div className={styles.bookingSection}>
          <h1 className={styles.title}>Termin buchen</h1>
          <p className={styles.subtitle}>
            Wählen Sie einen verfügbaren Zeitpunkt aus
          </p>
          
          <BookingCalendar 
            companySlug={companySlug}
            availableSlots={availableSlots}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Powered by Bloxie</p>
      </footer>
    </div>
  );
}

// ISR: Seite alle 60 Sekunden neu generieren
export const revalidate = 60;

