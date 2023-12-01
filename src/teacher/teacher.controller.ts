import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User, UserData } from '../auth/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GroupsService } from 'src/groups/groups.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeacherService } from './teacher.service';
import { Teacher } from './model/teacher.model';
import { Group } from '../groups/model/group.model';

@UseGuards(JwtAuthGuard)
@Controller('teacher')
@ApiTags('Teachers API')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly groupsService: GroupsService,
  ) {}

  @Post()
  create() {
    return this.teacherService.create();
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    description: 'Returns all teachers',
  })
  findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @Get('groups')
  groups(@User() user: UserData): Promise<Teacher[]> {
    return this.groupsService.getTeacherGroups(user.id);
  }

  @Get('groups/:id')
  group(@User() user: UserData, @Param('id') id: number): Promise<Group> {
    return this.groupsService.getTeacherGroup(user.id, id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns teacher',
    type: Teacher,
  })
  findOne(@Param('id') id: number): Promise<Teacher> {
    return this.teacherService.findOne(id);
  }
}
