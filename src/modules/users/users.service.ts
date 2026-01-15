import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LessThan, Repository } from 'typeorm';

import { User } from '@modules/users/entities/user.entity';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';

const userSelectFields = {
  id: true,
  email: true,
  password: true,
  fullName: true,
  isActive: true,
  roles: true,
  verificationCode: true,
  verificationCodeExpires: true,
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param createUserDto - Data Transfer Object son los datos esperados para la creación de un usuario.
   * @returns El usuario creado.
   * @author Benjamín López
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(createUserDto);
    return user;
  }

  /**
   * Busca un usuario por su correo electrónico.
   * @param email - El correo electrónico del usuario a buscar.
   * @returns El usuario encontrado o null si no existe.
   * @author Benjamín López
   */
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      select: userSelectFields,
    });
  }

  /**
   * Busca un usuario por su ID.
   * @param id - El ID del usuario a buscar.
   * @returns El usuario encontrado o null si no existe.
   * @author Benjamín López
   */
  async findOneById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      select: userSelectFields,
    });
  }

  /**
   * Guarda los cambios de un usuario en la base de datos.
   * @param user - El usuario a guardar.
   * @author Benjamín López
   */
  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  /**
   * Elimina los usuarios no verificados cuyo código de verificación ha expirado.
   * @returns El número de usuarios eliminados.
   * @author Benjamín López
   */
  async deleteUnverifiedExpiredUsers(): Promise<number> {
    const result = await this.userRepository.delete({
      isActive: false,
      verificationCodeExpires: LessThan(new Date()),
    });
    return result.affected || 0;
  }

  /**
   * Tarea programada que se ejecuta cada hora para eliminar usuarios no verificados con códigos de verificación expirados.
   * @author Benjamín López
   */
  @Cron(CronExpression.EVERY_HOUR)
  async cleanExpiredUnverifiedUsers() {
    const deleted = await this.deleteUnverifiedExpiredUsers();
    if (deleted > 0) {
      console.log(`Deleted ${deleted} unverified expired users.`);
    }
  }
}
