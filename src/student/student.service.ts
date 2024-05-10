import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/modules/database/database.service';

import { v4 as uuid} from 'uuid';

@Injectable()
export class StudentService {

  constructor(private prismaService: PrismaService){}

  async create(createStudentDto: CreateStudentDto): Promise<any> {

    

    return 'This action adds a new student';
  }

  async findAll(): Promise<any> {
    let allStudents = this.prismaService.student.findMany();
    return allStudents;
  }

  async findOne(id: string):Promise<any> {
    
    let findStudent = await this.prismaService.student.findFirst({
      where: {
        id
      }
    });

    if(findStudent) {
      return findStudent
    } else {
      return false
    }
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
