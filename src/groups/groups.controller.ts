import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Groups API')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get(':id/students')
  async getStudents(@Param('id', ParseIntPipe) groupId: number) {
    return await this.groupsService.getGroupStudents(groupId);
  }
}
