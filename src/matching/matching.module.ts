import { Module } from '@nestjs/common';
import { MatchingController } from './controllers/matching.controller';
import { MatchingService } from './services/matching.service';

@Module({
  controllers: [MatchingController],
  providers: [MatchingService],
})
export class MatchingModule {}
