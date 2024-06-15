import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ICharacters } from './interface/interface.characters';
import * as fs from 'fs/promises';
import * as path from 'path';


jest.mock('fs/promises');
jest.mock('uuid', () => ({ v4: jest.fn(() => 'unique-id') }));

describe('CharactersService', () => {
  let service: CharactersService;
  const mockData: ICharacters[] = [
    {
      id: '1',
      nombre: 'Character1',
      edad: 30,
      ocupacion: 'Occupation1',
      caracteristicas: ['Characteristic1'],
      familia: ['FamilyMember1']
    },
    {
      id: '2',
      nombre: 'Character2',
      edad: 25,
      ocupacion: 'Occupation2',
      caracteristicas: ['Characteristic2'],
      familia: ['FamilyMember2']
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersService],
    }).compile();

    service = module.get<CharactersService>(CharactersService);

    jest.spyOn(path, 'join').mockReturnValue('mocked-path/characters.json');
    jest.spyOn(fs, 'readFile').mockResolvedValue(JSON.stringify(mockData));
    jest.spyOn(fs, 'writeFile').mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all characters', async () => {
    const result = await service.getAllCharacters();
    expect(result).toEqual(mockData);
    expect(fs.readFile).toHaveBeenCalledWith('mocked-path/characters.json', 'utf-8');
  });

  it('should return a character by id', async () => {
    const result = await service.getOneCharacter('1');
    expect(result).toEqual(mockData[0]);
  });

  it('should throw NotFoundException if character by id not found', async () => {
    await expect(service.getOneCharacter('3')).rejects.toThrow(NotFoundException);
  });

  it('should return characters by name', async () => {
    const result = await service.getByName('Character1');
    expect(result).toEqual([mockData[0]]);
  });

  it('should throw NotFoundException if no characters by name found', async () => {
    await expect(service.getByName('Character3')).rejects.toThrow(NotFoundException);
  });

  it('should create a new character', async () => {
    const newCharacter: CreateCharacterDto = {
      nombre: 'NewCharacter',
      edad: 20,
      ocupacion: 'NewOccupation',
      caracteristicas: ['NewCharacteristic'],
      familia: ['NewFamilyMember']
    };
    const result = await service.create(newCharacter);
    expect(result.Character).toEqual({ id: 'unique-id', ...newCharacter });
    expect(fs.writeFile).toHaveBeenCalledWith('mocked-path/characters.json', JSON.stringify([...mockData, { id: 'unique-id', ...newCharacter }], null, 2), 'utf-8');
  });

  it('should update a character', async () => {
    const updateCharacterDto: UpdateCharacterDto = { 
      edad: 35,
      ocupacion: 'UpdatedOccupation',
      caracteristicas: ['UpdatedCharacteristic'],
      familia: ['UpdatedFamilyMember']
    };
    const result = await service.update('1', updateCharacterDto);
    expect(result.edad).toBe(35);
    expect(result.ocupacion).toBe('UpdatedOccupation');
    expect(fs.writeFile).toHaveBeenCalledWith('mocked-path/characters.json', JSON.stringify([{ id: '1', nombre: 'Character1', edad: 35, ocupacion: 'UpdatedOccupation', caracteristicas: ['UpdatedCharacteristic'], familia: ['UpdatedFamilyMember'] }, mockData[1]], null, 2), 'utf-8');
  });

  it('should throw NotFoundException if update character by id not found', async () => {
    const updateCharacterDto: UpdateCharacterDto = { 
      edad: 35,
      ocupacion: 'UpdatedOccupation',
      caracteristicas: ['UpdatedCharacteristic'],
      familia: ['UpdatedFamilyMember']
    };
    await expect(service.update('3', updateCharacterDto)).rejects.toThrow(NotFoundException);
  });

  it('should delete a character', async () => {
    const result = await service.delete('1');
    expect(result).toBe(`Personaje con id '1' eliminado exitosamente`);
    expect(fs.writeFile).toHaveBeenCalledWith('mocked-path/characters.json', JSON.stringify([mockData[1]], null, 2), 'utf-8');
  });

  it('should throw NotFoundException if delete character by id not found', async () => {
    await expect(service.delete('3')).rejects.toThrow(NotFoundException);
  });
});
