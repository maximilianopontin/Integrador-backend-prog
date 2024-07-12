import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('CharactersService', () => {
  let service: CharactersService;//declara variable para almacenar servicio

  //se ejecuta antes de cada prueba
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({//creacion modulo de prueba, solo incluye service, permite probarlo de manera independiente
      providers: [CharactersService],
    }).compile();

    service = module.get<CharactersService>(CharactersService); //Obtenemos una instancia del servicio
  });

  //pruebas de funcionalidad:

  //verica que el servicio este definido correctamente
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCharacters', () => {
    it('verifica si devuelve un arreglo de personajes', async () => {
      const characters = await service.getAllCharacters();//llama a la funcion y guarda el resultado en characters
      expect(characters).toBeInstanceOf(Array);//Utiliza expect para verificar que characters sea una instancia de Array.
    });
  });

  describe('getOneCharacter', () => {
    it('verifica si devuelve un personaje por su id', async () => {
      const id = '7e6d5c4b-3a2f-4b0d-9c8e-7f6e5d4c3b2a';
      const character = await service.getOneCharacter(id);
      expect(character.id).toEqual(id);//Utiliza expect para asegurar que el ID del personaje devuelto sea igual al ID proporcionado.
    });

    it('verifica si lanza una excepcion NotFoundException cuando el id no existe', async () => {
      const id = '7e6d5c4b-3a2f-4b0d-9c8e-7f6e5d4c3b2l';//id no existe
      await expect(service.getOneCharacter(id)).rejects.toThrow(NotFoundException);
      //Utiliza expect para verificar que cuando llame a getOneCharacter con id inexistente lanza una excepción NotFoundException.
    });
  });

  describe('getCharacterByName', () => {
    it('verifica si devuelve personaje por su nombre valido', async () => {
      const name = 'moe';
      const characters = await service.getCharacterByName(name);
      expect(characters).toBeInstanceOf(Array);
      expect(characters.length).toBeGreaterThan(0);//Verifica que el array de personajes no esté vacío.
      // Utiliza expect para asegurar que characters tenga una longitud mayor que 0.
    });

    it('verifica si cuando el nombre no se encuentra lanza una excepcion NotFoundException', async () => {
      const name = 'noe';
      await expect(service.getCharacterByName(name)).rejects.toThrow(NotFoundException);
      //Utiliza expect para verificar que llamar a getCharacterByName con name lance una excepción NotFoundException.
    });
  });

  describe('createCharacter', () => {
    it('verifica si se puede crear un personaje correctamente', async () => {
      const newCharacter: CreateCharacterDto = {
        "nombre": "OttoMann",
        "edad": 32,
        "ocupacion": "Conductor de autobús escolar",
        "caracteristicas": [
          "Amante del heavy metal",
          "Relajado",
          "Despreocupado",
          "Fuma y bebe ocasionalmente",
          "Vestimenta descuidada",
          "Experto en guitarras",
          "A veces irresponsable",
          "Buen corazón"
        ],
        "familia": ["no posee"]
      };

      const createdCharacter = await service.createCharacter(newCharacter);
      // Llama al método createCharacter con el DTO del nuevo personaje.
      expect(createdCharacter.Character.nombre).toEqual(newCharacter.nombre);
      //Verifica que el nombre del personaje creado coincida con el nombre proporcionado.
      expect(createdCharacter.Character.edad).toEqual(newCharacter.edad);
    });
  });

  describe('updateCharacter', () => {
    it('verifica si se puede actualizar un personaje existente', async () => {
      const id = '7e6d5c4b-3a2f-4b0d-9c8e-7f6e5d4c3b2a';
      const updatedCharacter: UpdateCharacterDto = {
        "nombre": "Ralph wiggum",
        "edad": 8,
        "ocupacion": "Estudiante de primer año",
        "caracteristicas": [
          "Ingenuo",
          "Tonto",
          "Hijo del jefe de policía",
          "Simpático",
          "Inocente",
          "Desconcertante",
          "Curioso",
          "Divertido"
        ],
        "familia": [
          "Clancy Wiggum",
          "Sarah Wiggum"
        ]
      };

      const updated = await service.updateCharacter(id, updatedCharacter);
      expect(updated.id).toEqual(updatedCharacter.id);
      // Verifica que el ID del personaje actualizado coincida con el ID proporcionado.
    
    });

    it('verifica si lanza una excepcion NotFoundException cuando el personaje no existe', async () => {
      const id = '7e6d5c4b-3a2f-4b0d-9c8e-7f6e5d4c3b2b';
      const updateCharacterDto: UpdateCharacterDto = {
        "nombre": "Ralph wiggum",
        "edad": 8,
        "ocupacion": "Estudiante de primer año",
        "caracteristicas": [
          "Ingenuo",
          "Tonto",
          "Hijo del jefe de policía",
          "Simpático",
          "Inocente",
          "Desconcertante",
          "Curioso",
          "Divertido"
        ],
        "familia": [
          "Clancy Wiggum",
          "Sarah Wiggum"
        ]
      };

      await expect(service.updateCharacter(id, updateCharacterDto)).rejects.toThrow(NotFoundException);
    });

    it('verifica si lanza una excepcion BadRequestException si el id es invalido', async () => {
      const id = '7e6d5c4b-3a2f-4b0d-9c8e-7f6e5d4c3b';
      const updateCharacterDto: UpdateCharacterDto = {
        "nombre": "Ralph wiggum",
        "edad": 8,
        "ocupacion": "Estudiante de primer año",
        "caracteristicas": [
          "Ingenuo",
          "Tonto",
          "Hijo del jefe de policía",
          "Simpático",
          "Inocente",
          "Desconcertante",
          "Curioso",
          "Divertido"
        ],
        "familia": [
          "Clancy Wiggum",
          "Sarah Wiggum"
        ]
      };

      await expect(service.updateCharacter(id, updateCharacterDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteCharacter', () => {
    it('verifica si se puede eliminar un personaje existente', async () => {
      const id = '7e6d5c4b-3a2f-4b0d-9c8e-7f6e5d4c3b2a';//elimino a ralph
      const deletedMessage = await service.deleteCharacter(id);
      expect(deletedMessage).toContain(id);
      //verifica que el mensaje de eliminación contenga el ID del personaje eliminado.
    });

    it('verifica si lanza una excepcion NotFoundException cuando el personaje no existe', async () => {
      const id = '0813731a-cff3-468d-a274-15d9b85b40ba';
      await expect(service.deleteCharacter(id)).rejects.toThrow(NotFoundException);
    });

    it('verifica si lanza una excepcion BadRequestException si el id es invalido', async () => {
      const id = '9a8b7c6d-5e4f-3d2c-1b0e-a9b8c7d6e5f4mm';
      await expect(service.deleteCharacter(id)).rejects.toThrow(BadRequestException);
    });
  });

});
//En el servicio, las pruebas se centran en verificaar la funcionalidad real de los métodos implementados
//validar la lógica interna de los métodos del servicio que interactúan con los datos y aplican la lógica de negocio.
//Se asegura de que los métodos del servicio funcionen correctamente y manejen adecuadamente diferentes escenarios, como obtener, crear, actualizar y eliminar personajes.
