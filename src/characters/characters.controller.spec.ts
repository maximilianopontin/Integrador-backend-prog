import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ICharacters } from './interface/interface.characters';
import { NotFoundException } from '@nestjs/common';

describe('CharactersController', () => {
  let controller: CharactersController;
  let service: CharactersService;

  const mockCharactersService = {
    getAllCharacters: jest.fn().mockResolvedValue([
      { id: '1', nombre: 'Character1', edad: 30, ocupacion: 'Occupation1', caracteristicas: ['Characteristic1'], familia: ['FamilyMember1'] },
      { id: '2', nombre: 'Character2', edad: 25, ocupacion: 'Occupation2', caracteristicas: ['Characteristic2'], familia: ['FamilyMember2'] },
    ]),
    getOneCharacter: jest.fn().mockImplementation((id: string) => {
      if (id === '1') {
        return Promise.resolve({ id: '1', nombre: 'Character1', edad: 30, ocupacion: 'Occupation1', caracteristicas: ['Characteristic1'], familia: ['FamilyMember1'] });
      } else {
        return Promise.reject(new NotFoundException(`Personaje con id '${id}' no existe`));
      }
    }),
    getByName: jest.fn().mockImplementation((name: string) => {
      if (name.toLowerCase() === 'character1') {
        return Promise.resolve([{ id: '1', nombre: 'Character1', edad: 30, ocupacion: 'Occupation1', caracteristicas: ['Characteristic1'], familia: ['FamilyMember1'] }]);
      } else {
        return Promise.reject(new NotFoundException(`No se encontraron personajes con nombre:'${name}'`));
      }
    }),
    create: jest.fn().mockImplementation((newCharacter: CreateCharacterDto) => {
      return Promise.resolve({ message: 'Personaje creado satisfactoriamente', Character: { id: '3', ...newCharacter } });
    }),
    update: jest.fn().mockImplementation((id: string, updateCharacterDto: UpdateCharacterDto) => {
      if (id === '1') {
        return Promise.resolve({ id: '1', ...updateCharacterDto });
      } else {
        return Promise.reject(new NotFoundException(`Personaje con id '${id}' no encontrado`));
      }
    }),
    delete: jest.fn().mockImplementation((id: string) => {
      if (id === '1') {
        return Promise.resolve(`Personaje con id '${id}' eliminado exitosamente`);
      } else {
        return Promise.reject(new NotFoundException(`Personaje con id '${id}' no encontrado`));
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [
        {
          provide: CharactersService,
          useValue: mockCharactersService,
        },
      ],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
    service = module.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all characters', async () => {
    const result = await controller.getAllCharacters();
    expect(result).toEqual([
      { id: '1', nombre: 'Character1', edad: 30, ocupacion: 'Occupation1', caracteristicas: ['Characteristic1'], familia: ['FamilyMember1'] },
      { id: '2', nombre: 'Character2', edad: 25, ocupacion: 'Occupation2', caracteristicas: ['Characteristic2'], familia: ['FamilyMember2'] },
    ]);
    expect(service.getAllCharacters).toHaveBeenCalled();
  });

  it('should return a character by id', async () => {
    const result = await controller.getOneCharacter({ id: '1' });
    expect(result).toEqual({ id: '1', nombre: 'Character1', edad: 30, ocupacion: 'Occupation1', caracteristicas: ['Characteristic1'], familia: ['FamilyMember1'] });
    expect(service.getOneCharacter).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if character by id not found', async () => {
    await expect(controller.getOneCharacter({ id: '2' })).rejects.toThrow(NotFoundException);
  });

  it('should return characters by name', async () => {
    const result = await controller.findByName('Character1');
    expect(result).toEqual([{ id: '1', nombre: 'Character1', edad: 30, ocupacion: 'Occupation1', caracteristicas: ['Characteristic1'], familia: ['FamilyMember1'] }]);
    expect(service.getByName).toHaveBeenCalledWith('Character1');
  });

  it('should throw NotFoundException if no characters by name found', async () => {
    await expect(controller.findByName('Character3')).rejects.toThrow(NotFoundException);
  });

  it('should create a new character', async () => {
    const newCharacter: CreateCharacterDto = {
      nombre: 'NewCharacter',
      edad: 20,
      ocupacion: 'NewOccupation',
      caracteristicas: ['NewCharacteristic'],
      familia: ['NewFamilyMember'],
    };
    const result = await controller.create(newCharacter);
    expect(result).toEqual({ message: 'Personaje creado satisfactoriamente', Character: { id: '3', ...newCharacter } });
    expect(service.create).toHaveBeenCalledWith(newCharacter);
  });

  it('should update a character', async () => {
    const updateCharacterDto: UpdateCharacterDto = {
      edad: 35,
      ocupacion: 'UpdatedOccupation',
      caracteristicas: ['UpdatedCharacteristic'],
      familia: ['UpdatedFamilyMember'],
    };
    const result = await controller.update('1', updateCharacterDto);
    expect(result).toEqual({ id: '1', ...updateCharacterDto });
    expect(service.update).toHaveBeenCalledWith('1', updateCharacterDto);
  });

  it('should throw NotFoundException if update character by id not found', async () => {
    const updateCharacterDto: UpdateCharacterDto = {
      edad: 35,
      ocupacion: 'UpdatedOccupation',
      caracteristicas: ['UpdatedCharacteristic'],
      familia: ['UpdatedFamilyMember'],
    };
    await expect(controller.update('3', updateCharacterDto)).rejects.toThrow(NotFoundException);
  });

  it('should delete a character', async () => {
    const result = await controller.remove('1');
    expect(result).toBe(`Personaje con id '1' eliminado exitosamente`);
    expect(service.delete).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if delete character by id not found', async () => {
    await expect(controller.remove('3')).rejects.toThrow(NotFoundException);
  });
});
