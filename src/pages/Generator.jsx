import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Select } from '../components/ui/ui';
import { cn } from '../lib/utils';

const STEPS = [
  '1. Vehicle Details',
  '2. Driver Details',
  '3. Review Quote',
  '4. Complete Purchase',
];

export default function Generator() {
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState('Hours');
  const [time, setTime] = useState('1h');
  const navigate = useNavigate();

  return (
    <div className="bp-grid min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Steps */}
        <div className="mb-12 flex justify-center border-b border-ink-200 dark:border-ink-700">
          <div className="flex w-full max-w-3xl justify-between">
            {STEPS.map((label, i) => {
              const isActive = step === i + 1;
              return (
                <div
                  key={label}
                  className={cn(
                    "pb-4 text-sm font-bold cursor-pointer",
                    isActive ? "border-b-2 border-[#1ca3a6] text-[#1ca3a6]" : "text-ink-500 dark:text-ink-400"
                  )}
                  onClick={() => setStep(i + 1)}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Card */}
        <div className="mx-auto max-w-[500px] rounded-3xl bg-white p-8 shadow-xl shadow-ink-200/50 dark:bg-ink-850 dark:shadow-none dark:border dark:border-ink-700">
          <h2 className="mb-6 text-center text-2xl font-bold text-[#0a1930] dark:text-white">Vehicle Details</h2>

          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 inline-block rounded-2xl bg-[#e6f4fc] px-8 py-3 text-3xl font-bold tracking-widest text-[#5ba5c2]">
              AK13ZZZ
            </div>
            <div className="text-sm font-bold text-[#0a1930] dark:text-white">BMW 2 SERIES 2.0 220D SPORT</div>
            <div className="text-xs text-ink-400 mt-1">Year: 2016</div>
          </div>

          <div className="mb-8 flex items-center justify-center gap-2">
            <input
              type="text"
              defaultValue="AK13ZZZ"
              className="w-32 rounded-full border border-ink-300 px-4 py-2.5 text-center text-sm font-medium outline-none focus:border-[#00709b] dark:border-ink-600 dark:bg-ink-900 dark:text-white"
            />
            <Button className="!rounded-full bg-[#00709b] px-6 text-white hover:bg-[#005a7d]">LOOKUP</Button>
            <button className="px-2 text-sm font-semibold text-[#00709b] hover:underline dark:text-[#5ba5c2]">Edit</button>
          </div>

          <div className="mb-6 text-center">
            <div className="mb-3 text-sm font-bold text-[#0a1930] dark:text-white">Duration Type</div>
            <div className="flex gap-2">
              {['Hours', 'Days', 'Weeks'].map(d => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={cn(
                    "flex-1 rounded-full py-2.5 text-sm font-bold transition-colors",
                    duration === d ? "bg-[#0a1930] text-white dark:bg-white dark:text-[#0a1930]" : "border border-ink-200 text-[#0a1930] hover:bg-ink-50 dark:border-ink-600 dark:text-white dark:hover:bg-ink-800"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 text-center">
            <div className="mb-3 text-sm font-bold text-[#0a1930] dark:text-white">How long do you need documents for?</div>
            <div className="flex gap-2">
              {['1h', '3h', '5h', 'Other'].map(t => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={cn(
                    "flex-1 rounded-full py-2.5 text-sm font-bold transition-colors",
                    time === t ? "bg-[#0a1930] text-white dark:bg-white dark:text-[#0a1930]" : "border border-ink-200 text-[#0a1930] hover:bg-ink-50 dark:border-ink-600 dark:text-white dark:hover:bg-ink-800"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-3 text-center text-sm font-bold text-[#0a1930] dark:text-white">Reason for documents</div>
            <Select className="!rounded-full px-5 text-ink-500">
              <option value="">Select reason</option>
              <option value="temporary">Temporary Cover</option>
              <option value="test_drive">Test Drive</option>
            </Select>
          </div>

          <div className="mb-8">
            <div className="mb-3 text-center text-sm font-bold text-[#0a1930] dark:text-white">Vehicle Value</div>
            <Select className="!rounded-full px-5 text-ink-500">
              <option value="">Select vehicle value</option>
              <option value="10000">£10,000</option>
              <option value="20000">£20,000</option>
            </Select>
          </div>

          <div className="mb-6 rounded-3xl bg-[#e6f4fc] py-6 text-center dark:bg-[#00709b]/10">
            <div className="text-sm font-bold text-[#5ba5c2] dark:text-[#5ba5c2]">Total Price</div>
            <div className="text-4xl font-extrabold text-[#00709b] dark:text-[#5ba5c2]">£13.00</div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 rounded-full border border-ink-200 py-3 text-sm font-bold text-[#0a1930] hover:bg-ink-50 dark:border-ink-600 dark:text-white dark:hover:bg-ink-800">
              &larr; Back to Search
            </button>
            <button className="flex-[1.5] rounded-full bg-[#0a1930] py-3 text-sm font-bold text-white hover:bg-[#0a1930]/90 dark:bg-white dark:text-[#0a1930] dark:hover:bg-ink-100">
              Continue to Payment &rarr;
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}