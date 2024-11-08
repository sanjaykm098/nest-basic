import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@mail.com',
    },
    {
      id: 2,
      name: 'Alice Caeiro',
      email: 'alice@gmail.com',
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john@mail.com',
    },
    {
      id: 4,
      name: 'Alice Caeiro',
      email: 'alice@gmail.com',
    },
  ];

  findAll(page?: number | string) {
    if (!page) {
      return this.users;
    }
    page = parseInt(page as string, 10);
    return this.users.slice((page - 1) * 2, page * 2);
  }

  findOne(id: number) {
    const users = this.users.find((user) => user.id === id);
    if (!users) throw new NotFoundException(`User with id ${id} not found`);
    return users;
  }

  create(CreateUserDto: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...CreateUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, userInfo: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex < 0) {
      return null;
    }
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userInfo,
    };
    return this.users[userIndex];
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex < 0) {
      return null;
    }
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
