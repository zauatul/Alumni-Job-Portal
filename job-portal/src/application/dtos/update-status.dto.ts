import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ApplicationStatus } from 'src/common/enums/application-status.emun';

export class UpdateStatusDto {

  @ApiProperty({
    example: ApplicationStatus.INTERVIEW,
  })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}