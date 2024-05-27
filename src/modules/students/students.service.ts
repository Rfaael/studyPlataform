import { HttpException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/database/database.service';

import * as bcrypt from 'bcrypt';
import { v4 as uuid} from 'uuid';

@Injectable()
export class StudentService {

  constructor(private prismaService: PrismaService){}

  async create(createStudentDto: CreateStudentDto): Promise<any> {

    let {
      email,
      password
    } = createStudentDto;

    let verifyEmail = await this.findOneByEmail(email);

    if(verifyEmail) {
      throw new HttpException("Email is alredy in use, plase use another one !", 300);
      return
    }

    let passwordHash = await bcrypt.hash(password, 10);

    let createStudent = await this.prismaService.student.create({
      data: {
        id: uuid(),
        ...createStudentDto,
        password: passwordHash        
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

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<any> {

    let updateStudent = await this.prismaService.student.update({
      where: {
        id
      },
      data: {
        ...updateStudentDto
      }
    })

    return updateStudent
  }
  async remove(id: string) {
  //   let updateAccount = await this.prismaService.student.update({
  //     where: {
  //       id
  //     },
  //     data: {
  //       isActive: false
  //     }
  //   })

  //   return;
  }
}
