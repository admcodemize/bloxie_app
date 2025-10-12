import BookingCalendar from '@/components/booking/BookingCalendar';
import CompanyHeader from '@/components/booking/CompanyHeader';
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
    // TODO: Convex Query für alle öffentlichen Companies
    // const companies = await convex.query(api.companies.getPublicCompanies);
    // return companies.map((company) => ({
    //   companySlug: company.slug,
    // }));
    
    // Vorerst leeres Array zurückgeben (wird dynamisch generiert)
    return [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Metadata für SEO
export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { companySlug } = await params;
  
  try {
    // TODO: Company Daten aus Convex holen
    // const company = await convex.query(api.companies.getBySlug, { slug: companySlug });
    
    return {
      title: `Termin buchen bei ${companySlug} | Bloxie`,
      description: `Buchen Sie Ihren Termin bei ${companySlug} schnell und einfach online.`,
      openGraph: {
        title: `Termin buchen bei ${companySlug}`,
        description: `Online Terminbuchung`,
        type: 'website',
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
    // TODO: Convex Queries implementieren
    // company = await convex.query(api.companies.getBySlug, { slug: companySlug });
    
    // if (!company) {
    //   notFound();
    // }

    // Verfügbare Slots für die nächsten 30 Tage laden
    // const startDate = new Date().toISOString();
    // const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    
    // availableSlots = await convex.query(api.bookings.getAvailableSlots, {
    //   companySlug,
    //   startDate,
    //   endDate,
    // });

    // Demo Daten (bis Convex Setup fertig ist)
    company = {
      _id: '1',
      name: companySlug.charAt(0).toUpperCase() + companySlug.slice(1),
      slug: companySlug,
      description: 'Buchen Sie Ihren Termin online',
    };

    // Demo Slots für die nächsten 7 Tage
    const demoSlots: TimeSlot[] = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date();
      date.setDate(date.getDate() + day);
      const dateStr = date.toISOString().split('T')[0];

      // 9-17 Uhr, stündliche Slots
      for (let hour = 9; hour < 17; hour++) {
        demoSlots.push({
          id: `${dateStr}-${hour}`,
          date: dateStr,
          startTime: `${hour.toString().padStart(2, '0')}:00`,
          endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
          duration: 60,
        });
      }
    }
    availableSlots = demoSlots;

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

