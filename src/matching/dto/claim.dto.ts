import { IsString, IsNotEmpty } from 'class-validator';

export class ClaimDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  medicalServiceCode: string;

  @IsString()
  @IsNotEmpty()
  bookingDate: string;

  @IsString()
  @IsNotEmpty()
  insurance: string;

  @IsString()
  @IsNotEmpty()
  patient: string;
}
