import CabinCard from '@/app/_components/CabinCard';
import { getCabins } from '@/app/_lib/data-service';
import { unstable_noStore } from 'next/cache';

async function CabinList({ filter }) {
  // unstable_noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;
  if (filter === 'all') displayedCabins = cabins;
  if (filter === 'large')
    displayedCabins = cabins.filter(cabin => cabin.maxCapacity >= 8);
  if (filter === 'medium')
    displayedCabins = cabins.filter(
      cabin => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === 'small')
    displayedCabins = cabins.filter(cabin => cabin.maxCapacity <= 3);
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
      {displayedCabins.map(cabin => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
