import { Status } from '../model/student_attendances';

export class StudentAttendanceDto {
  student_id: number;
  group_lesson_id: number;
  status: Status;
  comment: string;
}
