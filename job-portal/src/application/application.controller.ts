import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApplicationService } from './application.service';
import {
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Req,
  Body,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { UpdateStatusDto } from './dtos/update-status.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@ApiTags('Applications')
@UseGuards(JwtAuthGuard)
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('apply/:jobId')
  @UseGuards( RolesGuard)
  @Roles(Role.STUDENT)
  apply(
    @Param('jobId', ParseIntPipe) jobId: number,
    @CurrentUser('id') studentId: number,
  ) {
    return this.applicationService.apply(jobId, studentId);
  }


  @Get('my-application')
  @UseGuards(RolesGuard)
  @Roles(Role.STUDENT)
  myApplications(@CurrentUser('id') studentId: number,) 
  {
    return this.applicationService.myApplications(studentId);
  }

  @Get('job-search-by-title')
  @UseGuards( RolesGuard)
  @Roles(Role.STUDENT)
  searchByTitle(@Query('title') title: string,) 
  {
    return this.applicationService.searchByTitle(title);
  }

  @Get('job-filter-by-minSalary')
  @UseGuards( RolesGuard)
  @Roles(Role.STUDENT)
  filterByMinSalary(@Query('minSalary', ParseIntPipe)minSalary: number,) 
  {
    return this.applicationService.filterByMinSalary(minSalary,);
  }



  @Get('applicants/:jobId')
  @UseGuards( RolesGuard)
  @Roles(Role.RECRUITER)
  getApplicants(
    @Param('jobId', ParseIntPipe) jobId: number,
    @CurrentUser('id') recruiterId: number,
  ) {
    return this.applicationService.getApplicants(
      jobId,
      recruiterId,
    );
  }

  @Patch('applicants-status/:applicationId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.RECRUITER)
  updateStatus(
    @Param('applicationId', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
    @CurrentUser('id') recruiterId: number,
  ) {
    return this.applicationService.updateStatus(
      id,
      recruiterId,
      dto,
    );
  }
}
