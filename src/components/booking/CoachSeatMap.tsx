import React from 'react';
import { Seat } from '../../types';
import { User } from 'lucide-react';

interface CoachSeatMapProps {
  seats: Seat[];
  selectedSeatNumbers: string[];
  onToggleSeat: (seatNumber: string) => void;
  maxSeats?: number;
}

export const CoachSeatMap: React.FC<CoachSeatMapProps> = ({
  seats,
  selectedSeatNumbers,
  onToggleSeat,
  maxSeats = 4
}) => {
  // Group seats by row
  const rowsMap = new Map<number, Seat[]>();
  seats.forEach(s => {
    if (!rowsMap.has(s.row)) rowsMap.set(s.row, []);
    rowsMap.get(s.row)!.push(s);
  });

  const sortedRows = Array.from(rowsMap.keys()).sort((a, b) => a - b);

  return (
    <div className="w-full bg-white border border-brand-border p-6 shadow-sm">
      
      {/* Title & Legend */}
      <div className="pb-6 border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-orange block">
            Shivneri 2x2 AC Coach
          </span>
          <h3 className="text-xl font-bold tracking-tight text-brand-black">
            Select Your Preferred Seats
          </h3>
          <span className="text-xs text-brand-muted">
            Max {maxSeats} seats per booking. Window & aisle seats available.
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 border border-brand-border bg-white rounded-xs" />
            <span className="text-brand-muted">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-brand-orange text-white rounded-xs flex items-center justify-center text-[10px] font-bold">✓</div>
            <span className="text-brand-black">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-[#D5D2CD] text-white/50 rounded-xs flex items-center justify-center text-[10px]">✕</div>
            <span className="text-brand-muted">Occupied</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-pink-100 border border-pink-300 text-pink-700 rounded-xs flex items-center justify-center text-[10px] font-bold">♀</div>
            <span className="text-pink-800">Ladies</span>
          </div>
        </div>
      </div>

      {/* Bus Exterior Container */}
      <div className="mt-8 max-w-md mx-auto bg-brand-warm border-2 border-brand-border p-6 relative rounded-t-3xl shadow-inner">
        
        {/* Front Cabin Windshield & Driver Area */}
        <div className="pb-6 mb-6 border-b border-brand-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-muted">
            <svg className="w-5 h-5 text-brand-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a4 4 0 0 0-4 4v4h8V6a4 4 0 0 0-4-4z" />
              <path d="M6 12h12" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <span>Driver Cabin</span>
          </div>
          <div className="text-[11px] uppercase tracking-wider font-semibold text-brand-muted px-2.5 py-1 bg-white border border-brand-border">
            Front Entry Door
          </div>
        </div>

        {/* Coach Rows */}
        <div className="space-y-3">
          {sortedRows.map(rowNum => {
            const rowSeats = rowsMap.get(rowNum) || [];
            const leftSeats = rowSeats.filter(s => s.col <= 2);
            const rightSeats = rowSeats.filter(s => s.col >= 3);

            return (
              <div key={rowNum} className="flex items-center justify-between gap-4">
                
                {/* Left 2 seats (Col 1 & 2) */}
                <div className="flex items-center gap-2">
                  {leftSeats.map(seat => {
                    const isSelected = selectedSeatNumbers.includes(seat.seatNumber);
                    const isOccupied = seat.status === 'occupied';
                    const isFemale = seat.status === 'female_reserved';

                    return (
                      <button
                        key={seat.id}
                        type="button"
                        disabled={isOccupied}
                        onClick={() => onToggleSeat(seat.seatNumber)}
                        title={`Seat ${seat.seatNumber} (${seat.col === 1 ? 'Window' : 'Aisle'}) - ₹${seat.price}`}
                        className={`w-11 h-11 text-xs font-bold rounded-xs flex flex-col items-center justify-center transition-all relative ${
                          isSelected
                            ? 'bg-brand-orange text-white shadow-md scale-105 ring-2 ring-brand-orange/40'
                            : isOccupied
                            ? 'bg-[#D5D2CD] text-brand-muted/70 cursor-not-allowed opacity-60'
                            : isFemale
                            ? 'bg-pink-100 border border-pink-300 text-pink-900 hover:border-brand-orange'
                            : 'bg-white border border-brand-border text-brand-black hover:border-brand-orange hover:shadow-xs'
                        }`}
                      >
                        <span className="text-[11px] leading-tight">{seat.seatNumber}</span>
                        {isFemale && !isSelected && (
                          <span className="text-[9px] text-pink-600 font-bold leading-none">♀</span>
                        )}
                        {isSelected && (
                          <span className="text-[9px] text-white font-bold leading-none">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Central Aisle */}
                <div className="text-[10px] text-brand-border font-mono font-bold tracking-widest uppercase">
                  AISLE
                </div>

                {/* Right 2 seats (Col 3 & 4) */}
                <div className="flex items-center gap-2">
                  {rightSeats.map(seat => {
                    const isSelected = selectedSeatNumbers.includes(seat.seatNumber);
                    const isOccupied = seat.status === 'occupied';
                    const isFemale = seat.status === 'female_reserved';

                    return (
                      <button
                        key={seat.id}
                        type="button"
                        disabled={isOccupied}
                        onClick={() => onToggleSeat(seat.seatNumber)}
                        title={`Seat ${seat.seatNumber} (${seat.col === 4 ? 'Window' : 'Aisle'}) - ₹${seat.price}`}
                        className={`w-11 h-11 text-xs font-bold rounded-xs flex flex-col items-center justify-center transition-all relative ${
                          isSelected
                            ? 'bg-brand-orange text-white shadow-md scale-105 ring-2 ring-brand-orange/40'
                            : isOccupied
                            ? 'bg-[#D5D2CD] text-brand-muted/70 cursor-not-allowed opacity-60'
                            : isFemale
                            ? 'bg-pink-100 border border-pink-300 text-pink-900 hover:border-brand-orange'
                            : 'bg-white border border-brand-border text-brand-black hover:border-brand-orange hover:shadow-xs'
                        }`}
                      >
                        <span className="text-[11px] leading-tight">{seat.seatNumber}</span>
                        {isFemale && !isSelected && (
                          <span className="text-[9px] text-pink-600 font-bold leading-none">♀</span>
                        )}
                        {isSelected && (
                          <span className="text-[9px] text-white font-bold leading-none">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

        {/* Rear Engine Cushion */}
        <div className="mt-8 pt-4 border-t border-brand-border text-center text-[10px] font-bold uppercase tracking-widest text-brand-muted">
          Rear Luggage & Scania Engine Compartment
        </div>

      </div>

      {/* Selected Seats Bottom Status Strip */}
      <div className="mt-6 pt-4 border-t border-brand-border flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-brand-orange" />
          <span className="text-brand-muted font-medium">Selected Seats:</span>
          {selectedSeatNumbers.length > 0 ? (
            <span className="font-bold text-brand-black tracking-wider">
              {selectedSeatNumbers.join(', ')} ({selectedSeatNumbers.length} seat{selectedSeatNumbers.length > 1 ? 's' : ''})
            </span>
          ) : (
            <span className="text-brand-muted italic">Click available seats to select</span>
          )}
        </div>

        {selectedSeatNumbers.length >= maxSeats && (
          <span className="text-amber-700 font-semibold bg-amber-50 px-2.5 py-1 border border-amber-300">
            Maximum limit of {maxSeats} seats reached
          </span>
        )}
      </div>

    </div>
  );
};
