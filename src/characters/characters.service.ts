import { Injectable,NotFoundException } from '@nestjs/common';
import { readFile,writeFile } from 'fs/promises';
import { join } from 'path';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ICharacters } from './interface/interface.characters';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class CharactersService {
  private filePath: string;// Define una propiedad filePath para almacenar la ruta del archivo JSON.

  constructor() {
    this.filePath = join(__dirname ,'..','model', 'characters.json');// Inicializa filePath con la ruta al archivo characters.json.
  }
  //carga los datos del archivo JSON.
  private async loadData(): Promise<ICharacters[]> {
    const data = await readFile(this.filePath, 'utf-8');/// Lee el archivo JSON.
    return JSON.parse(data);// Convierte el contenido del archivo JSON a un array de objetos ICharacters.
  }
  //guarda los datos en el archivo JSON.
  private async saveData(data: ICharacters[]): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  } //// Escribe el array de objetos ICharacters en el archivo JSON.


  async getAllCharacters(): Promise<ICharacters[]>  {//método devuelve una promesa de un array de personajes
    return this.loadData();// retorna lista completa de personajes almacenadas en la propiedad characters.
  }
  
  // Método público que devuelve un personaje por su ID.
  async getOneCharacter(id: string) : Promise<ICharacters>{
    try {
      const data = await   this.loadData(); // Carga los datos del archivo JSON.
      const character= data.find((character) => character.id === id);// Busca el personaje que coincide con el ID.
      // devuelve el resultado en una constante character
      if (Object.keys(character).length)
      return character;
    } catch (error) { //se lanza excepcion 
      throw new NotFoundException(`Track con id '${id}' no existe`);
    }
  
  }
// Método que crea un nuevo personaje.
   async create(newCharacter: CreateCharacterDto): Promise<ICharacters> {
    const data = await this.loadData();
   const Character: ICharacters = { id: uuidv4(), ...newCharacter };
   // Crea un nuevo objeto personaje con un ID único y los datos proporcionados.
    data.push(Character);// Agrega el nuevo personaje al array.
    await this.saveData(data);// Guarda los datos actualizados en el archivo JSON.
    return Character;
  }
  
  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }

}


