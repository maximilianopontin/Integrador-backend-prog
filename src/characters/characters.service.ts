import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ICharacters } from './interface/interface.characters';

import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CharactersService {
  private characters: ICharacters[];

  constructor() {
    this.loadCharacters();
  }

  private loadCharacters() {
    const filePath = path.resolve(__dirname,'..','..','src' , 'model', 'characters.json');
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      this.characters = JSON.parse(data);
    } catch (error) {
      this.characters = []; // Si hay un error al cargar los personajes, inicializamos la lista como vacía
    }
  }
   async create(createCharacterDto: CreateCharacterDto): Promise<ICharacters> {
   const newCharacter: ICharacters = { id: uuidv4(), ...createCharacterDto };
    this.characters.push(newCharacter);
    this.saveCharacters();
    return newCharacter;
  }
  

  async getAllCharacters(): Promise<ICharacters[]>  {//método devuelve una promesa de un array de personajes
    return this.characters;// retorna lista completa de personajes almacenadas en la propiedad characters.
  }

  async getOneCharacter(id: string) : Promise<ICharacters>{
    try {
      const character = this.characters.find((character) => character.id === id);//buscame en objeto charactersSimpsons, el personaje que coincida con el id ingresado por parametro y devolveme el resultado en una constante character
      if (Object.keys(character).length)
      return character;
    } catch (error) { //se lanza excepcion 
      throw new NotFoundException(`Track con id '${id}' no existe`);
    }
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
  
  private saveCharacters() {
  const filePath = path.resolve(__dirname, 'model', 'characters.json');
  fs.writeFileSync(filePath, JSON.stringify(this.characters, null, 2));
}
}


