import { Injectable } from '@nestjs/common';
import { BookingDto } from '../dto/booking.dto';
import { ClaimDto } from '../dto/claim.dto';
import { TestMap } from '../../interfaces/test-map.interface';
import { MatchResult } from '../../interfaces/match-result.interface';

interface PossibleMatch {
  booking: BookingDto;
  matchScore: number;
  mismatches: string[];
}

@Injectable()
export class MatchingService {
  private testsMap: TestMap[] = [
    {
      bookingTestId: 'test_1',
      claimTestId: 'medical_service_1',
    },
    {
      bookingTestId: 'test_2',
      claimTestId: 'medical_service_2',
    },
  ];

  match(bookings: BookingDto[], claims: ClaimDto[]): MatchResult[] {
    const results: MatchResult[] = [];
    const usedBookings = new Set<string>();
    const usedClaims = new Set<string>();

    for (const claim of claims) {
      const claimDate = new Date(claim.bookingDate).toISOString().split('T')[0];

      const possibleMatches = bookings
        .filter((booking) => {
          if (usedBookings.has(booking.id)) return false;
          const bookingDate = new Date(booking.reservationDate)
            .toISOString()
            .split('T')[0];
          return booking.patient === claim.patient && bookingDate === claimDate;
        })
        .map((booking) => {
          const mismatches: string[] = [];
          let matchScore = 0;

          const testMatch = this.testsMap.find(
            (tm) =>
              tm.bookingTestId === booking.test &&
              tm.claimTestId === claim.medicalServiceCode,
          );
          if (!testMatch) {
            mismatches.push('test');
          } else {
            matchScore += 1;
          }

          const bookingTime = new Date(booking.reservationDate).getTime();
          const claimTime = new Date(claim.bookingDate).getTime();
          if (bookingTime !== claimTime) {
            mismatches.push('time');
          } else {
            matchScore += 1;
          }

          if (booking.insurance !== claim.insurance) {
            mismatches.push('insurance');
          } else {
            matchScore += 1;
          }

          return {
            booking,
            matchScore,
            mismatches,
          } as PossibleMatch;
        });

      if (possibleMatches.length > 0) {
        const bestMatch = possibleMatches.reduce((best, current) =>
          current.matchScore > best.matchScore ? current : best,
        );

        results.push({
          claim: claim.id,
          booking: bestMatch.booking.id,
          ...(bestMatch.mismatches.length > 0 && {
            mismatch: bestMatch.mismatches,
          }),
        });

        usedBookings.add(bestMatch.booking.id);
        usedClaims.add(claim.id);
      }
    }

    return results;
  }
}
