import { Controller, Post, Body } from '@nestjs/common';
import { MatchingService } from '../services/matching.service';
import { MatchRequestDto } from '../dto/match-request.dto';
import { MatchResult } from '../../interfaces/match-result.interface';

@Controller('match')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Post()
  match(@Body() matchRequestDto: MatchRequestDto): MatchResult[] {
    return this.matchingService.match(
      matchRequestDto.bookings,
      matchRequestDto.claims,
    );
  }
}
