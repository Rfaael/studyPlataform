import { HttpException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/modules/database/database.service';

import { v4 as uuid} from 'uuid';

@Injectable()
export class StudentService {

  constructor(private prismaService: PrismaService){}

  async create(createStudentDto: CreateStudentDto): Promise<any> {

    let {
      email
    } = createStudentDto;


    let verifyEmail = await this.findOneByEmail(email);

    if(verifyEmail) {
      throw new HttpException("Email is alredy in use, plase use another one !", 300);
      return
    }

    let createStudent = await this.prismaService.student.create({
      data: {
        id: uuid(),
        ...createStudentDto
      }
    })

    return createStudent
  }

  async findAll(): Promise<any> {
    let allStudents = this.prismaService.student.findMany();
    return allStudents;
  }

  async findOneById(id: string):Promise<any> {
    let findStudent = await this.prismaService.student.findFirst({
      where: {
        id
      }
    });

    return findStudent;
  }

  async findOneByEmail(email: string): Promise<any> {
    let findStudent = await this.prismaService.student.findFirst({
      where: {
        email
      }
    })

    return findStudent;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
