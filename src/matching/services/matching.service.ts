import { Injectable } from '@nestjs/common';
import { BookingDto } from '../dto/booking.dto';
import { ClaimDto } from '../dto/claim.dto';
import { TestMap } from '../../interfaces/test-map.interface';
import { MatchResult } from '../../interfaces/match-result.interface';
import { MATCH_WEIGHTS } from '../../interfaces/match-criteria.interface';

@Injectable()
export class MatchingService {
  private readonly testsMap: TestMap[] = [
    { bookingTestId: 'test_1', claimTestId: 'medical_service_1' },
    { bookingTestId: 'test_2', claimTestId: 'medical_service_2' },
  ];

  private calculateTimeScore(bookingTime: Date, claimTime: Date): number {
    const diffMinutes =
      Math.abs(bookingTime.getTime() - claimTime.getTime()) / (1000 * 60);
    if (diffMinutes === 0) return 1;
    if (diffMinutes <= 5) return 0.8;
    if (diffMinutes <= 15) return 0.5;
    if (diffMinutes <= 30) return 0.3;
    return 0;
  }

  match(bookings: BookingDto[], claims: ClaimDto[]): MatchResult[] {
    const results: MatchResult[] = [];
    const usedBookings = new Set<string>();
    const usedClaims = new Set<string>();

    const sortedClaims = claims
      .map((claim) => ({
        claim,
        potentialMatches: bookings.filter(
          (b) =>
            !usedBookings.has(b.id) &&
            b.patient === claim.patient &&
            new Date(b.reservationDate).toDateString() ===
              new Date(claim.bookingDate).toDateString(),
        ).length,
      }))
      .sort((a, b) => a.potentialMatches - b.potentialMatches);

    for (const { claim } of sortedClaims) {
      if (usedClaims.has(claim.id)) continue;

      const matches = bookings
        .filter((booking) => {
          if (usedBookings.has(booking.id)) return false;
          return (
            booking.patient === claim.patient &&
            new Date(booking.reservationDate).toDateString() ===
              new Date(claim.bookingDate).toDateString()
          );
        })
        .map((booking) => {
          const mismatches: string[] = [];
          let score = 0;

          const testMatch = this.testsMap.find(
            (tm) =>
              tm.bookingTestId === booking.test &&
              tm.claimTestId === claim.medicalServiceCode,
          );
          if (testMatch) {
            score += MATCH_WEIGHTS.test;
          } else {
            mismatches.push('test');
          }

          const timeScore = this.calculateTimeScore(
            new Date(booking.reservationDate),
            new Date(claim.bookingDate),
          );
          if (timeScore < 1) {
            mismatches.push('time');
          }
          score += timeScore * MATCH_WEIGHTS.time;

          if (booking.insurance === claim.insurance) {
            score += MATCH_WEIGHTS.insurance;
          } else {
            mismatches.push('insurance');
          }

          return { booking, score, mismatches };
        });

      if (matches.length > 0) {
        const bestMatch = matches.reduce((best, current) =>
          current.score > best.score ? current : best,
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
