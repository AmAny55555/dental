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
    <div className="rounded-[28px] border border-slate-100 bg-slate-50 p-4 shadow-sm md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث بالاسم أو رقم الهاتف"
            className="h-12 rounded-2xl border-slate-200 bg-white pr-11 text-right shadow-sm focus-visible:ring-cyan-500"
          />
        </div>

        <Button
          onClick={onAddClick}
          className="h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 px-5 text-white shadow-lg hover:from-cyan-600 hover:to-sky-700"
        >
          <UserPlus2 className="ml-2 h-4 w-4" />
          إضافة مريض جديد
        </Button>
      </div>
    </div>
  );
}