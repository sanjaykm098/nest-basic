import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly dataBaseService: DatabaseService) {}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.dataBaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll() {
    return this.dataBaseService.employee.findMany();
  }

  async findOne(id: number) {
    return this.dataBaseService.employee.findUniqueOrThrow({
      where: { id: id },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    const employee = await this.dataBaseService.employee.findUniqueOrThrow({
      where: { id: id },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return this.dataBaseService.employee.update({
      where: { id: id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.dataBaseService.employee.delete({
      where: { id: id },
    });
  }
}
