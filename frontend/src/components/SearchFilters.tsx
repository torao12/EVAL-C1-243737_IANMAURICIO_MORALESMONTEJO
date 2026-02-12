'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar por nombre"
        className="w-full max-w-md p-2 border border-[#2F4156] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('search')?.toString()}
      />
    </div>
  );
}