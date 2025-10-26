import styles from './CompanyHeader.module.css';

type Company = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
};

interface CompanyHeaderProps {
  company: Company;
}

export default function CompanyHeader({ company }: CompanyHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {company.logo ? (
          <img 
            src={company.logo} 
            alt={company.name}
            className={styles.logo}
          />
        ) : (
          <div className={styles.logoPlaceholder}>
            {company.name.charAt(0).toUpperCase()}
          </div>
        )}
        
        <div className={styles.info}>
          <h1 className={styles.companyName}>{company.name}</h1>
          {company.description && (
            <p className={styles.description}>{company.description}</p>
          )}
        </div>
      </div>
    </header>
  );
}

