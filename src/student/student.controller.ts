import {
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { User, UserData } from '../auth/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GroupsService } from 'src/groups/groups.service';
import { PaymentService } from 'src/payment/payment.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import StudentGroupInvoiceDto from './dto/student-group-invoice.dto';
import { GroupStudents } from '../groups/model/group-students.model';
import { AttendancesService } from 'src/student_attendances/attendances.service';
import { Group } from 'src/groups/model/group.model';

@Controller('student')
@ApiTags('Students API')
@UseGuards(JwtAuthGuard)
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly groupsService: GroupsService,
    private readonly paymentService: PaymentService,
    private readonly studentAttendanceService: AttendancesService,
  ) {}

  @Post()
  create() {
    return this.studentService.create();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all students',
  })
  findAll() {
    return this.studentService.findAll();
  }

  @Get('groups')
  groups(@User() user: UserData): Promise<GroupStudents[]> {
    return this.groupsService.getStudentGroups(user.id);
  }

  @Get('groups/:id')
  async group(@Param('id') id: number, @User() user: UserData): Promise<Group> {
    return this.groupsService.getStudentGroup(id, user.id);
  }
  @Get('invoices')
  invoices(@User() user: UserData) {
    return this.paymentService.studentInvoices(user.id);
  }
  @Get('invoices/:id')
  @ApiResponse({
    status: 200,
    description: 'Returns group invoices',
    type: StudentGroupInvoiceDto,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Group id is required',
  })
  async groupInvoices(
    @User() user: UserData,
    @Param('id') groupId: string,
  ): Promise<StudentGroupInvoiceDto[]> {
    if (!groupId) throw new HttpException('Group id is required', 400);

    return this.paymentService.studentGroupInvoices(user.id, parseInt(groupId));
  }

  @Get('attendances/:id')
  attendances(@Param('id') id: string, @User() user: UserData) {
    return this.studentAttendanceService.studentAttendances(
      user.id,
      parseInt(id),
    );
  }

  @Get('attendance/lesson/:id')
  attendance(@Param('id') id: string) {
    return this.studentAttendanceService.studentLessonAttendance(parseInt(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }
}
