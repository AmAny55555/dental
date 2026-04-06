import { PatientsPage } from '@/components/patients/patients-page';
import { AppLayout } from '@/components/layout/app-layout';

export default function Page() {
  return (
    <AppLayout>
      <PatientsPage />
    </AppLayout>
  );
}