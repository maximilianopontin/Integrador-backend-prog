import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ICharacters } from './interface/interface.characters';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';


@Injectable()
export class CharactersService {
  private filePath: string;// propiedad filePath para almacenar la ruta del archivo JSON.

  constructor() {
    this.filePath = join(__dirname, '..', '..', 'src', 'model', 'characters.json');// Inicializa filePath con la ruta al archivo characters.json.
  }
  // Lee y retorna los datos del archivo JSON. Si hay un error, lanza una excepción.
  private async loadData(): Promise<ICharacters[]> {
    try {
      const data = await readFile(this.filePath, 'utf-8');/// Lee el archivo JSON.
      return JSON.parse(data);// Convierte el contenido del archivo JSON a un array de objetos ICharacters.
    } catch (error) {
      throw new Error('Error al leer el archivo de datos');
    }
  }
  //guarda los datos en el archivo JSON.
  private async saveData(data: ICharacters[]): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  } //// Escribe el array de objetos ICharacters en el archivo JSON.


  async getAllCharacters(): Promise<ICharacters[]> {//método devuelve una promesa de un array de personajes
    return this.loadData();// retorna lista completa de personajes almacenadas en la propiedad characters.
  }

  // Método que devuelve un personaje por su ID.
  async getOneCharacter(id: string): Promise<ICharacters> {
    try {
      const data = await this.loadData(); // Carga los datos del archivo JSON.
      const character = data.find((character) => character.id === id);// Busca el personaje que coincide con el ID.
      // devuelve el resultado en una constante character
      if (Object.keys(character).length)
        return character;
    } catch (error) { //Si no se encuentra, lanza una excepción
      throw new NotFoundException(`Personaje con id '${id}' no existe`);
    }

  }
  //metodo para busqueda de personaje por nombre
  async getCharacterByName(name: string): Promise<ICharacters[]> {
    const data = await this.loadData();
    const normalizedName = name.trim().toLowerCase(); // Elimina espacios en blanco al principio y al final del nombre buscado y convierte a miniscula
    const characters = data.filter((character) =>
      //filtra los personajes comparando el nombre del personaje (después de quitar los espacios en blanco al inicio y fin) con el nombre buscado (después de convertir ambos a minúsculas para ignorar diferencias de mayúsculas/minúsculas).
      character.nombre.trim().toLowerCase().includes(normalizedName)
      //
    );
    if (characters.length === 0) {// Si no se encontraron personajes, lanza una excepción
      throw new NotFoundException(`No se encontraron personajes con nombre:'${name}'`);
    }
    return characters;
  }

  // Método que crea un nuevo personaje.
  async createCharacter(newCharacter: CreateCharacterDto): Promise<{ message: string; Character: ICharacters }> {
    const data = await this.loadData();
    const Character: ICharacters = { id: uuidv4(), ...newCharacter };
    // Crea un nuevo objeto personaje con un ID único y los datos proporcionados.
    data.push(Character);// Agrega el nuevo personaje al array.
    await this.saveData(data);// Guarda los datos actualizados en el archivo JSON.
    return { message: 'Personaje creado satisfatoriamente', Character };
  }

  async updateCharacter(id: string, updateCharacterDto: UpdateCharacterDto): Promise<ICharacters> {
    if (!uuidValidate(id)) {
      throw new BadRequestException(`ID '${id}' invalido, se espera uuid hexadecimal`);
    }
    const data = await this.loadData();
    const index = data.findIndex((character) => character.id === id);// Busca el índice del personaje en el array cuyo id coincide con el id proporcionado como parámetro.
    // Utiliza el método findIndex para encontrar la primera coincidencia y devuelve el índice correspondiente.
    if (index === -1) {// si no se encontró ningún personaje con el id dado.
      throw new NotFoundException(`Personaje con id '${id}' no existe`);
    }
    data[index] = { ...data[index], ...updateCharacterDto };// Actualiza el personaje encontrado combinando sus datos actuales (data[index]) con los nuevos datos proporcionados en updateCharacterDto.
    // Utiliza el operador de propagación (...) para copiar las propiedades del objeto existente y del DTO de actualización, sobreescribiendo las propiedades existentes con las nuevas si están presentes.
    await this.saveData(data);
    return data[index];//Devuelve el objeto del personaje actualizado.
  }
  async deleteCharacter(id: string): Promise<string> {
    if (!uuidValidate(id)) {
      throw new BadRequestException(`ID '${id}' invalido, se espera uuid hexadecimal`);
    }
    const data = await this.loadData();
    const index = data.findIndex((character) => character.id === id);
    if (index === -1) {
      throw new NotFoundException(`Personaje con id '${id}' no existe`);
    }
    const deleteCharacter = data.splice(index, 1)[0]; // Eliminar el personaje del array y obtener el personaje eliminado
    await this.saveData(data); // Guardar los cambios en el archivo
    return `Personaje con id '${deleteCharacter.id}' eliminado exitosamente`;
  }


}

