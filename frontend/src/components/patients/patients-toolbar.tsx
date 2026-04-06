'use client';

import { Search, UserPlus2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PatientsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

export function PatientsToolbar({
  search,
  onSearchChange,
  onAddClick,
}: PatientsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
      <div className="relative w-full">
        <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث برقم المريض، الاسم، أو الهاتف..."
          className="h-12 rounded-xl border-white/20 bg-white/5 pr-11 text-right text-white placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-[#f9bd22] focus-visible:border-[#f9bd22] transition-colors"
        />
      </div>

      <Button
        onClick={onAddClick}
        className="h-12 w-full sm:w-auto shrink-0 rounded-xl bg-[#f9bd22] px-6 text-[#00150f] font-bold shadow-md hover:bg-[#e0aa1c] transition-colors"
      >
        <UserPlus2 className="ml-2 h-4 w-4" />
        إضافة مريض جديد
      </Button>
    </div>
  );
}