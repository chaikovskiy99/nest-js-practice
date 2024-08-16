import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private _id = 0;
  private _users: (CreateUserDto & { id: number })[] = [];

  create(createUserDto: CreateUserDto) {
    console.log(createUserDto)
    this._users.push({ id: this._id++, ...createUserDto });
    return createUserDto;
  }

  findAll() {
    return this._users;
  }

  findOne(id: number) {
    return this._users.find(u => u.id == id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this._users.map(u => {
      if (u.id === id) {
        return { ...u, ...updateUserDto };
      }
      return u;
    });
  }

  remove(id: number) {
    const found = this._users.find(u => u.id === id);
    if (found) {
      const copyArr = this._users;
      const toDeleteIndex = copyArr.indexOf(found);
      this._users = deleteFromArray(this._users, toDeleteIndex);
      return this._users;
    }
  }
}

function deleteFromArray(origArr: Array<any>, indexToDelete: number) {
  const partBefore = origArr.slice(0, indexToDelete);
  const partAfter = origArr.slice(indexToDelete + 1, origArr.length);
  return partBefore.concat(partAfter);
}
