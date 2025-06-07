export interface MatchCriteria {
  readonly test: number;
  readonly time: number;
  readonly insurance: number;
}

export const MATCH_WEIGHTS: MatchCriteria = {
  test: 3,
  time: 2,
  insurance: 1,
} as const;
